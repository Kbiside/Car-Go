import { 
    Title, 
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
    TextInput,
    Textarea,
    FileInput,
    SimpleGrid,
    Table
  } from '@mantine/core';
  import { IconEdit, IconLicense, IconId, IconDownload, IconUpload } from '@tabler/icons-react';
  import { useState, ChangeEvent } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  interface Document {
    type: string;
    icon: React.ReactNode;
    number: string;
    issueDate: string;
    previewUrl: string;
    fileUrl: string;
    file?: File | null;
  }
  
  export default function EditClientPage() {
    const [openedDoc, setOpenedDoc] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const [clientData, setClientData] = useState({
      fullName: 'Смирнова Анна Сергеевна',
      clientId: 'ID 937601',
      phone: '89510833438',
      birthDate: '16.07.1989',
      comment: 'Клиент предпочитает электромобили. Важный клиент с 2015 года.'
    });
  
    const [documents, setDocuments] = useState<Document[]>([
      {
        type: 'Паспорт',
        icon: <IconId size="1.2rem" />,
        number: '1234 567890',
        issueDate: '23.08.2011',
        previewUrl: '/api/documents/passport-preview.jpg',
        fileUrl: '/api/documents/passport.pdf',
        file: null
      },
      {
        type: 'Водительское удостоверение',
        icon: <IconLicense size="1.2rem" />,
        number: 'ВУ 123456',
        issueDate: '15.05.2015',
        previewUrl: '/api/documents/license-preview.jpg',
        fileUrl: '/api/documents/license.pdf',
        file: null
      },
    ]);
  
    const handleChange = (field: keyof typeof clientData, value: string) => {
      setClientData(prev => ({ ...prev, [field]: value }));
    };
  
    const handleDocChange = (index: number, file: File | null) => {
      const updatedDocs = [...documents];
      updatedDocs[index] = { ...updatedDocs[index], file };
      setDocuments(updatedDocs);
    };
  
    const handleDownloadDoc = (docType: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const doc = documents.find(d => d.type === docType);
      if (doc) {
        const link = document.createElement('a');
        link.href = doc.fileUrl;
        link.download = `${doc.type}_${clientData.fullName}.pdf`;
        link.click();
      }
    };
  
    const handleSave = () => {
      console.log('Сохранение данных клиента:', { clientData, documents });
      navigate(-1);
    };
  
    const handleCancel = () => {
      navigate(-1);
    };
  
    return (
      <Container size="lg" py="md">
        <Modal
          opened={openedDoc !== null}
          onClose={() => setOpenedDoc(null)}
          title={openedDoc ? `Просмотр документа: ${openedDoc}` : ''}
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
            Редактирование профиля клиента
          </Title>
  
          <Paper p="md" shadow="sm" radius="md">
            <SimpleGrid cols={2}>
              <TextInput
                label="ФИО"
                value={clientData.fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('fullName', e.target.value)}
              />
              <TextInput
                label="ID клиента"
                value={clientData.clientId}
                readOnly
                disabled
              />
              <TextInput
                label="Телефон"
                value={clientData.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
              />
              <TextInput
                label="Дата рождения"
                value={clientData.birthDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('birthDate', e.target.value)}
              />
            </SimpleGrid>
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
                  <Table.Th style={{ width: '200px' }}>Обновить</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {documents.map((doc, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{doc.icon}</Table.Td>
                    <Table.Td>
                      <Anchor component="span" c="blue" underline="hover">
                        {doc.type}
                      </Anchor>
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        value={doc.number}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const updatedDocs = [...documents];
                          updatedDocs[index] = { ...updatedDocs[index], number: e.target.value };
                          setDocuments(updatedDocs);
                        }}
                        variant="unstyled"
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        value={doc.issueDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const updatedDocs = [...documents];
                          updatedDocs[index] = { ...updatedDocs[index], issueDate: e.target.value };
                          setDocuments(updatedDocs);
                        }}
                        variant="unstyled"
                      />
                    </Table.Td>
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
                    <Table.Td>
                      <FileInput
                        placeholder="Обновить"
                        accept=".pdf,.jpg,.png"
                        value={doc.file}
                        onChange={(file) => handleDocChange(index, file)}
                        leftSection={<IconUpload size="1rem" />}
                        variant="filled"
                        size="xs"
                      />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
  
          {/* Блок комментариев с использованием Textarea */}
          <Paper p="md" shadow="sm" radius="md">
            <Textarea
              label="Комментарии о клиенте"
              value={clientData.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              minRows={3}
              autosize
            />
          </Paper>
  
          <Group justify="flex-end">
            <Button variant="outline" onClick={handleCancel}>
              Отменить
            </Button>
            <Button leftSection={<IconEdit size="1rem" />} onClick={handleSave}>
              Сохранить изменения
            </Button>
          </Group>
        </Stack>
      </Container>
    );
  }