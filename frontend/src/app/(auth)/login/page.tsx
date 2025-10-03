// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SocialLoginButtons } from '@/components/features/auth/SocialLoginButtons';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      setIsLoading(false);
    } else if (result?.ok) {
      router.push('/student/dashboard');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Input margin="normal" required fullWidth id="email" label="Endereço de E-mail" name="email" autoComplete="email" autoFocus value={formData.email} onChange={handleChange} disabled={isLoading} />
          <Input margin="normal" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="current-password" value={formData.password} onChange={handleChange} disabled={isLoading} />
          
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
          </Button>

          <Link href="/forgot-password" passHref>
            <Typography variant="body2" align="right">Esqueceu sua senha?</Typography>
          </Link>
          
          <SocialLoginButtons />
          
          <Link href="/register" passHref>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Não tem uma conta? Cadastre-se
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}