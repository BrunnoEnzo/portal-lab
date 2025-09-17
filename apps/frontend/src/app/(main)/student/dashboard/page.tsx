// src/app/(main)/student/dashboard/page.tsx
'use client';

import { Container, Typography, Box } from '@mui/material';

export default function StudentDashboardPage() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Dashboard do Aluno
        </Typography>
        <Typography>
          Bem-vindo ao seu painel! Aqui você poderá ver suas informações e
          acessar os recursos do portal.
        </Typography>
      </Box>
    </Container>
  );
}