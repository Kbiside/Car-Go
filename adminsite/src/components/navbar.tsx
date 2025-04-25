import { NavLink, ScrollArea } from '@mantine/core';
import {
  IconHome,
  IconUsers,
  IconCar,
  IconBriefcase,
  IconClipboardList,
  IconReportAnalytics,
  IconMessage,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: IconUsers, label: 'Клиенты', path: '/clients' },
    { icon: IconCar, label: 'Автопарк', path: '/cars' },
    { icon: IconBriefcase, label: 'Сотрудники', path: '/employees' },
    { icon: IconClipboardList, label: 'Заказы', path: '/requests' },
    { icon: IconReportAnalytics, label: 'Отчеты', path: '/reports' },
    { icon: IconMessage, label: 'Обратная связь', path: '/feedback' },
  ];

  return (
    <ScrollArea h={`calc(100vh - 60px)`}>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          icon={<item.icon size="1rem" />}
          label={item.label}
          onClick={() => navigate(item.path)}
          active={location.pathname.startsWith(item.path)}
          variant="light"
        />
      ))}
    </ScrollArea>
  );
}