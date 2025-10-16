// frontend/src/components/features/professor/CourseCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

interface CourseCardProps {
  id: string;
  name: string;
  // A imagem de capa é opcional
  coverImage?: string;
}

// Uma imagem placeholder caso o curso não tenha uma capa definida
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x170.png?text=Sem+Capa';

export function CourseCard({ id, name, coverImage }: CourseCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    // Navega para a página de edição do curso específico
    router.push(`/professor/manage-courses/${id}`);
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
          image={coverImage || PLACEHOLDER_IMAGE}
          alt={`Capa do curso ${name}`}
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