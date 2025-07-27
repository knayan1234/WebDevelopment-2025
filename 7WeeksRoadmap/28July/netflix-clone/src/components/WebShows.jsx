import CardGrid from "./CardGrid";

const WebShows = ({ movieData, searchTerm }) => {
  const webshows = movieData.data
    .filter((d) => d.type === "Web Show")
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return <CardGrid data={webshows} />;
};

export default WebShows;
