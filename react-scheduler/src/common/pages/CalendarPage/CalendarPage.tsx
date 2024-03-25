// import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import styles from "./CalendarPage.module.css";
import { setActiveFilter } from "../../../features/schedule/scheduleSlice";
import { Table } from "../../components/Table/Table";
import { MEMBERS } from "../../mocks/constants";

function CalendarPage() {
  const dispatch = useAppDispatch();

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
        <Table />
      </main>
    </div>
  );
}

export default CalendarPage;
