import {
  Group,
  ActionIcon,
  Burger,
  Title,
  Button,
  Avatar,
  Menu,
  useMantineTheme,
  Modal,
  Text,
} from '@mantine/core';
import { IconBell, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
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
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    close();
    notifications.show({
      title: 'Выход из системы',
      message: 'Вы успешно вышли из системы',
      color: 'green',
    });
    // Здесь должна быть логика выхода
    navigate('/login');
  };

  return (
    <>
      <Group justify="space-between" h="100%" px="md">
        <Group>
          {/* Mobile burger button */}
          <Burger
            opened={false}
            onClick={onMobileNavbarToggle}
            size="sm"
            mr="xl"
            hiddenFrom="sm"
            aria-label="Toggle mobile navigation"
          />

          {/* Desktop burger button */}
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
            onClick={() => navigate('/requests/add')}
          >
            Добавить заявку
          </Button>

          <ActionIcon 
            variant="default" 
            size="lg"
            onClick={() => navigate('/feedback')}
          >
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
              <Menu.Item onClick={() => navigate('/employees/1')}>
                Профиль
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" onClick={open}>
                Выйти
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>

      {/* Logout confirmation modal */}
      <Modal opened={opened} onClose={close} title="Подтверждение выхода" centered>
        <Text mb="md">Вы уверены, что хотите выйти из системы?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Отмена
          </Button>
          <Button color="red" onClick={handleLogout}>
            Выйти
          </Button>
        </Group>
      </Modal>
    </>
  );
}