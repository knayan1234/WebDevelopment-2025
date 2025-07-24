import Card from "./Card";
import reviews from "../data/data";
import { useState } from "react";

export const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const leftShiftHandler = () => {
    if (index - 1 < 0) {
      setIndex(reviews.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  const rightShiftHandler = () => {
    if (index >= reviews.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  return (
    <div>
      <Card cardData={reviews[index]} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <button onClick={leftShiftHandler}>Backward</button>
        <button onClick={rightShiftHandler}>Forward</button>
      </div>
    </div>
  );
};
