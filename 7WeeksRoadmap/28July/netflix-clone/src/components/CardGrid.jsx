import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

const CardGrid = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        p: 2,
      }}
    >
      {data.map((item) => (
        <MovieCard key={item.id} data={item} />
      ))}
    </Box>
  );
};

export default CardGrid;
