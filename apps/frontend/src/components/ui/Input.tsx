// src/components/ui/Input.tsx
'use client';
import { TextField, TextFieldProps } from '@mui/material';

export const Input = (props: TextFieldProps) => {
  
  // Criamos um novo objeto de props, começando com os nossos padrões.
  const allProps = {
    variant: 'outlined' as const, // Usar 'as const' ajuda na inferência de tipo
    fullWidth: true,
    ...props,
  };

  return (
    // Passamos o objeto de props combinado para o TextField.
    <TextField {...allProps} />
  );
};