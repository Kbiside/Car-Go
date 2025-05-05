import { Breadcrumbs, Anchor } from '@mantine/core';
import { Link, useMatches } from 'react-router-dom';

export function AppBreadcrumbs() {
  const matches = useMatches();
  
  // Всегда включаем главную страницу первой крошкой
  const homeCrumb = {
    path: '/',
    title: 'Главная'
  };

  const routeCrumbs = matches
    .filter((match) => match.handle && (match.handle as any).crumb && match.pathname !== '/')
    .map((match) => ({
      path: match.pathname,
      title: (match.handle as any).crumb,
    }));

  // Объединяем главную страницу с остальными крошками
  const allCrumbs = [homeCrumb, ...routeCrumbs];

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