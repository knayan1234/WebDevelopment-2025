const Card = () => {
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
      <h3>Name</h3>
      <p>Position</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "8%",
        }}
      >
        <div>Icon</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          unde quod? Ab cum laudantium quibusdam quisquam assumenda neque
          repudiandae eligendi?
        </p>
        <div>Icon</div>
      </div>
    </div>
  );
};
export default Card;
