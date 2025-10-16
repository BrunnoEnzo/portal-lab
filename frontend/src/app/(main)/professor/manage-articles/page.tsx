// frontend/src/app/(main)/professor/manage-articles/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Add } from '@mui/icons-material';

import { ArticleCard } from '@/components/features/professor/ArticleCard';
import { AddArticleDialog } from '@/components/features/professor/AddArticleDialog';

// Interface para o tipo de artigo
interface Article {
  id: string;
  name: string;
}

// Dados de exemplo que viriam da sua API
const MOCK_ARTICLES: Article[] = [
  { id: '1', name: 'A Arquitetura de Microsserviços' },
  { id: '2', name: 'Estado da Arte em IA' },
  { id: '3', name: 'Guia Completo de Clean Code' },
];

export default function ManageArticlesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  // Simula a busca de dados da API quando o componente monta
  useEffect(() => {
    // Aqui você faria a chamada fetch para sua API
    setArticles(MOCK_ARTICLES);
  }, []);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  // Esta função será chamada pelo Dialog quando um novo artigo for criado
  const fetchArticles = () => {
    console.log("Recarregando a lista de artigos...");
    // Em um app real, você faria uma nova chamada à API para pegar a lista atualizada
    // Para simular, vamos apenas adicionar um novo artigo à lista mockada
    const newArticle: Article = { id: `new-${Date.now()}`, name: 'Novo Artigo Adicionado' };
    setArticles(prev => [...prev, newArticle]);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Typography variant="h4" component="h1" className="font-bold">
          Gerenciar Artigos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Adicionar Artigo
        </Button>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              name={article.name}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <Typography variant="h6" color="text.secondary">
            Nenhum artigo encontrado.
          </Typography>
          <Typography color="text.secondary">
            {/* CORREÇÃO APLICADA AQUI */}
            {`Clique em 'Adicionar Artigo' para começar.`}
          </Typography>
        </div>
      )}

      <AddArticleDialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        onArticleAdded={fetchArticles}
      />
    </>
  );
}