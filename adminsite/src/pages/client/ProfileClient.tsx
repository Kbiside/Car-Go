import { 
  Title, 
  Text, 
  Table, 
  Button, 
  Group, 
  Stack, 
  Container,
  Paper
} from '@mantine/core';
import { IconEdit, IconPlus } from '@tabler/icons-react';

export default function ClientProfilePage() {
  // Данные клиента (в реальном приложении будут приходить из API)
  const clientData = {
    fullName: 'Смирнова Анна Сергеевна',
    clientId: 'ID 937601',
    phone: '89510833438',
    birthDate: '16.07.1989',
  };

  // Данные документов
  const documents = [
    {
      type: 'Паспорт',
      number: '1234 567890',
      issueDate: '23.08.2011',
      comment: '-'
    },
    {
      type: 'Водительское удостоверение',
      number: 'ВУ 123456',
      issueDate: '15.05.2015',
      comment: 'Предпочитает электромобили'
    },
  ];

  return (
    <Container size="lg" py="md">
      <Stack gap="xl">
        {/* Заголовок и кнопка добавления */}
        <Group justify="space-between" align="flex-start">
          <Title order={1} ta="center" style={{ flex: 1 }}>
            Профиль клиента
          </Title>
          <Button 
            leftSection={<IconPlus size="1rem" />}
            variant="filled"
          >
            Добавить заявку
          </Button>
        </Group>

        {/* Информация о клиенте */}
        <Paper p="md" shadow="sm" radius="md">
          <Stack gap="xs" align="center">
            <Text size="xl" fw={500}>
              {clientData.fullName}
            </Text>
            <Text size="md" c="dimmed">
              {clientData.clientId}
            </Text>
            <Text size="md">
              Телефон: {clientData.phone}
            </Text>
            <Text size="md">
              Дата рождения: {clientData.birthDate}
            </Text>
          </Stack>
        </Paper>

        {/* Таблица документов */}
        <div>
          <Title order={2} mb="sm">
            Документы клиента
          </Title>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Тип документа</th>
                <th>Серия и номер</th>
                <th>Дата выдачи</th>
                <th>Комментарии</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.type}</td>
                  <td>{doc.number}</td>
                  <td>{doc.issueDate}</td>
                  <td>{doc.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Кнопка редактирования */}
        <Group justify="flex-end">
          <Button 
            leftSection={<IconEdit size="1rem" />}
            variant="outline"
          >
            Редактировать
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}