// frontend/src/app/(main)/professor/manage-tutorials/[tutorialId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function EditTutorialPage() {
  const params = useParams();
  const tutorialId = params.tutorialId;

  // Aqui, você usaria o tutorialId para buscar os dados do tutorial na sua API

  return (
    <div>
      <Button
        component={Link}
        href="/professor/manage-tutorials"
        startIcon={<ArrowBackIcon />}
        className="mb-6"
      >
        Voltar para Tutoriais
      </Button>

      <Typography variant="h4" component="h1" className="font-bold mb-4">
        Editar Tutorial
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Você está editando o tutorial com ID: {tutorialId}
      </Typography>

      {/* PRÓXIMOS PASSOS AQUI:
        1. Componente para editar nome e resumo.
        2. Componente para gerenciar a foto de capa.
        3. Componente para adicionar/editar o link do YouTube.
        4. Componente para editar o texto do tutorial.
      */}
    </div>
  );
}