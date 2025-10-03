// src/components/ui/RadioGroup.tsx
'use client';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps,
} from '@mui/material';

// Define o formato de cada opção do Radio
type RadioOption = {
  label: string;
  value: string;
};

// Nossas props customizadas
interface CustomRadioGroupProps extends RadioGroupProps {
  label: string;
  options: RadioOption[];
}

export const RadioGroup = ({
  label,
  options,
  ...rest
}: CustomRadioGroupProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <MuiRadioGroup
        // O 'name', 'value' e 'onChange' virão de '...rest',
        // geralmente controlados por libs de formulário como Formik ou React Hook Form.
        {...rest}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};