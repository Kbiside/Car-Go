import { Breadcrumbs, Anchor, Text } from '@mantine/core';
import { Link, useMatches } from 'react-router-dom';
import { IconHome } from '@tabler/icons-react';

export function AppBreadcrumbs() {
  const matches = useMatches();
  
  // Всегда включаем главную страницу первой крошкой
  const homeCrumb = {
    path: '/dashboard',
    title: 'Главная'
  };

  const routeCrumbs = matches
    .filter((match) => match.handle && (match.handle as any).crumb && match.pathname !== '/dashboard')
    .map((match) => ({
      path: match.pathname,
      title: (match.handle as any).crumb,
    }));

  // Объединяем главную страницу с остальными крошками
  const allCrumbs = [homeCrumb, ...routeCrumbs];

  return (
    <Breadcrumbs 
      separator={
        <Text c="#8a6337" mx={4}>/</Text>
      }
      style={{
        padding: '8px 16px',
        backgroundColor: '#f5f1e6',
        borderRadius: '4px',
        border: '1px solid #d9c3a7'
      }}
    >
      {allCrumbs.map((crumb, index) => (
        <Anchor 
          component={Link} 
          to={crumb.path} 
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: index === allCrumbs.length - 1 ? '#50381b' : '#8a6337',
            fontWeight: index === allCrumbs.length - 1 ? 600 : 400,
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {index === 0 && <IconHome size={16} color="#8a6337" />}
          {crumb.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
}