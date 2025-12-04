import { useState } from "react";
import Card from "./Card";
import "./App.css";

export default function App() {
  const [totalSeats, setTotalSeat] = useState(() => createArray());

  function createArray() {
    return Array.from({ length: 30 }, (_, i) => {
      const idx = i; // 0-based
      const seatClass = idx < 10 ? "A" : idx < 20 ? "B" : "C";
      return {
        id: i + 1,
        seatClass,
        isBooked: false,
        isHold: false,
      };
    });
  }

  function getSeatPrice(seat) {
    if (seat.seatClass === "A") return 400;
    if (seat.seatClass === "B") return 250;
    return 100; // C
  }

  function handleTempLock(id) {
    setTotalSeat((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isHold: true } : s))
    );
  }
  function handleRemoveTempLock(id) {
    setTotalSeat((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isHold: false } : s))
    );
  }

  function handleBook(id) {
    console.log("handleBook", id);
    setTotalSeat((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isBooked: true, isHold: false } : s
      )
    );
  }

  function handlePayment() {
    setTotalSeat((prev) =>
      prev.map((s) => (s.isHold ? { ...s, isBooked: true, isHold: false } : s))
    );
  }

  return (
    <div className="App">
      <h2>Movie Seat Booking</h2>
      <div className="screen">SCREEN</div>
      <div className="seatGrid">
        {totalSeats.map((element) => (
          <Card
            key={element.id}
            element={element}
            onBook={handleBook}
            onLock={handleTempLock}
            onRemoveLock={handleRemoveTempLock}
          />
        ))}
      </div>
      <div className="legend">
        <div className="legendItem">
          <span className="chip" style={{ background: "#f5c156" }} /> Class A
          (₹400)
        </div>
        <div className="legendItem">
          <span className="chip" style={{ background: "#7dd3fc" }} /> Class B
          (₹250)
        </div>
        <div className="legendItem">
          <span className="chip" style={{ background: "#c7c7c7" }} /> Class C
          (₹100)
        </div>
        <div className="legendItem">
          <span className="chip" style={{ background: "#ffb86b" }} /> Hold
        </div>
        <div className="legendItem">
          <span className="chip" style={{ background: "#444" }} /> Booked
        </div>
      </div>
      <div className="footerRow">
        <div className="summary">
          Selected seats:{" "}
          {totalSeats
            .filter((s) => s.isBooked === true)
            .map((s) => s.id)
            .join(", ") || "None"}
          <br />
          Total price: ₹{" "}
          {totalSeats
            .filter((s) => s.isBooked === true)
            .reduce((sum, s) => sum + getSeatPrice(s), 0)}
        </div>
        <button className="payBtn" onClick={handlePayment}>
          Pay
        </button>
      </div>
    </div>
  );
}
