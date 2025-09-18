// src/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SocialLoginButtons } from '@/components/features/auth/SocialLoginButtons';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Falha ao registrar.');
      }
      
      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Criar Conta</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Input margin="normal" required fullWidth id="name" label="Nome Completo" name="name" autoComplete="name" autoFocus value={formData.name} onChange={handleChange} disabled={isLoading} />
          <Input margin="normal" required fullWidth id="email" label="Endereço de E-mail" name="email" autoComplete="email" value={formData.email} onChange={handleChange} disabled={isLoading} />
          <Input margin="normal" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="new-password" value={formData.password} onChange={handleChange} disabled={isLoading} />
          
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
          </Button>
          
          <Link href="/login" passHref>
            <Typography variant="body2" align="center">Já tem uma conta? Faça login</Typography>
          </Link>
          
          <SocialLoginButtons />
        </Box>
      </Box>
    </Container>
  );
}