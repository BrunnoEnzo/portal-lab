// frontend/src/app/(main)/professor/manage-courses/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CourseCard } from '@/components/features/professor/CourseCard';
import { AddCourseDialog } from '@/components/features/professor/AddCourseDialog';
import api from '@/lib/api';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Course {
  id: string;
  name: string;
  summary: string | null;
  coverPhotoPath: string | null;
}

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  // Esta função será chamada quando um curso for adicionado
  const handleCourseAdded = () => {
    fetchCourses(); // Recarrega a lista de cursos
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Gerenciar Cursos
        </Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          Adicionar Curso
        </Button>
      </Box>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <AddCourseDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onCourseAdded={handleCourseAdded} // <- Prop adicionada aqui
      />
    </>
  );
}