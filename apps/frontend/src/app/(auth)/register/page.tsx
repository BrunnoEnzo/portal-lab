'use client';

import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Link from 'next/link';
import { SocialLoginButtons } from '@/components/features/auth/SocialLoginButtons';

// Definimos o componente da página de registro
export default function RegisterPage() {
  // Estados para os campos do formulário e mensagens de erro/sucesso
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setError(null);
  setSuccess(null);

  if (!name || !email || !password) {
    setError('Todos os campos são obrigatórios.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Lê a resposta do backend
    const data = await response.json();

    // Se a resposta não for OK, pegamos a mensagem de erro do backend
    if (!response.ok) {
      // O NestJS envia os erros de validação dentro de um array 'message'
      // Esta linha extrai a primeira mensagem de erro para exibir ao usuário
      const errorMessage = Array.isArray(data.message) ? data.message[0] : data.message;
      setError(errorMessage || 'Ocorreu um erro no registro.');
      return;
    }

    setSuccess('Registro realizado com sucesso! Redirecionando...');
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);

  } catch (err) {
    // Este erro agora só deve acontecer se o servidor estiver offline
    setError('Não foi possível conectar ao servidor.');
    console.error('Erro de conexão:', err);
  }
};

  // Estrutura JSX do componente
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome Completo"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de E-mail"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>

          <SocialLoginButtons />

          <Link href="/login" passHref>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Já tem uma conta? Faça login
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
} // <--- A chave de fechamento final está aqui, na posição correta.