import { TextField, Box } from "@mui/material";

export default function UserFilters({ filterText, setFilterText }) {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Search by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        fullWidth
      />
    </Box>
  );
}
