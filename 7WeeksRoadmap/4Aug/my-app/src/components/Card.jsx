import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useCart } from "../common/contexts/CartContext";

export default function OutlinedCard({ data, category }) {
  const { cart, dispatch } = useCart();
  console.log("Cart contents:", cart);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "16px",
        padding: 3,
        justifyContent: "center",
      }}
    >
      {data
        .filter((data) => data.category === category)
        .map((d) => (
          <Card
            key={d.id}
            variant="outlined"
            sx={{
              width: "350px",
              height: "350px",
              background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {d.title}
              </Typography>
              <Typography variant="h5" component="div">
                {d.price}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                {d.category}
              </Typography>
              <Typography variant="body2">{d.description}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={() => dispatch({ type: "ADD", item: d })}
              >
                Add in cart
              </Button>
            </CardActions>
          </Card>
        ))}
    </Box>
  );
}
