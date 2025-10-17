// frontend/src/components/features/professor/AddCourseDialog.tsx
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

interface AddCourseDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddCourseDialog({ open, onClose }: AddCourseDialogProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreateCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const courseData = {
      name: formData.get('name') as string,
      summary: formData.get('summary') as string,
    };

    if (!courseData.name || !courseData.summary) {
      setError('Por favor, preencha todos os campos.');
      setIsCreating(false);
      return;
    }

    try {
      const response = await api.post('/courses', courseData);
      const newCourse = response.data;

      onClose();
      router.push(`/professor/manage-courses/${newCourse.id}`);
    } catch (err) {
      console.error('Falha ao criar curso:', err);
      setError('Não foi possível criar o curso. Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Novo Curso</DialogTitle>
      <form onSubmit={handleCreateCourse}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Nome do Curso"
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