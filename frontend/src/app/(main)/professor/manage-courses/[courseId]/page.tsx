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
import { Course } from '@prisma/client';

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

export default function ManageCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (courseId) {
      api
        .get(`/courses/${courseId}`)
        .then((response) => {
          setCourse(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setError('Curso não encontrado.');
          setIsLoading(false);
        });
    }
  }, [courseId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewCoverPhoto(file);
      setCoverPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!course) return;

    setIsSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    // Adiciona a nova foto de capa apenas se uma foi selecionada
    if (newCoverPhoto) {
      formData.append('coverPhoto', newCoverPhoto);
    }
    // O backend (PATCH) já ignora campos de arquivo se não forem enviados

    try {
      const response = await api.patch(`/courses/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCourse(response.data);
      // Limpa a pré-visualização e o arquivo selecionado após salvar
      setNewCoverPhoto(null);
      setCoverPhotoPreview(null);
    } catch (err) {
      console.error('Falha ao salvar o curso:', err);
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

  if (!course) {
    return (
      <Typography className="text-center">Curso não encontrado.</Typography>
    );
  }

  // Define a URL da imagem (nova, existente ou placeholder)
  const imageUrl =
    coverPhotoPreview ||
    (course.coverPhotoPath
      ? `${process.env.NEXT_PUBLIC_API_URL}${course.coverPhotoPath}`
      : '/semCapa.png');

  return (
    <Box
      component="form"
      onSubmit={handleSave}
      className="max-w-4xl mx-auto p-4 space-y-6"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Curso
      </Typography>

      <TextField
        label="Nome do Curso"
        name="name"
        defaultValue={course.name}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Resumo"
        name="summary"
        defaultValue={course.summary}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Descrição Completa"
        name="description"
        defaultValue={course.description || ''}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />

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
            name="coverPhoto" // Este name é usado pelo handleFileChange, não pelo FormData direto
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