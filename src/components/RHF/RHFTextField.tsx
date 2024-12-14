import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface RHFTextFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'number';
  rules?: Record<string, any>;
  textFieldProps?: Record<string, any>;
  [key: string]: any;
}

const RHFTextField: React.FC<RHFTextFieldProps> = ({
  name,
  label,
  type = 'text',
  rules = {},
  textFieldProps = {},
  ...rest
}) => {
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error('RHFTextField must be used within a FormProvider');
  }

  const { control } = formContext;
  const {
    field: { ref, onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const value = e.target.value;
      if (!isNaN(Number(value))) {
        onChange(Number(value));
      }
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <TextField
      {...textFieldProps}
      label={label}
      value={value || ''}
      onChange={handleChange}
      type={type}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      fullWidth
      {...rest}
    />
  );
};

export default RHFTextField;
