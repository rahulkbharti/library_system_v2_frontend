import { Autocomplete, TextField } from "@mui/material";
import { FastField } from "formik";

const SearchBox = ({
  name,
  label,
  options = [],
  getOptionLabel = (option) => option.name || "",
  ...props
}) => {
  return (
    <FastField name={name}>
      {({ field, form, meta }) => {
        // Field value stores ID, find the option
        const selectedOption = options.find((opt) => opt.id === field.value) || null;

        return (
          <Autocomplete
            fullWidth
            size="small"
            value={selectedOption}
            options={options}
            getOptionLabel={getOptionLabel}
            onChange={(_, newValue) => {
              form.setFieldValue(name, newValue ? newValue.id : "");
            }}
            onBlur={() => form.setFieldTouched(name, true)}
            ListboxProps={{ style: { maxHeight: 300, overflow: "auto" } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                margin="normal"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
            {...props}
          />
        );
      }}
    </FastField>
  );
};

export default SearchBox;
