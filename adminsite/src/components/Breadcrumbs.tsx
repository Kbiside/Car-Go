import { Breadcrumbs, Anchor } from '@mantine/core';
import { Link, useMatches } from 'react-router-dom';

export function AppBreadcrumbs() {
  const matches = useMatches();
  
  // Проверяем, находимся ли мы на главной странице (dashboard)
  const isDashboard = matches.some(match => match.pathname === '/dashboard');
  
  // Если это главная страница, не рендерим хлебные крошки
  if (isDashboard) {
    return null;
  }

  // Для всех остальных страниц формируем крошки
  const routeCrumbs = matches
    .filter((match) => match.handle && (match.handle as any).crumb && match.pathname !== '/')
    .map((match) => ({
      path: match.pathname,
      title: (match.handle as any).crumb,
    }));

  // Всегда добавляем "Главную" как первую крошку для не-главных страниц
  const allCrumbs = [{ path: '/dashboard', title: 'Главная' }, ...routeCrumbs];

  return (
    <Breadcrumbs separator="/">
      {allCrumbs.map((crumb, index) => (
        <Anchor component={Link} to={crumb.path} key={index}>
          {crumb.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
}