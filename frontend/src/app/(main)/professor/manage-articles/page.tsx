'use client';

import { useState, useEffect } from 'react';
import { Article } from '@prisma/client';
import { ArticleCard } from '@/components/features/professor/ArticleCard';
import { AddArticleDialog } from '@/components/features/professor/AddArticleDialog';
import api from '@/lib/api';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Add } from '@mui/icons-material';

export default function ManageArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleArticleAdded = () => {
    fetchArticles();
  };

  return (
    <>
      <Box
        component="header"
        className="mb-6 flex items-center justify-between"
      >
        <Typography variant="h4" component="h1" className="font-semibold">
          Gerenciar Artigos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Adicionar Artigo
        </Button>
      </Box>

      {loading && (
        <Box className="flex h-64 items-center justify-center">
          <CircularProgress />
        </Box>
      )}

      {!loading && articles.length === 0 && (
        <Typography variant="body1" className="text-center text-gray-500">
          Nenhum artigo encontrado. Clique em &quot;Adicionar Artigo&quot; para
          começar.
        </Typography>
      )}

      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      <AddArticleDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onArticleAdded={handleArticleAdded}
      />
    </>
  );
}