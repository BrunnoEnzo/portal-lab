// src/components/layout/Footer.tsx
import { Box, Typography, Container } from '@mui/material';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      className="bg-gray-800 text-white py-6 mt-auto"
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {currentYear} Portal Lab. Todos os direitos reservados.
        </Typography>
        <Typography variant="caption" align="center" display="block" className="mt-2 text-gray-400">
          Desenvolvido por Brunno Enzo Silva Meneses
        </Typography>
      </Container>
    </Box>
  );
};