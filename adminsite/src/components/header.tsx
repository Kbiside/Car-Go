import { useState } from 'react';
import {
  AppShell,
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
  onNavbarOpen: () => void;
}

export function Header({ onNavbarOpen }: HeaderProps) {
  const [opened, setOpened] = useState(false);
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
    <AppShell.Header>
      <Group justify="space-between" h="100%" px="md">
        <Group>
          <Burger
            opened={opened}
            onClick={() => {
              setOpened(!opened);
              onNavbarOpen();
            }}
            size="sm"
            mr="xl"
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
            onClick={handleAddOrder}
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
    </AppShell.Header>
  );
}