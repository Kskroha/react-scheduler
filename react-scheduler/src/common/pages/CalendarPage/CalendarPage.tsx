// import Table from "react-bootstrap/Table";
import { DAYS, HOURS, MEMBERS } from "../../mocks/constants";
import TableCell from "../../components/TableCell";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./CalendarPage.module.css";
import { setActiveFilter } from "../../../features/schedule/scheduleSlice";
import { getFilteredEvents } from "../../utils/selectors";

function CalendarPage() {
  const dispatch = useAppDispatch();

  const events = useAppSelector(getFilteredEvents);

  return (
    <div>
      <main className={styles.page}>
        <h1>Calendar</h1>
        <div className={styles.buttons}>
          <select
            name="filter"
            id="filter"
            onChange={(e) => dispatch(setActiveFilter(e.target.value))}
          >
            <option value="all">All members</option>
            {MEMBERS.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
          <NavLink className={styles.link} to="/create-event">
            New event +
          </NavLink>
        </div>
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
      </main>
    </div>
  );
}

export default CalendarPage;
