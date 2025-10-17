// frontend/src/components/features/professor/AddArticleDialog.tsx
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
import { styled } from '@mui/material/styles'; // Importe o 'styled'
import { CloudUpload } from '@mui/icons-material';
import api from '@/lib/api';

// Definição do VisuallyHiddenInput que estava faltando
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

interface AddArticleDialogProps {
  open: boolean;
  onClose: () => void;
  onArticleAdded: () => void;
}

export function AddArticleDialog({
  open,
  onClose,
  onArticleAdded,
}: AddArticleDialogProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  const handleCreateArticle = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsCreating(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const pdfFile = formData.get('pdfFile');

    if (
      !formData.get('name') ||
      !formData.get('summary') ||
      !pdfFile ||
      (pdfFile as File).size === 0
    ) {
      setError(
        'Por favor, preencha todos os campos e selecione um arquivo PDF.',
      );
      setIsCreating(false);
      return;
    }

    try {
      const response = await api.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newArticle = response.data;

      onArticleAdded();
      onClose();
      router.push(`/professor/manage-articles/${newArticle.id}`);
    } catch (err) {
      console.error('Falha ao criar artigo:', err);
      setError('Não foi possível criar o artigo. Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Novo Artigo</DialogTitle>
      <form onSubmit={handleCreateArticle}>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Nome do Artigo"
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
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Selecionar PDF
            {/* Agora o VisuallyHiddenInput está definido e o erro vai sumir */}
            <VisuallyHiddenInput
              type="file"
              name="pdfFile"
              accept=".pdf"
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