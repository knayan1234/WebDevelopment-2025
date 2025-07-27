import { Card, CardContent, Typography } from "@mui/material";

const MovieCard = ({ data }) => {
  return (
    <Card
      sx={{
        width: 280,
        flex: "0 0 auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ fontSize: 14 }}>
          {data.type}
        </Typography>
        <Typography variant="h6" component="div">
          {data.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{data.release_year}</Typography>
        <Typography variant="body2">
          {data.description.slice(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
