import Image from "next/image";
import { Box, Typography, Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" className="text-center mt-10 ">
      <Typography variant="h3" component="h1" gutterBottom className="font-bold text-light">
        Bem-vindo ao Portal Lab
      </Typography>
    </Container>
  );
}
