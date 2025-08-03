import Box from "@mui/material/Box";
import { sampleData } from "../data/SampleData";
import OutlinedCard from "./Card";
import { useState } from "react";
import Filter from "./Filter";

const Main = () => {
  const [data, setData] = useState(sampleData);

  const hardcodedCategory = Array.from(
    new Set(sampleData.map((item) => item.category))
  );
  console.log("Hardcoded Category", hardcodedCategory);
  const [category, setCategory] = useState();
  return (
    <Box>
      <Box>
        <Filter
          setCategory={setCategory}
          hardcodedCategory={hardcodedCategory}
        />
      </Box>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)",
          padding: 3,
        }}
      >
        <OutlinedCard data={data} category={category} />
      </Box>
    </Box>
  );
};
export default Main;
