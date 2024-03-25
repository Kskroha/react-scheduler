import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  createEvent,
  updateState,
} from "../../../features/schedule/scheduleSlice";
import { useNavigate } from "react-router-dom";
import styles from "./NewEvent.module.css";
import Alert from "react-bootstrap/Alert";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const participantOptions = [
  { value: "Anna", label: "Anna 👩‍🦱" },
  { value: "Maria", label: "Maria 🦄" },
  { value: "Bob", label: "Bob 👦" },
  { value: "Alex", label: "Alex 😎" },
];

const timeOptions = [
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
];

const dayOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
];

const schema = z.object({
  eventName: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  participants: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  day: z.object({
    value: z.string(),
    label: z.string(),
  }),
  time: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

type FormFields = z.infer<typeof schema>;

function NewEventPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();

  const createEventSuccess = useAppSelector(
    (state) => state.schedule.createEventSuccess
  );
  const createEventFailed = useAppSelector(
    (state) => state.schedule.createEventFailed
  );

  const onSubmit: SubmitHandler<FormFields> = (data) => {
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
            <input {...register("eventName")} />
          </div>

          {errors.participants && (
            <p className={styles.error} role="alert">
              {errors.participants.message}
            </p>
          )}
          <div className={styles.field}>
            <label htmlFor="participants">Participants:</label>
            <Controller
              control={control}
              name="participants"
              rules={{ required: true }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  name={name}
                  value={value}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={participantOptions}
                  onChange={onChange}
                />
              )}
            />
          </div>

          {errors.day && (
            <p className={styles.error} role="alert">
              {errors.day.message}
            </p>
          )}
          <div className={styles.field}>
            <label htmlFor="time">Day:</label>
            <Controller
              control={control}
              name="day"
              rules={{ required: true }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  name={name}
                  value={value}
                  components={animatedComponents}
                  options={dayOptions}
                  onChange={onChange}
                />
              )}
            />
          </div>

          {errors.time && (
            <p className={styles.error} role="alert">
              {errors.time.message}
            </p>
          )}
          <div className={styles.field}>
            <label htmlFor="time">Time:</label>
            <Controller
              control={control}
              name="time"
              rules={{ required: true }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  name={name}
                  value={value}
                  components={animatedComponents}
                  options={timeOptions}
                  onChange={onChange}
                  maxMenuHeight={100}
                />
              )}
            />
          </div>

          <div className={styles.buttons}>
            <button
              disabled={isSubmitting}
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
