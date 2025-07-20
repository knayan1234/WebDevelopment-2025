import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CardSingle = ({ movieDetails }) => {
  console.log("movieDetails in Card", movieDetails);
  return (
    <Card sx={{ width: "30%", height: "auto" }}>
      <CardMedia
        component="img"
        alt={movieDetails?.Title}
        height="200"
        sx={{
          objectFit: "cover",
        }}
        image={movieDetails?.Poster}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movieDetails?.Title || "❌ Seems API failed !!!! ❌"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {movieDetails?.Plot}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mt: 2,
          }}
        >
          iMDb: {movieDetails?.imdbID}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardSingle;
