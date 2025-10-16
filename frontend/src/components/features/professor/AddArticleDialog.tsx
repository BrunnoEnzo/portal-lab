// frontend/src/components/features/professor/AddArticleDialog.tsx
'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';

// Estilizando o input de arquivo para ficar invisível
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
  // Função para ser chamada quando um artigo for criado, para atualizar a lista
  onArticleAdded: () => void;
}

export function AddArticleDialog({ open, onClose, onArticleAdded }: AddArticleDialogProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  const handleCreateArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const pdfFile = formData.get('pdf-file');

    // Validação
    if (!formData.get('name') || !formData.get('summary') || !pdfFile || (pdfFile as File).size === 0) {
      setError('Por favor, preencha todos os campos e selecione um arquivo PDF.');
      setIsCreating(false);
      return;
    }

    try {
      // --- LÓGICA DE API (Simulação) ---
      // Aqui você enviaria o formData (que inclui o arquivo) para a sua API
      console.log('Criando artigo com os dados:', {
        name: formData.get('name'),
        summary: formData.get('summary'),
        file: pdfFile,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula upload
      // --- FIM DA LÓGICA DE API ---
      
      onArticleAdded(); // Avisa o componente pai para recarregar a lista
      onClose(); // Fecha o dialog
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
        <DialogContent className="flex flex-col gap-4">
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
            <VisuallyHiddenInput type="file" name="pdf-file" accept=".pdf" onChange={handleFileChange} />
          </Button>
          {fileName && (
            <p className="mt-1 text-sm text-gray-600">Arquivo: {fileName}</p>
          )}
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={onClose} color="secondary" disabled={isCreating}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isCreating}>
            {isCreating ? <CircularProgress size={24} color="inherit" /> : 'Criar Artigo'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}