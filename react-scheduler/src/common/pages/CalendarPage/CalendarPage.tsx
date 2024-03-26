import { useNavigate } from "react-router-dom";
import styles from "./CalendarPage.module.css";
import { Table } from "../../components/Table/Table";
import { FilterSelect } from "../../components/FilterSelect/FilterSelect";

function CalendarPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-event");
  };

  return (
    <div>
      <main className={styles.page}>
        <h1>Calendar</h1>
        <div className={styles.buttons}>
          <FilterSelect />
          <div className={styles.link} onClick={handleClick}>
            New event +
          </div>
        </div>
        <Table />
      </main>
    </div>
  );
}

export default CalendarPage;
