// frontend/src/components/features/professor/AddTutorialDialog.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import api from '@/lib/api';

interface AddTutorialDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddTutorialDialog({ open, onClose }: AddTutorialDialogProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreateTutorial = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const tutorialData = {
      name: formData.get('name') as string,
      summary: formData.get('summary') as string,
    };

    if (!tutorialData.name || !tutorialData.summary) {
      setError('Por favor, preencha todos os campos.');
      setIsCreating(false);
      return;
    }

    try {
      const response = await api.post('/tutorials', tutorialData);
      const newTutorial = response.data;

      onClose();
      router.push(`/professor/manage-tutorials/${newTutorial.id}`);
    } catch (err) {
      console.error('Falha ao criar tutorial:', err);
      setError('Não foi possível criar o tutorial. Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Novo Tutorial</DialogTitle>
      <form onSubmit={handleCreateTutorial}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Nome do Tutorial"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            id="summary"
            name="summary"
            label="Resumo / Breve Descrição"
            type="text"
            fullWidth
            variant="outlined"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{''}{error}</p>
          )}
        </DialogContent>
        <DialogActions sx={{ p: '1rem' }}>
          <Button onClick={onClose} color="secondary" disabled={isCreating}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isCreating}>
            {isCreating ? <CircularProgress size={24} color="inherit" /> : 'Criar e Editar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}