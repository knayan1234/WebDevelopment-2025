const Filter = ({ hardcodedCategory, setCategory }) => {
  return (
    <div>
      {hardcodedCategory.map((f) => (
        <button key={f} onClick={() => setCategory(f)}>
          {f}
        </button>
      ))}
    </div>
  );
};
export default Filter;
