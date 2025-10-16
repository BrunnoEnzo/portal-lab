// frontend/src/app/(main)/professor/manage-courses/[courseId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function EditCoursePage() {
  const params = useParams();
  const courseId = params.courseId; // Pega o ID da URL

  // Aqui, você usaria o courseId para buscar os dados completos do curso na sua API

  return (
    <div>
      <Button
        component={Link}
        href="/professor/manage-courses"
        startIcon={<ArrowBackIcon />}
        className="mb-6"
      >
        Voltar para Cursos
      </Button>

      <Typography variant="h4" component="h1" className="font-bold mb-4">
        Editar Curso
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Você está editando o curso com ID: {courseId}
      </Typography>

      {/* PRÓXIMOS PASSOS AQUI:
        1. Componente para editar dados básicos (nome, resumo, descrição).
        2. Componente para gerenciar a foto de capa.
        3. Componente para gerenciar os módulos e aulas.
      */}
    </div>
  );
}