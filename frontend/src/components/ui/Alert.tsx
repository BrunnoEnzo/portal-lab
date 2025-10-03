// src/components/ui/Select.tsx
'use client';
import {
  TextField,
  MenuItem,
  TextFieldProps,
} from '@mui/material';

// Define o formato de cada opção no dropdown
type SelectOption = {
  label: string;
  value: string | number;
};

interface SelectProps extends Omit<TextFieldProps, 'select'> {
  options: SelectOption[];
}

export const Select = ({
  options,
  label,
  variant = 'outlined',
  fullWidth = true,
  ...rest
}: SelectProps) => {
  return (
    <TextField
      select
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};