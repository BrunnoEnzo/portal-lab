// src/components/ui/Button.tsx
'use client';
import { Button as MuiButton, ButtonProps } from '@mui/material';


export const Button = ({ children, variant = 'contained', ...rest }: ButtonProps) => {
  return (
    <MuiButton variant={variant} {...rest}>
      {children}
    </MuiButton>
  );
};