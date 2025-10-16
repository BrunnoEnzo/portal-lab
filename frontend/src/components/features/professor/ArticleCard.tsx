// frontend/src/components/features/professor/ArticleCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

interface ArticleCardProps {
  id: string;
  name: string;
}

// Imagem estática para todos os cards de artigo.
// Você pode trocar a URL ou colocar uma imagem local em /public.
const STATIC_ARTICLE_IMAGE = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d';

export function ArticleCard({ id, name }: ArticleCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    // Navega para a página de edição do artigo
    router.push(`/professor/manage-articles/${id}`);
  };

  return (
    <Card
      className="transition-transform hover:scale-105 hover:shadow-xl"
      elevation={4}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="170"
          image={STATIC_ARTICLE_IMAGE}
          alt="Imagem de um artigo"
          className="bg-gray-200"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="truncate font-semibold"
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}