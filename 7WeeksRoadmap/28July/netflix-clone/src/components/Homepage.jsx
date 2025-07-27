import CardGrid from "./CardGrid";

const Homepage = ({ movieData, searchTerm }) => {
  const filteredData = movieData.data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return <CardGrid data={filteredData} />;
};

export default Homepage;
