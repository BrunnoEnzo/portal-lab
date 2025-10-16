// frontend/src/components/features/professor/TutorialCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

interface TutorialCardProps {
  id: string;
  name: string;
  coverImage?: string;
}

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x170.png?text=Sem+Capa';

export function TutorialCard({ id, name, coverImage }: TutorialCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    // Navega para a página de edição do tutorial
    router.push(`/professor/manage-tutorials/${id}`);
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
          alt={`Capa do tutorial ${name}`}
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