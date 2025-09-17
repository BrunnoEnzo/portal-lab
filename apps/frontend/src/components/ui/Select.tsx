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

// Nossas props combinam as do TextField com as opções
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
      select // Esta prop transforma o TextField em um Select
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