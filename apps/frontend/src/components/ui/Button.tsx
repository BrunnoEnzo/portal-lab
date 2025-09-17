// src/components/ui/Button.tsx
'use client';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {}

export const Button = ({ children, variant = 'contained', ...rest }: Props) => {
  return (
    <MuiButton variant={variant} {...rest}>
      {children}
    </MuiButton>
  );
};