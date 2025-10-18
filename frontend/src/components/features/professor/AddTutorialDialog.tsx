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
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';
import api from '@/lib/api';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  const handleCreateTutorial = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsCreating(true);
    setError('');

    const formData = new FormData(event.currentTarget);

    if (!formData.get('title') || !formData.get('content')) {
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
            id="title"
            name="title"
            label="Título do Tutorial"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            id="content"
            name="content"
            label="Conteúdo / Descrição"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Foto de Capa
            <VisuallyHiddenInput
              type="file"
              name="coverPhoto"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {fileName && <p className="mt-1 text-sm text-gray-600">{fileName}</p>}
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