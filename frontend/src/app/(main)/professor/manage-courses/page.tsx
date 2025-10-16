// frontend/src/app/(main)/professor/manage-courses/page.tsx
'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Add } from '@mui/icons-material';

import { CourseCard } from '@/components/features/professor/CourseCard';
import { AddCourseDialog } from '@/components/features/professor/AddCourseDialog';

// Dados de exemplo que viriam da sua API
const MOCK_COURSES = [
  { id: '1', name: 'Curso de React com Next.js', coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee' },
  { id: '2', name: 'Dominando Node.js e Prisma' },
  { id: '3', name: 'Introdução ao Docker', coverImage: 'https://images.unsplash.com/photo-1617546492386-a324b335551c' },
  { id: '4', name: 'Testes unitários com Jest' }
];

export default function ManageCoursesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // No futuro, aqui você fará a chamada à API para buscar os cursos
  const courses = MOCK_COURSES;

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Typography variant="h4" component="h1" className="font-bold">
          Gerenciar Cursos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Adicionar Curso
        </Button>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              coverImage={course.coverImage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <Typography variant="h6" color="text.secondary">
            Nenhum curso encontrado.
          </Typography>
          <Typography color="text.secondary">
            {/* CORREÇÃO APLICADA AQUI */}
            {`Clique em 'Adicionar Curso' para começar.`}
          </Typography>
        </div>
      )}

      <AddCourseDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}