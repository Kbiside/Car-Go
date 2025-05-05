import { 
    Container, 
    Title, 
    TextInput, 
    PasswordInput, 
    Button, 
    Stack, 
    Group, 
    Paper, 
    Box,
    Text,
    useMantineTheme
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  import { notifications } from '@mantine/notifications';
  import { useNavigate } from 'react-router-dom';
  import { IconLock, IconUser, IconLogin } from '@tabler/icons-react';
  
  export default function LoginPage() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
  
    const form = useForm({
      initialValues: {
        username: '',
        password: '',
      },
      validate: {
        username: (value: string) => (value.length < 3 ? 'Логин слишком короткий' : null),
        password: (value: string) => (value.length < 6 ? 'Пароль должен содержать минимум 6 символов' : null),
      },
    });
  
    const handleSubmit = (values: { username: string; password: string }) => {
      // Здесь должна быть реальная логика авторизации
      // Временная заглушка для демонстрации
      if (values.username === 'admin' && values.password === 'password') {
        localStorage.setItem('authToken', 'demo-token');
        notifications.show({
          title: 'Вход выполнен',
          message: 'Вы успешно авторизованы в системе',
          color: 'green',
        });
        navigate('/dashboard');
      } else {
        notifications.show({
          title: 'Ошибка входа',
          message: 'Неверный логин или пароль',
          color: 'red',
        });
      }
    };
  
    return (
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(45deg, ${theme.colors.indigo[1]}, ${theme.colors.cyan[1]})`,
        }}
      >
        <Container size="xs" w="100%">
          <Paper 
            withBorder 
            shadow="md" 
            p={30} 
            radius="md"
            style={{
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <Stack align="center" mb="xl">
              <IconLock 
                size={50} 
                color={theme.colors.indigo[6]} 
                stroke={1.5}
              />
              <Title order={2} c="indigo">
                Вход в систему
              </Title>
              <Text c="dimmed" size="sm">
                Доступ только для авторизованного персонала
              </Text>
            </Stack>
  
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <TextInput
                  withAsterisk
                  label="Логин"
                  placeholder="Введите ваш логин"
                  leftSection={<IconUser size="1rem" />}
                  {...form.getInputProps('username')}
                />
  
                <PasswordInput
                  withAsterisk
                  label="Пароль"
                  placeholder="Введите ваш пароль"
                  leftSection={<IconLock size="1rem" />}
                  {...form.getInputProps('password')}
                />
  
                <Group justify="flex-end" mt="md">
                  <Button 
                    type="submit"
                    leftSection={<IconLogin size="1rem" />}
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    fullWidth
                    size="md"
                  >
                    Войти
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Box>
    );
  }