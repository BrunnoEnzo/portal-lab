// frontend/src/app/(main)/professor/dashboard/page.tsx
import { DashboardCard } from '@/components/features/professor/DashboardCard';
import Typography from '@mui/material/Typography';

export default function ProfessorDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Typography
        variant="h4"
        component="h1"
        className="mb-8 font-bold text-gray-800"
      >
        Painel do Professor
      </Typography>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Gerenciar Cursos"
          description="Crie, edite e organize os módulos e aulas dos seus cursos."
          href="/professor/manage-courses"
          linkText="Gerenciar Cursos"
        />
        <DashboardCard
          title="Gerenciar Tutoriais"
          description="Publique tutoriais em vídeo e texto para seus alunos."
          href="/professor/manage-tutorials"
          linkText="Gerenciar Tutoriais"
        />
        <DashboardCard
          title="Gerenciar Artigos"
          description="Compartilhe artigos e materiais de apoio em formato PDF."
          href="/professor/manage-articles"
          linkText="Gerenciar Artigos"
        />
      </div>
    </div>
  );
}