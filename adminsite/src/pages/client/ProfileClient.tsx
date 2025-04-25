import { 
  Title, 
  Text, 
  Table, 
  Button, 
  Group, 
  Stack, 
  Container,
  Paper,
  Box,
  Anchor,
  ActionIcon,
  Modal,
  Image
} from '@mantine/core';
import { IconEdit, IconLicense, IconId, IconDownload } from '@tabler/icons-react';
import { useState } from 'react';

export default function ClientProfilePage() {
  const [openedDoc, setOpenedDoc] = useState<string | null>(null);
  
  // Данные клиента (включая комментарий)
  const clientData = {
    fullName: 'Смирнова Анна Сергеевна',
    clientId: 'ID 937601',
    phone: '89510833438',
    birthDate: '16.07.1989',
    comment: 'Клиент предпочитает электромобили. Важный клиент с 2015 года.'
  };

  // Данные документов
  const documents = [
    {
      type: 'Паспорт',
      icon: <IconId size="1.2rem" />,
      number: '1234 567890',
      issueDate: '23.08.2011',
      previewUrl: '/api/documents/passport-preview.jpg',
      fileUrl: '/api/documents/passport.pdf'
    },
    {
      type: 'Водительское удостоверение',
      icon: <IconLicense size="1.2rem" />,
      number: 'ВУ 123456',
      issueDate: '15.05.2015',
      previewUrl: '/api/documents/license-preview.jpg',
      fileUrl: '/api/documents/license.pdf'
    },
  ];

  const handleViewDoc = (docType: string) => {
    setOpenedDoc(docType);
  };

  const handleDownloadDoc = (docType: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Скачивание ${docType}`);
    const link = document.createElement('a');
    link.href = `#${docType.toLowerCase().replace(' ', '-')}`;
    link.download = `${docType}_${clientData.fullName}.pdf`;
    link.click();
  };

  return (
    <Container size="lg" py="md">
      <Modal
        opened={openedDoc !== null}
        onClose={() => setOpenedDoc(null)}
        title={`Просмотр документа: ${openedDoc}`}
        size="xl"
      >
        {openedDoc && (
          <Image
            src={documents.find(d => d.type === openedDoc)?.previewUrl}
            alt={`Превью ${openedDoc}`}
            fit="contain"
            style={{ maxHeight: '70vh' }}
          />
        )}
      </Modal>

      <Stack gap="xl">
        <Title order={1} ta="center">
          Профиль клиента
        </Title>

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

        <Box>
          <Title order={2} mb="sm">
            Документы клиента
          </Title>
          
          <Table
            striped
            highlightOnHover
            withColumnBorders
            horizontalSpacing="md"
            verticalSpacing="sm"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '40px' }}></Table.Th>
                <Table.Th>Тип документа</Table.Th>
                <Table.Th>Серия и номер</Table.Th>
                <Table.Th>Дата выдачи</Table.Th>
                <Table.Th style={{ width: '60px' }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {documents.map((doc, index) => (
                <Table.Tr key={index} style={{ cursor: 'pointer' }} onClick={() => handleViewDoc(doc.type)}>
                  <Table.Td>{doc.icon}</Table.Td>
                  <Table.Td>
                    <Anchor component="span" c="blue" underline="hover">
                      {doc.type}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>{doc.number}</Table.Td>
                  <Table.Td>{doc.issueDate}</Table.Td>
                  <Table.Td>
                    <ActionIcon 
                      variant="subtle" 
                      color="green"
                      onClick={(e) => handleDownloadDoc(doc.type, e)}
                      title="Скачать документ"
                    >
                      <IconDownload size="1rem" />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {/* Блок комментариев (только для чтения) */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="sm">
            Комментарии о клиенте
          </Title>
          <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
            {clientData.comment}
          </Text>
        </Paper>

        <Group justify="flex-end">
          <Button leftSection={<IconEdit size="1rem" />} variant="outline">
            Редактировать профиль
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}