'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '@/lib/api';
import { Tutorial } from '@prisma/client';

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

export default function ManageTutorialPage() {
  const params = useParams();
  const tutorialId = params.tutorialId as string;

  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (tutorialId) {
      api
        .get(`/tutorials/${tutorialId}`)
        .then((response) => {
          setTutorial(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setError('Tutorial não encontrado.');
          setIsLoading(false);
        });
    }
  }, [tutorialId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewCoverPhoto(file);
      setCoverPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tutorial) return;

    setIsSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    if (newCoverPhoto) {
      formData.append('coverPhoto', newCoverPhoto);
    }

    try {
      const response = await api.patch(`/tutorials/${tutorialId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTutorial(response.data);
      // Limpa pré-visualização e arquivo
      setNewCoverPhoto(null);
      setCoverPhotoPreview(null);
    } catch (err) {
      console.error('Falha ao salvar o tutorial:', err);
      setError('Não foi possível salvar as alterações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" className="text-center">
        {error}
      </Typography>
    );
  }

  if (!tutorial) {
    return (
      <Typography className="text-center">Tutorial não encontrado.</Typography>
    );
  }

  // Lógica da Imagem de Capa
  const imageUrl =
    coverPhotoPreview ||
    (tutorial.coverPhotoPath
      ? `${process.env.NEXT_PUBLIC_API_URL}${tutorial.coverPhotoPath}`
      : '/semCapa.png');

  return (
    <Box
      component="form"
      onSubmit={handleSave}
      className="max-w-4xl mx-auto p-4 space-y-6"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Tutorial
      </Typography>

      <TextField
        label="Nome do Tutorial"
        name="name"
        defaultValue={tutorial.name}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Resumo"
        name="summary"
        defaultValue={tutorial.summary}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="URL do YouTube (Opcional)"
        name="youtubeUrl"
        defaultValue={tutorial.youtubeUrl || ''}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Conteúdo Principal"
        name="content"
        defaultValue={tutorial.content || ''}
        variant="outlined"
        fullWidth
        multiline
        rows={10}
      />

      {/* Gerenciamento da Foto de Capa */}
      <Box className="mt-4">
        <Typography variant="h6">Foto de Capa</Typography>
        <Image
          src={imageUrl}
          alt="Foto de Capa"
          width={300}
          height={150}
          className="rounded-md object-cover my-2 border"
        />
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          {newCoverPhoto ? newCoverPhoto.name : 'Alterar Foto de Capa'}
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSaving}
        startIcon={
          isSaving ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
      </Button>
    </Box>
  );
}