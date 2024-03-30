import { useNavigate } from "react-router-dom";
import styles from "./CalendarPage.module.css";
import { Table } from "../../components/Table/Table";
import { FilterSelect } from "../../components/FilterSelect/FilterSelect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        <DndProvider backend={HTML5Backend}>
          <Table />
        </DndProvider>
      </main>
    </div>
  );
}

export default CalendarPage;
