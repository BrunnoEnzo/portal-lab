// frontend/src/components/features/professor/TutorialCard.tsx
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

// Definindo a interface para as props
interface Tutorial {
  id: string;
  title: string;
  content: string | null;
  coverPhotoPath: string | null;
}

interface TutorialCardProps {
  tutorial: Tutorial;
}

// Aplicando a interface ao componente
export function TutorialCard({ tutorial }: TutorialCardProps) {
  const imageUrl = tutorial.coverPhotoPath
    ? `${process.env.NEXT_PUBLIC_API_URL}${tutorial.coverPhotoPath}`
    : '/placeholder-image.png'; // Imagem padrão

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={`Capa do tutorial ${tutorial.title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tutorial.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tutorial.content || 'Este tutorial não possui um resumo.'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          href={`/professor/manage-tutorials/${tutorial.id}`}
        >
          Gerenciar
        </Button>
      </CardActions>
    </Card>
  );
}