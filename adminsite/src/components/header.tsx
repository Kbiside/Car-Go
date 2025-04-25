import {
  Group,
  ActionIcon,
  Burger,
  Title,
  Button,
  Avatar,
  Menu,
  useMantineTheme,
} from '@mantine/core';
import { IconBell, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

interface HeaderProps {
  onMobileNavbarToggle: () => void;
  onDesktopNavbarToggle: () => void;
  desktopOpened: boolean;
}

export function Header({ 
  onMobileNavbarToggle, 
  onDesktopNavbarToggle,
  desktopOpened 
}: HeaderProps) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleAddOrder = () => {
    notifications.show({
      title: 'Новая заявка',
      message: 'Форма добавления заявки будет здесь',
      color: 'blue',
    });
  };

  return (
    <Group justify="space-between" h="100%" px="md">
      <Group>
        {/* Mobile burger button (visible only on mobile) */}
        <Burger
          opened={false}
          onClick={onMobileNavbarToggle}
          size="sm"
          mr="xl"
          hiddenFrom="sm"
          aria-label="Toggle mobile navigation"
        />

        {/* Desktop burger button (visible only on desktop) */}
        <Burger
          opened={desktopOpened}
          onClick={onDesktopNavbarToggle}
          size="sm"
          mr="xl"
          visibleFrom="sm"
          aria-label="Toggle desktop navigation"
        />

        <Title
          order={3}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          Car&Go
        </Title>
      </Group>

      <Group>
        <Button
          leftSection={<IconPlus size="1rem" />}
          variant="light"
          onClick={() => navigate('/create-request')}
        >
          Добавить заявку
        </Button>

        <ActionIcon variant="default" size="lg">
          <IconBell size="1.1rem" />
        </ActionIcon>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              radius="xl"
              style={{ cursor: 'pointer' }}
              color={theme.primaryColor}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Личный кабинет</Menu.Label>
            <Menu.Item>Профиль</Menu.Item>
            <Menu.Item>Настройки</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red">Выйти</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}