import React from "react";
import { useController, useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface RHFAutocompleteProps {
  name: string;
  options: Array<any>;
  label?: string;
  textFieldProps?: Record<string, any>;
  getOptionLabel?: (option: any) => string;
  freeSolo?: boolean;
  onInputChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  rules?: Record<string, any>;
  [key: string]: any;
}

const RHFAutocomplete: React.FC<RHFAutocompleteProps> = ({
  name,
  options,
  label,
  textFieldProps = {},
  getOptionLabel = (option) => option,
  freeSolo = false,
  onInputChange,
  rules = {},
  ...rest
}) => {
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error("RHFAutocomplete must be used within a FormProvider");
  }

  const { control } = formContext;
  const {
    field: { ref, onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <Autocomplete
      options={options}
      value={value || ""}
      onChange={(_, data) => onChange(data)}
      freeSolo={freeSolo}
      getOptionLabel={getOptionLabel}
      onInputChange={onInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          label={label}
          inputRef={ref}
          error={!!error}
          helperText={error?.message}
        />
      )}
      {...rest}
    />
  );
};

export default RHFAutocomplete;