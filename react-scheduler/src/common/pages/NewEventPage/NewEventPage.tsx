import { useEffect } from "react";
import { DAYS, HOURS, MEMBERS } from "../../mocks/constants";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  createEvent,
  updateState,
} from "../../../features/schedule/scheduleSlice";
import { useNavigate } from "react-router-dom";
import styles from "./NewEvent.module.css";
import Alert from "react-bootstrap/Alert";
import { SubmitHandler, useForm } from "react-hook-form";

enum ParticipantsEnum {
  Ann = "Ann",
  Maria = "Maria",
  Bob = "Bob",
  Max = "Max",
  Alex = "Alex",
}

type Time = "10:00" | "11:00" | "12:00" | "13:00" | "14:00" | "15:00";

enum DayEnum {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
}

interface IFormInput {
  eventName: string;
  participants: ParticipantsEnum;
  day: DayEnum;
  time: Time;
}

// ZOD

function NewEventPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      eventName: "Meeting",
      participants: [],
      day: "Monday",
      time: "10:00",
    },
  });

  const dispatch = useAppDispatch();

  const createEventSuccess = useAppSelector(
    (state) => state.schedule.createEventSuccess
  );
  const createEventFailed = useAppSelector(
    (state) => state.schedule.createEventFailed
  );

  const createOptions = (array: string[] | number[]) => {
    return array.map((text: string | number, index: number) => {
      return (
        <option key={index} value={text}>
          {text}
        </option>
      );
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    dispatch(
      createEvent({
        ...data,
        id: uuidv4(),
      })
    );
    setTimeout(() => dispatch(updateState()), 1000);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (createEventSuccess) {
      navigate(-1);
    }
  }, [createEventSuccess, navigate]);

  return (
    <div className={styles.page}>
      <main>
        {createEventFailed && (
          <Alert key="danger" variant="danger">
            Failed to create an event. The slot is already booked.
          </Alert>
        )}
        <h1>Create new event</h1>
        <form
          action="/"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={styles.form}
        >
          {errors.eventName && (
            <p className={styles.error} role="alert">
              {errors.eventName.message}
            </p>
          )}
          <div className={styles.field}>
            <label htmlFor="eventName">Name of the event:</label>
            <input
              {...register("eventName", {
                required: "Event name is required",
                minLength: 3,
                maxLength: 20,
              })}
            />
          </div>

          {errors.participants && (
            <p className={styles.error} role="alert">
              {errors.participants.message}
            </p>
          )}
          <div className={styles.field}>
            <label htmlFor="participants">Participants:</label>
            <select
              {...register("participants", {
                required: "Please choose participants",
              })}
              multiple
            >
              {createOptions(MEMBERS)}
            </select>
          </div>

          {errors.day && (
            <p className={styles.error} role="alert">
              {errors.day.message}
            </p>
          )}
          <div className={styles.field}>
            <label htmlFor="day">Day:</label>
            <select {...register("day", { required: "Day is required" })}>
              {createOptions(DAYS)}
            </select>
          </div>

          {errors.time && (
            <p className={styles.error} role="alert">
              {errors.time.message}
            </p>
          )}
          <div className={styles.field}>
            <label htmlFor="time">Time:</label>
            <select {...register("time", { required: "Time is required" })}>
              {createOptions(HOURS)}
            </select>
          </div>

          <div className={styles.buttons}>
            <button
              // disabled={!isFormValid}
              className={styles.button}
              type="submit"
            >
              Create
            </button>
            <button
              type="reset"
              className={styles.button}
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NewEventPage;
