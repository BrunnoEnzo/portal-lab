// frontend/src/app/(main)/professor/manage-tutorials/page.tsx
'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Add } from '@mui/icons-material';

import { TutorialCard } from '@/components/features/professor/TutorialCard';
import { AddTutorialDialog } from '@/components/features/professor/AddTutorialDialog';

// Dados de exemplo que viriam da sua API
const MOCK_TUTORIALS = [
  { id: '1', name: 'Como configurar o ESLint', coverImage: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667' },
  { id: '2', name: 'Primeiros passos com TailwindCSS', coverImage: 'https://images.unsplash.com/photo-1644261491294-3a675e0a6d5a'},
  { id: '3', name: 'O que é o JWT?' },
];

export default function ManageTutorialsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // No futuro, aqui você fará a chamada à API para buscar os tutoriais
  const tutorials = MOCK_TUTORIALS;

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Typography variant="h4" component="h1" className="font-bold">
          Gerenciar Tutoriais
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Adicionar Tutorial
        </Button>
      </div>

      {tutorials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              id={tutorial.id}
              name={tutorial.name}
              coverImage={tutorial.coverImage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <Typography variant="h6" color="text.secondary">
            Nenhum tutorial encontrado.
          </Typography>
          <Typography color="text.secondary">
            {/* CORREÇÃO APLICADA AQUI */}
            {`Clique em 'Adicionar Tutorial' para começar.`}
          </Typography>
        </div>
      )}

      <AddTutorialDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}