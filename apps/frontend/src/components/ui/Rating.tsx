// src/components/ui/Rating.tsx
'use client';
import {
  Rating as MuiRating,
  RatingProps,
  Box,
  Typography,
} from '@mui/material';

// Nossas props customizadas, adicionando um 'label'
interface CustomRatingProps extends RatingProps {
  label?: string;
}

export const Rating = ({
  label,
  precision = 0.5, // Padrão: permitir meia estrela
  ...rest
}: CustomRatingProps) => {
  // Se um label for fornecido, renderizamos junto com o componente
  if (label) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 0.5,
        }}
      >
        <Typography component="legend">{label}</Typography>
        <MuiRating precision={precision} {...rest} />
      </Box>
    );
  }

  return <MuiRating precision={precision} {...rest} />;
};