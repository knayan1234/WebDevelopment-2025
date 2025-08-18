export const Button = ({
  text = "Click Me",
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <div>
      <button onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};
