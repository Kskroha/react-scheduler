import { FC } from "react";
import { TEvent } from "../../types/types";
import { deleteEvent } from "../../features/schedule/scheduleSlice";
import { useAppDispatch } from "../hooks/hooks";
import styles from "./TableCell.module.css";

interface ITableCell {
  event?: TEvent | null;
}

export const TableCell: FC<ITableCell> = ({ event }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (event?.id) {
      dispatch(deleteEvent(event.id));
    }
  };

  return (
    <>
      <td style={event ? {background: "#b5e386"} : {background: "#efefef"}}>
        {event?.name ?? null}
        {event && <button type="button" onClick={handleClick} className={styles.button}>X</button>}
      </td>
    </>
  );
};

export default TableCell;