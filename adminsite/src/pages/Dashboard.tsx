import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Stack,
  Divider,
  Group,
  Button,
  Modal,
  useMantineTheme,
  TextInput,
  Textarea,
  useMantineColorScheme,
} from '@mantine/core';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

export function DashboardPage() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  // Цвет карточек - такой же как у кнопки "Добавить заявку" (light-версия основного цвета)
  const cardColor = theme.colors[theme.primaryColor][1] + '80'; // Добавляем прозрачность 80

  // Пример данных для графиков
  const chartDataSettings = {
    borderColor: 'rgb(0, 82, 147)', // Темно-синий цвет
    backgroundColor: 'rgba(0, 82, 147, 0.2)',
    tension: 0.3,
    borderWidth: 2,
  };

  const dailyOrdersData = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Заказов в день',
        data: [12, 19, 3, 5, 2, 3, 7],
        ...chartDataSettings
      },
    ],
  };

  const yearlyOrdersData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    datasets: [
      {
        label: 'Заказов в месяц',
        data: [30, 20, 50, 40, 60, 70, 80, 90, 100, 110, 120, 130],
        ...chartDataSettings
      },
    ],
  };
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      author: "Администратор",
      text: "Завтра с 10:00 до 12:00 будет проводиться техническое обслуживание системы. Возможны кратковременные перебои в работе."
    },
    {
      author: "Менеджер парка",
      text: "Обратите внимание, автомобили с номерами А123БВ, Х456УК отправлены на ТО. Будут доступны через 2 дня."
    },
    {
      author: "Служба поддержки",
      text: "Напоминаем о необходимости проверять уровень заряда электромобилей перед выдачей клиентам."
    }
  ]);

  const form = useForm({
    initialValues: {
      title: '',
      message: ''
    },
    validate: {
      title: (value) => value.trim().length < 3 ? 'Заголовок слишком короткий (мин. 3 символа)' : null,
      message: (value) => value.trim().length < 10 ? 'Сообщение слишком короткое (мин. 10 символов)' : null
    }
  });

  const handleSubmit = async (values: { title: string; message: string }) => {
    setLoading(true);
    
    // Имитация загрузки
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newAnnouncement = {
      author: "Вы", // В реальном приложении подставляем текущего пользователя
      text: `${values.title}\n${values.message}`
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    
    notifications.show({
      title: 'Успешно!',
      message: 'Объявление добавлено',
      color: 'green',
      icon: <IconPlus size="1rem" />,
      withBorder: true,
      style: { 
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      }
    });
    
    form.reset();
    setLoading(false);
    close();
  };

  return (
    <Container>
      <Title order={2} mb="xl">Главная</Title>
      
      {/* Показатели в карточках */}
      <Grid gutter="xl" mb="xl">
        <Grid.Col span={3}>
          <Card 
            shadow="sm" 
            radius="md" 
            padding="lg" 
            style={{ backgroundColor: cardColor }}
          >
            <Text size="sm" c="dimmed">Количество автомобилей</Text>
            <Title order={2} mt="sm">50</Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card 
            shadow="sm" 
            radius="md" 
            padding="lg" 
            style={{ backgroundColor: cardColor }}
          >
            <Text size="sm" c="dimmed">Свободно</Text>
            <Title order={2} mt="sm">26</Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card 
            shadow="sm" 
            radius="md" 
            padding="lg" 
            style={{ backgroundColor: cardColor }}
          >
            <Text size="sm" c="dimmed">Забронировано</Text>
            <Title order={2} mt="sm">26</Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card 
            shadow="sm" 
            radius="md" 
            padding="lg" 
            style={{ backgroundColor: cardColor }}
          >
            <Text size="sm" c="dimmed">В ремонте</Text>
            <Title order={2} mt="sm">4</Title>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Графики */}
      <Grid gutter="xl" mb="xl">
        <Grid.Col span={6}>
          <Card shadow="sm" radius="md" p="sm">
            <Title order={5} mb="xs">Заказы по дням</Title>
            <div style={{ height: '200px' }}>
              <Line 
                data={dailyOrdersData} 
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" radius="md" p="sm">
            <Title order={5} mb="xs">Заказы по месяцам</Title>
            <div style={{ height: '200px' }}>
              <Line 
                data={yearlyOrdersData} 
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </Card>
        </Grid.Col>
      </Grid>

      <Divider my="xl" />

      {/* Заголовок и кнопка добавления */}
      <Group justify="space-between" mb="md">
        <Title order={3}>Объявления</Title>
        <Button 
          variant="light" 
          onClick={open}
          leftSection={<IconPlus size="1rem" />}
        >
          Добавить объявление
        </Button>
      </Group>

      {/* Объявления */}
      <Stack gap="sm" mb="xl">
        {announcements.map((announcement, index) => (
          <Card key={index} shadow="sm" radius="md" padding="lg">
            <Text fw={500}>{announcement.author}</Text>
            <Text mt="sm" size="sm" style={{ whiteSpace: 'pre-line' }}>
              {announcement.text}
            </Text>
          </Card>
        ))}
      </Stack>

      {/* Модальное окно добавления */}
      <Modal 
        opened={opened} 
        onClose={() => {
          form.reset();
          close();
        }}
        title="Новое объявление"
        size="lg"
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Заголовок"
            placeholder="Краткий заголовок объявления"
            withAsterisk
            {...form.getInputProps('title')}
            mb="md"
          />
          
          <Textarea
            label="Текст объявления"
            placeholder="Подробное описание..."
            withAsterisk
            autosize
            minRows={4}
            maxRows={8}
            {...form.getInputProps('message')}
            mb="xl"
          />
          
          <Group justify="flex-end">
            <Button 
              variant="default" 
              onClick={() => {
                form.reset();
                close();
              }}
              leftSection={<IconX size="1rem" />}
            >
              Отмена
            </Button>
            <Button 
              type="submit" 
              loading={loading}
              leftSection={!loading && <IconPlus size="1rem" />}
            >
              {loading ? 'Публикация...' : 'Опубликовать'}
            </Button>
          </Group>
        </form>
      </Modal>
    </Container>
  );
}