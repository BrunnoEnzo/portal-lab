'use client';
import { Container, Typography, Box } from '@mui/material';

export default function RegisterPage() {
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
          (Aqui ficará o formulário de cadastro)
        </Typography>
      </Box>
    </Container>
  );
}