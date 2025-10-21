'use client';

import { useState, useEffect } from 'react';
import { Tutorial } from '@prisma/client';
import { TutorialCard } from '@/components/features/professor/TutorialCard';
import { AddTutorialDialog } from '@/components/features/professor/AddTutorialDialog';
import api from '@/lib/api';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Add } from '@mui/icons-material';

export default function ManageTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchTutorials = async () => {
    setLoading(true);
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
    fetchTutorials();
  };

  return (
    <>
      <Box
        component="header"
        className="mb-6 flex items-center justify-between"
      >
        <Typography variant="h4" component="h1" className="font-semibold">
          Gerenciar Tutoriais
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Adicionar Tutorial
        </Button>
      </Box>

      {loading && (
        <Box className="flex h-64 items-center justify-center">
          <CircularProgress />
        </Box>
      )}

      {!loading && tutorials.length === 0 && (
        <Typography variant="body1" className="text-center text-gray-500">
          Nenhum tutorial encontrado. Clique em &quot;Adicionar Tutorial&quot;
          para começar.
        </Typography>
      )}

      {!loading && tutorials.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      )}

      <AddTutorialDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onTutorialAdded={handleTutorialAdded}
      />
    </>
  );
}