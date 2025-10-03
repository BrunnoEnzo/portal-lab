// apps/frontend/src/components/features/auth/SocialLoginButtons.tsx

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState<'google' | 'github' | null>(null);

  const handleSocialLogin = (provider: 'google' | 'github') => {
    setIsLoading(provider);

    const callbackUrl = '/student/dashboard';
    const params = provider === 'google' 
      ? { prompt: 'select_account' } 
      : { prompt: 'login' };
    signIn(provider, { callbackUrl }, params);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography align="center" variant="body2" sx={{ mb: 2 }}>
        Ou continue com
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<GoogleIcon />}
          onClick={() => handleSocialLogin('google')}
          // Desabilite o botão se QUALQUER login estiver em andamento
          disabled={!!isLoading}
        >
          {isLoading === 'google' ? 'Conectando...' : 'Continuar com Google'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<GitHubIcon />}
          onClick={() => handleSocialLogin('github')}
          // Desabilite o botão se QUALQUER login estiver em andamento
          disabled={!!isLoading}
        >
          {isLoading === 'github' ? 'Conectando...' : 'Continuar com GitHub'}
        </Button>
      </Box>
    </Box>
  );
}