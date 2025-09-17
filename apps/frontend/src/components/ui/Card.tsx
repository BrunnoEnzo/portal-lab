// src/components/ui/Card.tsx
'use client';
import { Card as MuiCard, CardProps } from '@mui/material';

interface Props extends CardProps {}

export const Card = ({ children, elevation = 2, ...rest }: Props) => {
  return (
    <MuiCard elevation={elevation} {...rest}>
      {children}
    </MuiCard>
  );
};