import "./App.css";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import { useState, useEffect } from "react";
import { apiUrl, filterData } from "./data/data";

function App() {
  const [cardDetails, setCardDetails] = useState({});
  const [category,setCategory]= useState('All')

  const filters = filterData;

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      let res = await fetch(apiUrl);
      let output = await res.json();
      output
        ? output.data
          ? setCardDetails(output.data)
          : setCardDetails({})
        : setCardDetails({});
    } catch (err) {
      console.error("Error occured in API call.... ", err);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <Filter filters={filters} setCategory={setCategory}/>
      <Cards cardDetails={cardDetails} category={category} />
    </div>
  );
}

export default App;
