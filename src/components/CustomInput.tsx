import TextField from "@mui/material/TextField";

const CustomInput = (props: any) => {
  const { id, label, variant, size, onChange, value } = props;
  return (
    <>
      <TextField
        id={id}
        label={label}
        variant={variant}
        fullWidth
        size={size}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default CustomInput;
