import React from "react";

const Filter = ({ filters, setCategory }) => {

  return (
    <div>
      {filters.map((f) => (
        <button key={f.id} onClick={() =>  setCategory(f.title)}>
          {f.title}
        </button>
      ))}
    </div>
  );
};
export default Filter;
