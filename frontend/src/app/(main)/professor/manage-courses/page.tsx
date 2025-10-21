'use client';

import { useState, useEffect } from 'react';
import { Course } from '@prisma/client';
import { CourseCard } from '@/components/features/professor/CourseCard';
import { AddCourseDialog } from '@/components/features/professor/AddCourseDialog';
import api from '@/lib/api';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Add } from '@mui/icons-material';

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
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

  const handleCourseAdded = () => {
    fetchCourses();
  };

  return (
    <>
      <Box
        component="header"
        className="mb-6 flex items-center justify-between"
      >
        <Typography variant="h4" component="h1" className="font-semibold">
          Gerenciar Cursos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Adicionar Curso
        </Button>
      </Box>

      {loading && (
        <Box className="flex h-64 items-center justify-center">
          <CircularProgress />
        </Box>
      )}

      {!loading && courses.length === 0 && (
        <Typography variant="body1" className="text-center text-gray-500">
          Nenhum curso encontrado. Clique em &quot;Adicionar Curso&quot; para
          começar.
        </Typography>
      )}

      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      <AddCourseDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onCourseAdded={handleCourseAdded}
      />
    </>
  );
}