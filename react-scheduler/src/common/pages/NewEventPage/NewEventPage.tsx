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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DAY_OPTIONS,
  PARTICIPANT_OPTIONS,
  TIME_OPTIONS,
} from "../../mocks/constants";
import { OptionSelect } from "../../components/OptionSelect/OptionSelect";
import { ErrorAlert } from "../../components/ErrorAlert/ErrorAlert";

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

export type FormFields = z.infer<typeof schema>;

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

  const createEventFailed = useAppSelector(
    (state) => state.schedule.createEventFailed
  );

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(
      createEvent({
        ...data,
        id: uuidv4(),
      })
    );
    dispatch(updateState());
    navigate(-1);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

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
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className={styles.form}
        >
          <ErrorAlert
            errorType={errors.eventName}
            className={styles.error}
            message={errors.eventName?.message}
          />

          <div className={styles.field}>
            <label htmlFor="eventName">Name of the event:</label>
            <input {...register("eventName")} />
          </div>

          <ErrorAlert
            errorType={errors.participants}
            className={styles.error}
            message={errors.participants?.message}
          />
          <OptionSelect
            control={control}
            options={PARTICIPANT_OPTIONS}
            className={styles.field}
            label="Participants:"
            name="participants"
            isMulti={true}
          />

          <ErrorAlert
            errorType={errors.day}
            className={styles.error}
            message={errors.day?.message}
          />
          <OptionSelect
            control={control}
            options={DAY_OPTIONS}
            className={styles.field}
            label="Day:"
            name="day"
          />

          <ErrorAlert
            errorType={errors.time}
            className={styles.error}
            message={errors.time?.message}
          />
          <OptionSelect
            control={control}
            options={TIME_OPTIONS}
            className={styles.field}
            label="Time:"
            name="time"
          />

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
