// src/components/features/auth/SocialLoginButtons.tsx
'use client';

import { signIn } from 'next-auth/react';
import { Button, Stack, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from 'react';

export const SocialLoginButtons = () => {
  const [isLoading, setIsLoading] = useState<null | 'google' | 'github'>(null);

  const handleSocialLogin = (provider: 'google' | 'github') => {
    setIsLoading(provider);
    signIn(provider, { callbackUrl: '/student/dashboard' });
  };

  return (
    <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
      <Divider>OU</Divider>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => handleSocialLogin('google')}
        disabled={!!isLoading}
      >
        {isLoading === 'google' ? 'Conectando...' : 'Continuar com Google'}
      </Button>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={() => handleSocialLogin('github')}
        disabled={!!isLoading}
      >
        {isLoading === 'github' ? 'Conectando...' : 'Continuar com GitHub'}
      </Button>
    </Stack>
  );
};