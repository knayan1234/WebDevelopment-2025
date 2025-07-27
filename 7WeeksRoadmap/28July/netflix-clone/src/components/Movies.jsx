// import CardGrid from "./CardGrid";

// const Movies = ({ movieData, searchTerm }) => {
//   const movies = movieData.data
//     .filter((d) => d.type === "Movie")
//     .filter((item) =>
//       item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   return <CardGrid data={movies} />;
// };

// export default Movies;

import { Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
const Movies = ({ movieData, searchTerm }) => {
  const allMovies = movieData.data.filter((d) => d.type === "Movie");

  //filter by searchTerm if provided
  const searchedMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("searchedMOvie", searchedMovies);
  // Get unique genres from filtered movie list
  const allGenres = Array.from(
    new Set(searchedMovies.flatMap((movie) => movie.genre))
  );

  return (
    <Box sx={{ px: 2 }}>
      {allGenres.map((genre) => {
        const moviesInGenre = searchedMovies.filter((m) =>
          m.genre.includes(genre)
        );

        return (
          <Box key={genre} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {genre}
            </Typography>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                pb: 1,
              }}
            >
              {moviesInGenre.map((movie) => (
                <MovieCard key={movie.id} data={movie} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Movies;
