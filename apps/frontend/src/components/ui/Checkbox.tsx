// src/components/ui/Checkbox.tsx
'use client';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel,
} from '@mui/material';

// Nossas props customizadas, adicionando um 'label'
interface CustomCheckboxProps extends CheckboxProps {
  label?: string;
}

export const Checkbox = ({ label, ...rest }: CustomCheckboxProps) => {
  const checkbox = <MuiCheckbox {...rest} />;

  // Se um label for fornecido, envolvemos o checkbox com um FormControlLabel
  // para melhor acessibilidade e para tornar o texto clicável.
  if (label) {
    return (
      <FormControlLabel
        control={checkbox}
        label={label}
      />
    );
  }

  return checkbox;
};