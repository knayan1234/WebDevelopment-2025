import CardSingle from "./Card";
import Box from "@mui/material/Box";

const Cards = ({ movieDetails }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CardSingle movieDetails={movieDetails} />
    </Box>
  );
};

export default Cards;
