import React from "react";
import {
  Autocomplete,
  TextField,
} from "@mui/material";

const SearchBox = ({setOrgId,options = []}) => {

  return (
    <Autocomplete
      fullWidth
      size="small"
      options={options}
      sx={{ mt: 1 }}
      getOptionLabel={(option) => `${option.name} (${option.id})`}
      onChange={(_, value) => setOrgId(value ? value.id : "")}
      //   disableListWrap
      ListboxProps={{ style: { maxHeight: 300, overflow: "auto" } }}
      renderInput={(params) => (
        <TextField {...params} label="Search Organization" variant="outlined" />
      )}
    />
  );
};

export default SearchBox;
