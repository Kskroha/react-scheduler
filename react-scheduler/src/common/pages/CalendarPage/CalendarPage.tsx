import { NavLink } from "react-router-dom";
import styles from "./CalendarPage.module.css";
import { Table } from "../../components/Table/Table";
import { FilterSelect } from "../../components/FilterSelect/FilterSelect";

function CalendarPage() {
  return (
    <div>
      <main className={styles.page}>
        <h1>Calendar</h1>
        <div className={styles.buttons}>
          <FilterSelect />
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
