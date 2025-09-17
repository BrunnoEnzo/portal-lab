// src/components/ThemeRegistry.tsx
'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';

// Crie seu tema customizado aqui.
// Você pode customizar cores, fontes, etc.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e4e4e4ff',
    },
    secondary: {
      main: '#1c5ea8ff',
    },
    background: {
      default: '#ffffffff',
      paper: '#000000ff',
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline reinicia o CSS para um padrão consistente */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}