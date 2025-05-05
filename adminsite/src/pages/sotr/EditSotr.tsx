import { 
    Title, 
    TextInput, 
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
    Avatar,
    FileInput,
    SimpleGrid,
    Textarea,
    Table
  } from '@mantine/core';
  import { IconEdit, IconId, IconDownload, IconBriefcase, IconCertificate, IconUpload, IconX } from '@tabler/icons-react';
  import { useState } from 'react';
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
  
  interface EmployeeData {
    id: string;
    fullName: string;
    employeeId: string;
    position: string;
    phone: string;
    birthDate: string;
    inn: string;
    photoFile: File | null;
    comment?: string;
  }
  
  export default function EditEmployeePage() {
    const [openedDoc, setOpenedDoc] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const [employeeData, setEmployeeData] = useState<EmployeeData>({
      id: '784512',
      fullName: 'Иванов Петр Васильевич',
      employeeId: 'ID 784512',
      position: 'Менеджер по продажам',
      phone: '89510765432',
      birthDate: '12.03.1985',
      inn: '123456789012',
      photoFile: null,
      comment: 'Пример комментария о сотруднике'
    });
  
    const [documents, setDocuments] = useState<Document[]>([
      {
        type: 'Паспорт',
        icon: <IconId size="1.2rem" />,
        number: '4512 345678',
        issueDate: '12.05.2010',
        previewUrl: '/api/documents/passport-preview.jpg',
        fileUrl: '/api/documents/passport.pdf',
        file: null
      },
      {
        type: 'Трудовая книжка',
        icon: <IconBriefcase size="1.2rem" />,
        number: 'ТК 789456',
        issueDate: '15.08.2012',
        previewUrl: '/api/documents/workbook-preview.jpg',
        fileUrl: '/api/documents/workbook.pdf',
        file: null
      },
      {
        type: 'Диплом о высшем образовании',
        icon: <IconCertificate size="1.2rem" />,
        number: 'ДВО 654321',
        issueDate: '30.06.2007',
        previewUrl: '/api/documents/diploma-preview.jpg',
        fileUrl: '/api/documents/diploma.pdf',
        file: null
      },
    ]);
  
    const handleChange = (field: keyof EmployeeData, value: string) => {
      setEmployeeData(prev => ({ ...prev, [field]: value }));
    };
  
    const handlePhotoChange = (file: File | null) => {
      setEmployeeData(prev => ({
        ...prev,
        photoFile: file
      }));
    };
  
    const handleDocChange = (index: number, file: File | null) => {
      const updatedDocs = [...documents];
      updatedDocs[index] = { ...updatedDocs[index], file };
      setDocuments(updatedDocs);
    };
  
    const handleDocNumberChange = (index: number, value: string) => {
      const updatedDocs = [...documents];
      updatedDocs[index] = { ...updatedDocs[index], number: value };
      setDocuments(updatedDocs);
    };
  
    const handleDocDateChange = (index: number, value: string) => {
      const updatedDocs = [...documents];
      updatedDocs[index] = { ...updatedDocs[index], issueDate: value };
      setDocuments(updatedDocs);
    };
  
    const handleDownloadDoc = (docType: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const doc = documents.find(d => d.type === docType);
      if (doc) {
        const link = document.createElement('a');
        link.href = doc.fileUrl;
        link.download = `${doc.type}_${employeeData.fullName}.pdf`;
        link.click();
      }
    };
  
    const handleSave = () => {
      console.log('Сохранение данных сотрудника:', { employeeData, documents });
      navigate(-1);
    };
  
    const handleCancel = () => {
      navigate(-1);
    };
  
    const handleRemovePhoto = () => {
      handlePhotoChange(null);
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
            Редактирование профиля сотрудника
          </Title>
  
          <Paper p="md" shadow="sm" radius="md">
            <Group align="flex-start" wrap="nowrap" gap="xl">
              <Stack align="center">
                <Avatar 
                  src={employeeData.photoFile ? URL.createObjectURL(employeeData.photoFile) : '/api/employees/photo.jpg'}
                  size={160}
                  radius="md"
                  alt="Фото сотрудника"
                />
                <Group>
                  <FileInput
                    placeholder="Изменить фото"
                    accept="image/*"
                    value={employeeData.photoFile}
                    onChange={handlePhotoChange}
                    leftSection={<IconUpload size="1rem" />}
                    variant="filled"
                    size="xs"
                  />
                  {employeeData.photoFile && (
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={handleRemovePhoto}
                      title="Удалить фото"
                    >
                      <IconX size="1rem" />
                    </ActionIcon>
                  )}
                </Group>
              </Stack>
  
              <SimpleGrid cols={2} style={{ flexGrow: 1 }}>
                <TextInput
                  label="ФИО"
                  value={employeeData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
                <TextInput
                  label="ID сотрудника"
                  value={employeeData.employeeId}
                  readOnly
                  disabled
                />
                <TextInput
                  label="Должность"
                  value={employeeData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                />
                <TextInput
                  label="Телефон"
                  value={employeeData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                <TextInput
                  label="Дата рождения"
                  value={employeeData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                />
                <TextInput
                  label="ИНН"
                  value={employeeData.inn}
                  onChange={(e) => handleChange('inn', e.target.value)}
                />
              </SimpleGrid>
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
                        onChange={(e) => handleDocNumberChange(index, e.target.value)}
                        variant="unstyled"
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        value={doc.issueDate}
                        onChange={(e) => handleDocDateChange(index, e.target.value)}
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
  
          <Paper p="md" shadow="sm" radius="md">
            <Textarea
              label="Комментарии о сотруднике"
              value={employeeData.comment || ''}
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