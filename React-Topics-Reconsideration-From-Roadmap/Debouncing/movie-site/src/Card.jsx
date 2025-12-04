import { useEffect, useRef, useState } from "react";
import "./Card.css";

export default function Card({ element, onBook, onLock, onRemoveLock }) {
  const timerRef = useRef(null);
  const [selectSeats, setSelectSeats] = useState(false);

  function handleSeatClick() {
    setSelectSeats((prev) => {
      const next = !prev;
      if (next) {
        onLock(element.id);
      } else {
        onRemoveLock(element.id);
      }
      return next;
    });
  }

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (selectSeats) {
      if (element.isBooked) {
        setSelectSeats(false);
        return;
      }

      timerRef.current = setTimeout(() => {
        onBook(element.id);
        timerRef.current = null;
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [selectSeats, onBook, element.id, element.isBooked, onRemoveLock, onLock]);

  return (
    <div className="seatCard">
      <button
        onClick={handleSeatClick}
        className={`seatButton ${selectSeats ? "red" : ""} ${
          element.isHold ? "hold" : ""
        } ${element.isBooked ? "booked" : ""}`}
        disabled={element.isBooked}
      >
        {element.id}
      </button>
      {(selectSeats || element.isHold || element.isBooked) && (
        <span className="priceTag">
          ₹
          {element.seatClass === "A"
            ? 400
            : element.seatClass === "B"
            ? 250
            : 100}{" "}
          <small>({element.seatClass})</small>
        </span>
      )}
    </div>
  );
}
