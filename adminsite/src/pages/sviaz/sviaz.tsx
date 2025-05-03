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
  MantineTheme,
} from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

export default function FeedbackPage() {
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

  return (
    <Container>
      <Title order={2} mb="md">Обратная связь</Title>
      
      <Pagination 
        total={10} 
        position="center" 
        my="md"
        siblings={1}
        styles={(theme: MantineTheme) => ({
          item: {
            '&[data-active]': {
              backgroundImage: theme.fn.gradient({ from: 'indigo', to: 'cyan' }),
            },
          },
        })}
      />

      <Stack spacing="md">
        {feedbackItems.map((item, index) => (
          <Card key={index} shadow="sm" p="lg" withBorder>
            <Stack spacing="sm">
              <Group position="apart">
                <Text size="sm" color="dimmed">{item.id}</Text>
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
              
              <Group position="right" mt="md">
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
        position="center" 
        mt="md"
        siblings={1}
        styles={(theme: MantineTheme) => ({
          item: {
            '&[data-active]': {
              backgroundImage: theme.fn.gradient({ from: 'indigo', to: 'cyan' }),
            },
          },
        })}
      />
    </Container>
  );
}