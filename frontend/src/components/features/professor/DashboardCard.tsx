// frontend/src/components/features/professor/DashboardCard.tsx
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ArrowForward } from '@mui/icons-material'; // Ícone do Material-UI

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

export function DashboardCard({
  title,
  description,
  href,
  linkText,
}: DashboardCardProps) {
  return (
    <Card
      className="flex h-full flex-col justify-between shadow-lg transition-shadow hover:shadow-xl"
      elevation={4}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          className="mb-2 font-bold text-gray-800"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="px-4 pb-4">
        <Link href={href} passHref className="w-full">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<ArrowForward />}
          >
            {linkText}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}