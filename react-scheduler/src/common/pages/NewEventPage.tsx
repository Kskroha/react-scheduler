import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { DAYS, HOURS, MEMBERS } from "../mocks/constants";
import { TEvent } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  createEvent,
  updateState,
} from "../../features/schedule/scheduleSlice";
import { useNavigate } from "react-router-dom";
import styles from "./NewEvent.module.css"
import Alert from "react-bootstrap/Alert";

function NewEventPage() {
  const [event, setEvent] = useState<TEvent>({
    name: "",
    participants: [],
    day: "",
    time: "",
    id: uuidv4(),
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

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setEvent({
      ...event,
      participants: values,
    });
  };

  // react-hook-form //ZOD TS
  //

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = !Object.values(event).some((item) => item === '')

    if (!isValid) {
      return;
    }

    dispatch(createEvent(event));
    setTimeout(() => dispatch(updateState()), 1000);
  };

  const handleSetEvent = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    setEvent({
      ...event,
      [key]: e.target.value,
    })
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (createEventSuccess) {
      navigate(-1);
    }
  }, [createEventSuccess, navigate]);

  const isFormValid = !Object.values(event).some((item) => item === '');

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
          onSubmit={handleSubmit}
          autoComplete="off"
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor="eventName">Name of the event:</label>
            <input
              type="text"
              id="eventName"
              onChange={(e) => handleSetEvent(e, 'name')}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="participants">Participants:</label>
            <select
              value={event.participants}
              name="participants"
              id="participants"
              onChange={handleChange}
              multiple
              required
            >
              {createOptions(MEMBERS)}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="day">Day:</label>
            <select
              value={event.day}
              name="day"
              id="day"
              onChange={(e) => handleSetEvent(e, 'day')}
              required
            >
              <option selected>Day</option>
              {createOptions(DAYS)}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="time">Time:</label>
            <select
              value={event.time}
              name="time"
              id="time"
              onChange={(e) => handleSetEvent(e, 'time')}
              required
            >
              <option selected>Time</option>
              {createOptions(HOURS)}
            </select>
          </div>
          <div className={styles.buttons}>
            <button disabled={!isFormValid} className={styles.button} type="submit">
              Create
            </button>
            <button type="reset" className={styles.button} onClick={handleClick}>Cancel</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NewEventPage;
