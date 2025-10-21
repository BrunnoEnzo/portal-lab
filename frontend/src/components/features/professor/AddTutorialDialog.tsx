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
// Removidos 'styled' e 'CloudUpload'
import api from '@/lib/api';

// Removido 'VisuallyHiddenInput'

interface AddTutorialDialogProps {
  open: boolean;
  onClose: () => void;
  onTutorialAdded: () => void;
}

export function AddTutorialDialog({
  open,
  onClose,
  onTutorialAdded,
}: AddTutorialDialogProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  // Removido 'fileName'

  // Removido 'handleFileChange'

  const handleCreateTutorial = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsCreating(true);
    setError('');

    const formData = new FormData(event.currentTarget);

    // Ajustado para 'name' e 'summary' (conforme DTO do backend)
    if (!formData.get('name') || !formData.get('summary')) {
      setError('Por favor, preencha todos os campos.');
      setIsCreating(false);
      return;
    }

    try {
      const response = await api.post('/tutorials', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newTutorial = response.data;

      onTutorialAdded();
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
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <TextField
            autoFocus
            required
            id="name" // Ajustado de 'title'
            name="name" // Ajustado de 'title'
            label="Nome do Tutorial" // Ajustado
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            id="summary" // Ajustado de 'content'
            name="summary" // Ajustado de 'content'
            label="Resumo / Breve Descrição" // Ajustado
            type="text"
            fullWidth
            variant="outlined"
          />
          {/* Botão de upload de 'coverPhoto' removido */}
          {/* Exibição de 'fileName' removida */}
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