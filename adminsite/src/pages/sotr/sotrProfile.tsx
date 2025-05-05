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
  Image,
  Avatar
} from '@mantine/core';
import { IconEdit, IconId, IconDownload, IconBriefcase, IconCertificate } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeProfilePage() {
  const [openedDoc, setOpenedDoc] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Данные сотрудника
  const employeeData = {
      id: '784512', // Добавлено id для маршрутизации
      fullName: 'Иванов Петр Васильевич',
      employeeId: 'ID 784512',
      position: 'Менеджер по продажам',
      phone: '89510765432',
      birthDate: '12.03.1985',
      inn: '123456789012'
  };

  // Данные документов
  const documents = [
      {
          type: 'Паспорт',
          icon: <IconId size="1.2rem" />,
          number: '4512 345678',
          issueDate: '12.05.2010',
          previewUrl: '/api/documents/passport-preview.jpg',
          fileUrl: '/api/documents/passport.pdf'
      },
      {
          type: 'Трудовая книжка',
          icon: <IconBriefcase size="1.2rem" />,
          number: 'ТК 789456',
          issueDate: '15.08.2012',
          previewUrl: '/api/documents/workbook-preview.jpg',
          fileUrl: '/api/documents/workbook.pdf'
      },
      {
          type: 'Диплом о высшем образовании',
          icon: <IconCertificate size="1.2rem" />,
          number: 'ДВО 654321',
          issueDate: '30.06.2007',
          previewUrl: '/api/documents/diploma-preview.jpg',
          fileUrl: '/api/documents/diploma.pdf'
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
      link.download = `${docType}_${employeeData.fullName}.pdf`;
      link.click();
  };

  // Обработчик клика по кнопке редактирования
  const handleEditClick = () => {
      navigate(`/employees/edit`);
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
                  Профиль сотрудника
              </Title>

              <Paper p="md" shadow="sm" radius="md">
                  <Group align="flex-start" wrap="nowrap">
                      <Avatar 
                          src="/api/employees/photo.jpg" 
                          size={120} 
                          radius="md"
                          alt="Фото сотрудника"
                      />
                      <Stack gap="xs">
                          <Text size="xl" fw={500}>
                              {employeeData.fullName}
                          </Text>
                          <Text size="md" c="dimmed">
                              {employeeData.employeeId}
                          </Text>
                          <Text size="md">
                              Должность: {employeeData.position}
                          </Text>
                          <Text size="md">
                              Телефон: {employeeData.phone}
                          </Text>
                          <Text size="md">
                              Дата рождения: {employeeData.birthDate}
                          </Text>
                          <Text size="md">
                              ИНН: {employeeData.inn}
                          </Text>
                      </Stack>
                  </Group>
              </Paper>

              <Box>
                  <Title order={2} mb="sm">
                      Документы сотрудника
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

              <Group justify="flex-end">
                  <Button 
                      leftSection={<IconEdit size="1rem" />} 
                      variant="outline"
                      onClick={handleEditClick}
                  >
                      Редактировать профиль
                  </Button>
              </Group>
          </Stack>
      </Container>
  );
}