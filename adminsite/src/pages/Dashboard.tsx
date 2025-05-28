import {
  Container,
  Grid,
  Card,
  Text,
  Paper,
  Stack,
  ScrollArea,
  ActionIcon,
  SegmentedControl,
  Group,
  Badge,
  Title // Компонент Title из Mantine
} from '@mantine/core';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Title as ChartTitle // Переименованный Title из Chart.js
} from 'chart.js';
import { IconArrowRight, IconCalendar, IconTrendingUp } from '@tabler/icons-react';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ChartTitle // Используем переименованный ChartTitle
);

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState<string>('week');
  const [popularTimeRange, setPopularTimeRange] = useState<string>('week');

  // Данные для графиков
  const salesData = {
    week: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      datasets: [
        {
          label: 'Продажи (руб)',
          data: [125000, 189000, 86000, 142000, 210000, 175000, 98000],
          borderColor: '#8a6337',
          backgroundColor: '#d9c3a7',
          tension: 0.3
        },
      ],
    },
    month: {
      labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
      datasets: [
        {
          label: 'Продажи (руб)',
          data: [850000, 920000, 780000, 950000],
          borderColor: '#8a6337',
          backgroundColor: '#d9c3a7',
          tension: 0.3
        },
      ],
    },
    year: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [
        {
          label: 'Продажи (руб)',
          data: [3200000, 2900000, 3500000, 3800000, 4200000, 4500000, 4800000, 4700000, 4400000, 5100000, 5500000, 6000000],
          borderColor: '#8a6337',
          backgroundColor: '#d9c3a7',
          tension: 0.3
        },
      ],
    }
  };

  const popularProductsData = {
    week: {
      labels: ['Шуба "Императрица"', 'Дубленка "Люкс"', 'Пальто "Премиум"', 'Жакет "Элит"'],
      datasets: [
        {
          label: 'Количество продаж',
          data: [15, 12, 8, 5],
          backgroundColor: '#8a6337'
        },
      ],
    },
    month: {
      labels: ['Шуба "Императрица"', 'Дубленка "Люкс"', 'Пальто "Премиум"', 'Жакет "Элит"', 'Жилет "Комфорт"'],
      datasets: [
        {
          label: 'Количество продаж',
          data: [68, 54, 42, 35, 28],
          backgroundColor: '#8a6337'
        },
      ],
    },
    year: {
      labels: ['Шуба "Императрица"', 'Дубленка "Люкс"', 'Пальто "Премиум"', 'Жакет "Элит"', 'Жилет "Комфорт"', 'Пончо "Стиль"'],
      datasets: [
        {
          label: 'Количество продаж',
          data: [420, 380, 310, 280, 240, 190],
          backgroundColor: '#8a6337'
        },
      ],
    }
  };

  const metricsData = {
    week: {
      labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
      datasets: [
        {
          label: 'Средний чек (руб)',
          data: [18500, 19200, 17800, 20100],
          borderColor: '#50381b',
          backgroundColor: '#f5f1e6',
          tension: 0.3,
          yAxisID: 'y'
        },
        {
          label: 'Конверсия (%)',
          data: [3.2, 3.5, 2.9, 3.8],
          borderColor: '#8a6337',
          backgroundColor: '#d9c3a7',
          tension: 0.3,
          yAxisID: 'y1'
        }
      ]
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Заказ #123 на сумму 88,800 руб.',
      time: '2 часа назад',
      action: 'Перейти к заказу'
    },
    {
      id: 2,
      title: 'Новое сообщение от Ивана Иванова',
      time: '3 часа назад',
      action: 'Ответить'
    },
    {
      id: 3,
      title: 'Шуба "Москва" заканчивается на складе',
      time: '5 часов назад',
      action: 'Пополнить склад'
    }
  ];

  return (
    <Container size="xl" p="md">
      <Grid gutter="xl">
        {/* Статистика */}
        <Grid.Col span={12}>
          <Grid>
            <Grid.Col span={3}>
              <Card withBorder>
                <Group gap="xs" mb="xs">
                  <IconTrendingUp size={20} color="#8a6337" />
                  <Text size="sm">Продажи за день</Text>
                </Group>
                <Title order={3}>89,400 руб.</Title>
              </Card>
            </Grid.Col>
            <Grid.Col span={3}>
              <Card withBorder>
                <Group gap="xs" mb="xs">
                  <IconTrendingUp size={20} color="#8a6337" />
                  <Text size="sm">Продажи за неделю</Text>
                </Group>
                <Title order={3}>524,600 руб.</Title>
              </Card>
            </Grid.Col>
            <Grid.Col span={3}>
              <Card withBorder>
                <Group gap="xs" mb="xs">
                  <IconTrendingUp size={20} color="#8a6337" />
                  <Text size="sm">Продажи за месяц</Text>
                </Group>
                <Title order={3}>2,890,200 руб.</Title>
              </Card>
            </Grid.Col>
            <Grid.Col span={3}>
              <Card withBorder>
                <Group gap="xs" mb="xs">
                  <IconTrendingUp size={20} color="#8a6337" />
                  <Text size="sm">Средний чек</Text>
                </Group>
                <Title order={3}>18,900 руб.</Title>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* График продаж */}
        <Grid.Col span={8}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Group justify="space-between" mb="md">
              <Text fw={500}>Динамика продаж</Text>
              <SegmentedControl
                value={timeRange}
                onChange={setTimeRange}
                data={[
                  { label: 'Неделя', value: 'week' },
                  { label: 'Месяц', value: 'month' },
                  { label: 'Год', value: 'year' },
                ]}
                size="xs"
              />
            </Group>
            <Line 
              data={salesData[timeRange as keyof typeof salesData]} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return value.toLocaleString() + ' руб';
                      }
                    }
                  }
                }
              }}
            />
          </Paper>
        </Grid.Col>

        {/* Показатели */}
        <Grid.Col span={4}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Group justify="space-between" mb="md">
              <Text fw={500}>Ключевые показатели</Text>
              <Badge color="#8a6337" variant="light">
                <Group gap={4}>
                  <IconCalendar size={14} />
                  <Text size="xs">Неделя</Text>
                </Group>
              </Badge>
            </Group>
            <Line 
              data={metricsData.week} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                      callback: function(value) {
                        return value.toLocaleString() + ' руб';
                      }
                    }
                  },
                  y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                      callback: function(value) {
                        return value + '%';
                      }
                    },
                    grid: {
                      drawOnChartArea: false,
                    },
                  }
                }
              }}
            />
            <Stack gap="xs" mt="md">
              <Group justify="space-between">
                <Text size="sm">Коэффициент конверсии</Text>
                <Badge color="#8a6337">3.4%</Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Возвращаемость клиентов</Text>
                <Badge color="#8a6337">42%</Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Отмененные заказы</Text>
                <Badge color="red">1.8%</Badge>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Популярные товары */}
        <Grid.Col span={8}>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between" mb="md">
              <Text fw={500}>Популярные товары</Text>
              <SegmentedControl
                value={popularTimeRange}
                onChange={setPopularTimeRange}
                data={[
                  { label: 'Неделя', value: 'week' },
                  { label: 'Месяц', value: 'month' },
                  { label: 'Год', value: 'year' },
                ]}
                size="xs"
              />
            </Group>
            <Bar
              data={popularProductsData[popularTimeRange as keyof typeof popularProductsData]}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </Paper>
        </Grid.Col>

        {/* Уведомления */}
        <Grid.Col span={4}>
          <Paper withBorder p="md" radius="md">
            <Text fw={500} mb="md">Последние уведомления</Text>
            <ScrollArea h={300}>
              <Stack gap="xs">
                {notifications.map((item) => (
                  <Card key={item.id} withBorder>
                    <Group justify="space-between">
                      <Stack gap={0}>
                        <Text fw={500}>{item.title}</Text>
                        <Text size="sm" c="dimmed">{item.time}</Text>
                      </Stack>
                      <ActionIcon variant="subtle" color="#8a6337">
                        <IconArrowRight size={18} />
                      </ActionIcon>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </ScrollArea>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}