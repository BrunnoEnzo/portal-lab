// frontend/src/app/(main)/professor/manage-tutorials/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { TutorialCard } from '@/components/features/professor/TutorialCard';
import { AddTutorialDialog } from '@/components/features/professor/AddTutorialDialog';
import api from '@/lib/api';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Tutorial {
  id: string;
  title: string;
  content: string | null;
  coverPhotoPath: string | null;
}

export default function ManageTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchTutorials = async () => {
    try {
      const response = await api.get('/tutorials');
      setTutorials(response.data);
    } catch (error) {
      console.error('Failed to fetch tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleTutorialAdded = () => {
    fetchTutorials(); // Recarrega a lista
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
          Gerenciar Tutoriais
        </Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          Adicionar Tutorial
        </Button>
      </Box>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
      <AddTutorialDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onTutorialAdded={handleTutorialAdded} // <- Prop adicionada aqui
      />
    </>
  );
}