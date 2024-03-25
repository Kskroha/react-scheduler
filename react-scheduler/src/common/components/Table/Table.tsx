import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { getFilteredEvents } from "../../utils/selectors";
import TableCell from "../TableCell/TableCell";
import { DAYS, HOURS } from "../../mocks/constants";
import styles from "./Table.module.css";

export const Table: FC = () => {
  const events = useAppSelector(getFilteredEvents);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Name</th>
          {DAYS.map((day, index) => (
            <th className={styles.th} key={index}>
              {day.slice(0, 3)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {HOURS.map((hour) => (
          <tr key={hour}>
            <td className={styles.td} width="70">
              {hour}
            </td>
            {DAYS.map((day) => {
              const schedule = events.find(
                (event) => event.day.value === day && event.time.value === hour
              );
              return (
                <TableCell
                  key={day + hour}
                  event={schedule ?? null}
                  day={day}
                  time={hour}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
