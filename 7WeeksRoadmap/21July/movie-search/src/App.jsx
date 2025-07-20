import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Box from "@mui/material/Box";
import Cards from "./components/Cards";

function App() {
  const [movieName, setMovieName] = useState("Avengers");
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoding] = useState(true);
  let API_KEY = `http://www.omdbapi.com/?t=${movieName}&apikey=a68b25e7&`;
  // let API_KEY = `http://www.omdbapi.com/?t=Lord of the Rings&apikey=a68b25e7&`;

  useEffect(() => {
    async function apiCall() {
      setIsLoding(true);
      try {
        let data = await fetch(API_KEY);
        let finalData = await data.json();
        console.log("data", finalData);
        setIsLoding(false);
        return setMovieDetails(finalData);
      } catch (e) {
        console.error(e);
      }
    }
    apiCall();
  }, [API_KEY]);

  return (
    <Box sx={{ backgroundColor: "#28282B", width: "100vw" }}>
      <Navbar setMovieName={setMovieName} />
      {isLoading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>LOADING...</p>
        </Box>
      ) : (
        <Cards movieDetails={movieDetails} />
      )}
    </Box>
  );
}

export default App;

// GPT optimnization

// useEffect(() => {
//   async function apiCall() {
//     const API_URL = `https://www.omdbapi.com/?t=${movieName}&apikey=a68b25e7`;
//     try {
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       setMovieDetails(data);
//     } catch (error) {
//       console.error("API fetch error:", error);
//     }
//   }

//   if (movieName) {
//     apiCall();
//   }
// }, [movieName]);
