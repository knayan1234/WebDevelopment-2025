const Card = ({ cardData }) => {
  return (
    <div
      style={{
        border: "2px solid grey",
        height: "50vh",
        width: "50vw",
        borderRadius: "24px",
        marginTop: "8%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>{cardData.name}</h3>
      <p>{cardData.job}</p>
      <p>{cardData.text}</p>
    </div>
  );
};
export default Card;
