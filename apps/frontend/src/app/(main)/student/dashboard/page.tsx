// apps/frontend/src/app/(main)/student/dashboard/page.tsx

'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Container, Typography, Box } from '@mui/material';

export default function StudentDashboard() {
  // Crie uma função para lidar com o clique do botão
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' }); // Redireciona para a página de login após o logout
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard do Aluno
        </Typography>
        <Typography paragraph>
          Bem-vindo ao seu painel! Aqui você pode gerenciar seus cursos e
          verificar seu progresso.
        </Typography>
        
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Desconectar
        </Button>
      </Box>
    </Container>
  );
}