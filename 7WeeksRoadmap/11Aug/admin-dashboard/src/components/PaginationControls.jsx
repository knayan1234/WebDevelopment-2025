import React from "react";
import { Box, Button } from "@mui/material";

export default function PaginationControls({ page, totalPages, onPageChange }) {
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
      <Button
        variant="outlined"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>
      <Button
        variant="outlined"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
}
