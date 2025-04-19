import { AppShell, NavLink, ScrollArea } from '@mantine/core';
import {
  IconUsers,
  IconCar,
  IconBriefcase,
  IconClipboardList,
  IconReportAnalytics,
  IconMessage,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  opened: boolean;
}

export function Navbar({ opened }: NavbarProps) {
  const navigate = useNavigate();

  const navItems = [
    { icon: IconUsers, label: 'Клиенты', path: '/clients' },
    { icon: IconCar, label: 'Автопарк', path: '/cars' },
    { icon: IconBriefcase, label: 'Сотрудники', path: '/employees' },
    { icon: IconClipboardList, label: 'Заказы', path: '/orders' },
    { icon: IconReportAnalytics, label: 'Отчеты', path: '/reports' },
    { icon: IconMessage, label: 'Обратная связь', path: '/feedback' },
  ];

  return (
    <AppShell.Navbar
      p="md"
      hidden={!opened}
      style={{ display: opened ? 'block' : 'none' }}
    >
      <ScrollArea>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            icon={<item.icon size="1rem" />}
            label={item.label}
            onClick={() => navigate(item.path)}
          />
        ))}
      </ScrollArea>
    </AppShell.Navbar>
  );
}