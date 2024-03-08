import { FC, useRef } from "react";
import { TEvent } from "../../types/types";
import {
  createEvent,
  deleteEvent,
} from "../../features/schedule/scheduleSlice";
import { useAppDispatch } from "../hooks/hooks";
import styles from "./TableCell.module.css";
import { useDrag, useDrop } from "react-dnd";

interface ITableCell {
  event?: TEvent | null;
  day: string;
  time: string;
}

export const TableCell: FC<ITableCell> = ({ event, day, time }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (event) {
      dispatch(deleteEvent(event.id));
    }
  };

  const ref = useRef<HTMLTableCellElement>(null);

  const [{ isDragging }, drop] = useDrop({
    accept: "cell",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isDragging: monitor.isOver(),
      };
    },
    drop(item) {
      if (!ref.current) {
        return;
      }
      dispatch(deleteEvent(item.id));
      dispatch(
        createEvent({
          ...item,
          day,
          time,
        })
      );
    },
  });

  const [, drag] = useDrag({
    type: "cell",
    item: event,
  });

  drag(drop(ref));

  return (
    <>
      <td
        className={isDragging ? "dragging" : ""}
        ref={ref}
        style={{ background: "#efefef" }}
      >
        {event && (
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <p className={styles.cardName}>{event.name}</p>
              <button
                type="button"
                onClick={handleClick}
                className={styles.button}
              >
                X
              </button>
            </div>
          </div>
        )}
        {isDragging && !event && <div>Переместить сюда</div>}
      </td>
    </>
  );
};

export default TableCell;
