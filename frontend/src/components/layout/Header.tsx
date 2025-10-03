// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar className="flex justify-between">
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="div"
            // Classes do Tailwind para a cor do texto, negrito e efeito hover
            className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            portal-lab
          </Typography>
        </Link>

        <Box>
          <Link href="/login" passHref>
            <Button variant="contained" color="secondary">
              Login
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};