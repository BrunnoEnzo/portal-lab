// src/components/ui/Card.tsx
'use client';
import { Card as MuiCard, CardProps } from '@mui/material';


export const Card = ({ children, elevation = 2, ...rest }: CardProps) => {
  return (
    <MuiCard elevation={elevation} {...rest}>
      {children}
    </MuiCard>
  );
};