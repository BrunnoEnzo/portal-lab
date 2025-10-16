// frontend/src/app/(main)/professor/manage-articles/[articleId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.articleId;

  // Aqui você buscaria os dados do artigo (nome, resumo) pela API usando o articleId

  return (
    <div>
      <Button
        component={Link}
        href="/professor/manage-articles"
        startIcon={<ArrowBackIcon />}
        className="mb-6"
      >
        Voltar para Artigos
      </Button>

      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Editar Artigo
      </Typography>

      <Paper component="form" className="p-6 flex flex-col gap-4" elevation={3}>
        <Typography variant="body1" color="text.secondary" className="mb-2">
          Você está editando o artigo com ID: {articleId}
        </Typography>
        <TextField
          required
          id="name"
          name="name"
          label="Nome do Artigo"
          // value={articleData.name} /* Preencher com dados da API */
          fullWidth
          variant="outlined"
        />
        <TextField
          required
          id="summary"
          name="summary"
          label="Resumo / Breve Descrição"
          // value={articleData.summary} /* Preencher com dados da API */
          fullWidth
          variant="outlined"
        />
        {/* Futuramente, pode adicionar um botão para substituir o PDF aqui */}
        <Button variant="contained" type="submit" className="self-start">
            Salvar Alterações
        </Button>
      </Paper>
    </div>
  );
}