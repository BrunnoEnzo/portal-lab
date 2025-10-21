'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@prisma/client'; // Importando o tipo real
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  // LÓGICA DA IMAGEM: Se não houver coverPhotoPath, usa /semCapa.png
  const imageUrl = course.coverPhotoPath
    ? `${process.env.NEXT_PUBLIC_API_URL}${course.coverPhotoPath}`
    : '/semCapa.png';

  return (
    <Card
      component="article"
      className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <Box className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={`Capa do curso ${course.name}`}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h5" component="h2">
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="line-clamp-3">
          {course.summary}
        </Typography>
      </CardContent>
      <CardActions className="border-t p-4">
        <Button
          component={Link}
          href={`/professor/manage-courses/${course.id}`}
          size="small"
          variant="contained"
        >
          Gerenciar
        </Button>
      </CardActions>
    </Card>
  );
}