import { NavLink, ScrollArea, Box } from '@mantine/core';
import {
  IconUsers,
  IconCar,
  IconBriefcase,
  IconClipboardList,
  IconMessage,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ComponentType<{ size: string }>;
  label: string;
  path: string;
}

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: IconUsers, label: 'Клиенты', path: '/clients' },
    { icon: IconCar, label: 'Автопарк', path: '/cars' },
    { icon: IconBriefcase, label: 'Сотрудники', path: '/employees' },
    { icon: IconClipboardList, label: 'Заказы', path: '/requests' },
    { icon: IconMessage, label: 'Обратная связь', path: '/feedback' },
  ];

  return (
    <ScrollArea h={`calc(100vh - 60px)`}>
      <Box p="sm">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              component="button"
              label={item.label}
              leftSection={<Icon size="1rem" />}
              onClick={() => navigate(item.path)}
              active={location.pathname.startsWith(item.path)}
              variant="light"
            />
          );
        })}
      </Box>
    </ScrollArea>
  );
}