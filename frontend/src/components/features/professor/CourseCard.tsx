// frontend/src/components/features/professor/CourseCard.tsx
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

// Definindo a interface para as props do componente
interface Course {
  id: string;
  name: string;
  summary: string | null;
  coverPhotoPath: string | null;
}

interface CourseCardProps {
  course: Course;
}

// Aplicando a interface ao componente
export function CourseCard({ course }: CourseCardProps) {
  const imageUrl = course.coverPhotoPath
    ? `${process.env.NEXT_PUBLIC_API_URL}${course.coverPhotoPath}`
    : '/placeholder-image.png'; // Uma imagem padrão caso não haja foto

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={`Capa do curso ${course.name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.summary || 'Este curso não possui um resumo.'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          href={`/professor/manage-courses/${course.id}`}
        >
          Gerenciar
        </Button>
      </CardActions>
    </Card>
  );
}