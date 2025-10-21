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
  Link,
} from '@mui/material';
import { CloudUpload, PictureAsPdf } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '@/lib/api';
import { Article } from '@prisma/client';

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

export default function ManageArticlePage() {
  const params = useParams();
  const articleId = params.articleId as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    null,
  );
  const [newPdfFile, setNewPdfFile] = useState<File | null>(null);

  useEffect(() => {
    if (articleId) {
      api
        .get(`/articles/${articleId}`)
        .then((response) => {
          setArticle(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setError('Artigo não encontrado.');
          setIsLoading(false);
        });
    }
  }, [articleId]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: 'coverPhoto' | 'pdfFile',
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (fileType === 'coverPhoto') {
        setNewCoverPhoto(file);
        setCoverPhotoPreview(URL.createObjectURL(file));
      } else if (fileType === 'pdfFile') {
        setNewPdfFile(file);
      }
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!article) return;

    setIsSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    if (newCoverPhoto) {
      formData.append('coverPhoto', newCoverPhoto);
    }
    if (newPdfFile) {
      formData.append('pdfFile', newPdfFile);
    }

    try {
      const response = await api.patch(`/articles/${articleId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setArticle(response.data);
      // Limpa pré-visualizações e arquivos selecionados
      setNewCoverPhoto(null);
      setCoverPhotoPreview(null);
      setNewPdfFile(null);
    } catch (err) {
      console.error('Falha ao salvar o artigo:', err);
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

  if (!article) {
    return (
      <Typography className="text-center">Artigo não encontrado.</Typography>
    );
  }

  // Lógica da Imagem de Capa
  const imageUrl =
    coverPhotoPreview ||
    (article.coverPhotoPath
      ? `${process.env.NEXT_PUBLIC_API_URL}${article.coverPhotoPath}`
      : '/semCapa.png');

  return (
    <Box
      component="form"
      onSubmit={handleSave}
      className="max-w-4xl mx-auto p-4 space-y-6"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Artigo
      </Typography>

      <TextField
        label="Nome do Artigo"
        name="name"
        defaultValue={article.name}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Resumo"
        name="summary"
        defaultValue={article.summary}
        variant="outlined"
        fullWidth
        required
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
            onChange={(e) => handleFileChange(e, 'coverPhoto')}
          />
        </Button>
      </Box>

      {/* Gerenciamento do PDF */}
      <Box className="mt-4">
        <Typography variant="h6">Arquivo PDF</Typography>
        <Box className="flex items-center gap-4 my-2">
          <PictureAsPdf />
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}${article.pdfFilePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver PDF Atual
          </Link>
        </Box>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          {newPdfFile ? newPdfFile.name : 'Alterar Arquivo PDF'}
          <VisuallyHiddenInput
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'pdfFile')}
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