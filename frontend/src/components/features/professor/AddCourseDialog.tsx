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
// Removidos 'styled' e 'CloudUpload' pois não são mais usados
import api from '@/lib/api';

// Removido 'VisuallyHiddenInput' pois não é mais usado

interface AddCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onCourseAdded: () => void;
}

export function AddCourseDialog({
  open,
  onClose,
  onCourseAdded,
}: AddCourseDialogProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  // Removido o estado 'fileName'

  // Removida a função 'handleFileChange'

  const handleCreateCourse = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsCreating(true);
    setError('');

    const formData = new FormData(event.currentTarget);

    if (!formData.get('name') || !formData.get('summary')) {
      setError('Por favor, preencha todos os campos.');
      setIsCreating(false);
      return;
    }

    try {
      // O FormData agora só contém 'name' e 'summary'
      // O backend irá tratar a 'coverPhoto' ausente como 'null'
      const response = await api.post('/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newCourse = response.data;

      onCourseAdded(); // Notifica que o curso foi adicionado
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
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
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
          {/* O botão de upload de foto de capa foi removido daqui.
          */}
          {/* Removida a exibição do 'fileName' */}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </DialogContent>
        <DialogActions sx={{ p: '1rem' }}>
          <Button onClick={onClose} color="secondary" disabled={isCreating}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isCreating}>
            {isCreating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Criar e Editar'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}