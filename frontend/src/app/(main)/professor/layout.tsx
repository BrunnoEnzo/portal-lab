// frontend/src/app/(main)/professor/layout.tsx
import Box from '@mui/material/Box';

export default function ProfessorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Usamos um Box para servir como o container principal do conteúdo
    // A propriedade flexGrow: 1 garante que ele ocupe o espaço disponível
    // p: 3 adiciona um padding (espaçamento interno)
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {/* O conteúdo da página (ex: dashboard, manage-courses) será renderizado aqui */}
      {children}
    </Box>
  );
}