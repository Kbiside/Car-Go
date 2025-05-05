import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Textarea,
  Pagination,
  Divider,
  useMantineTheme,
} from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import type { CSSProperties } from 'react';

export default function FeedbackPage() {
  const theme = useMantineTheme();
  
  // Данные обращений
  const feedbackItems = [
    {
      id: 'ID 564756',
      userName: 'Антонова Мария Евгеньевна',
      subject: 'Проблема с оплатой',
      message: 'Не могу оплатить аренду, выдает ошибку при вводе карты'
    },
    {
      id: 'ID 342356',
      userName: 'Петров Иван Сергеевич',
      subject: 'Вопрос по документам',
      message: 'Какие документы нужны для аренды автомобиля?'
    },
    {
      id: 'ID 123456',
      userName: 'Сидорова Ольга Викторовна',
      subject: 'Отзыв о сервисе',
      message: 'Отличный сервис, все понравилось! Хотелось бы больше автомобилей премиум класса'
    }
  ];

  // Стили для Pagination
  const paginationStyles = {
    root: {
      justifyContent: 'center'
    },
    control: {
      '&[data-active]': {
        background: `linear-gradient(to right, ${theme.colors.indigo[6]}, ${theme.colors.cyan[6]})`,
      } as CSSProperties,
    }
  };

  return (
    <Container>
      <Title order={2} mb="md">Обратная связь</Title>
      
      <Pagination 
        total={10} 
        mt="md"
        mb="md"
        siblings={1}
        styles={paginationStyles}
      />

      <Stack gap="md">
        {feedbackItems.map((item, index) => (
          <Card key={index} shadow="sm" p="lg" withBorder>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">{item.id}</Text>
                <Text fw={500}>{item.userName}</Text>
              </Group>
              
              <Text fw={600} size="lg">{item.subject}</Text>
              <Text>{item.message}</Text>
              
              <Divider my="sm" />
              
              <Textarea
                placeholder="Введите текст ответа"
                label="Ваш ответ"
                minRows={3}
              />
              
              <Group justify="flex-end" mt="md">
                <Button 
                  leftSection={<IconSend size="1rem" />}
                  variant="filled"
                  color="indigo"
                >
                  Отправить
                </Button>
              </Group>
            </Stack>
          </Card>
        ))}
      </Stack>

      <Pagination 
        total={10} 
        mt="md"
        siblings={1}
        styles={paginationStyles}
      />
    </Container>
  );
}