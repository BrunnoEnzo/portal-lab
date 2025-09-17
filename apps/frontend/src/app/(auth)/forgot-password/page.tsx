// src/app/(auth)/forgot-password/page.tsx
'use client';

import { Container, Typography, Box } from '@mui/material';

export default function ForgotPasswordPage() {
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Recuperar Senha
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
          (Aqui ficará o formulário de recuperação de senha)
        </Typography>
      </Box>
    </Container>
  );
}