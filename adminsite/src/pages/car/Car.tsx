import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Container,
  Paper,
  Box,
  ActionIcon,
  Modal,
  Avatar,
  Table,
  Anchor,
  Badge
} from '@mantine/core';
import { IconDownload, IconCar, IconEdit, IconLicense, IconCertificate } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarProfilePage = () => {
  const [openedPhoto, setOpenedPhoto] = useState(false);
  const navigate = useNavigate();
  
  // Данные автомобиля
  const carData = {
    id: 'CAR-2023-056',
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    plateNumber: 'А123БВ777',
    vin: 'JT2BF22K2W0158759',
    color: 'Серебристый',
    status: 'Доступен',
    comment: 'Пробег 15 000 км. Состояние отличное.',
    photoUrl: 'https://example.com/car-photo.jpg',
    documents: [
      { 
        type: 'Паспорт ТС', 
        icon: <IconCar size="1.2rem" />,
        number: '78ОК123456', 
        date: '15.03.2022',
        previewUrl: '/api/documents/vehicle-passport-preview.jpg',
        fileUrl: '/api/documents/vehicle-passport.pdf'
      },
      { 
        type: 'Страховой полис', 
        icon: <IconLicense size="1.2rem" />,
        number: 'СБ123456789', 
        date: '20.01.2023',
        previewUrl: '/api/documents/insurance-preview.jpg',
        fileUrl: '/api/documents/insurance.pdf'
      },
      { 
        type: 'Свидетельство о регистрации', 
        icon: <IconCertificate size="1.2rem" />,
        number: '77AA123456', 
        date: '10.03.2022',
        previewUrl: '/api/documents/registration-preview.jpg',
        fileUrl: '/api/documents/registration.pdf'
      }
    ]
  };

  const handleViewDoc = (docType: string) => {
    console.log(`Просмотр ${docType}`);
    // В реальном приложении здесь будет открытие модального окна с документом
  };

  const handleDownloadDoc = (docType: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Скачивание ${docType}`);
    // В реальном приложении здесь будет запрос к API для скачивания файла
  };

  const handleEditClick = () => {
    // Переход на страницу редактирования с передачей ID автомобиля
    navigate(`/cars/edit`);
  };

  return (
    <Container size="lg" py="md">
      {/* Модальное окно для просмотра фото */}
      <Modal
        opened={openedPhoto}
        onClose={() => setOpenedPhoto(false)}
        title={`Фото автомобиля ${carData.brand} ${carData.model}`}
        size="xl"
      >
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src={carData.photoUrl} 
            alt={`Фото ${carData.brand} ${carData.model}`} 
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
          />
        </Box>
      </Modal>

      <Stack gap="xl">
        <Title order={1} ta="center">
          Профиль автомобиля
        </Title>

        {/* Основная информация */}
        <Paper p="md" shadow="sm" radius="md">
          <Group align="flex-start" wrap="nowrap">
            <Avatar 
              src={carData.photoUrl}
              size={120}
              radius="md"
              alt={`Фото ${carData.brand} ${carData.model}`}
              onClick={() => setOpenedPhoto(true)}
              style={{ cursor: 'pointer' }}
            />
            <Stack gap="xs">
              <Text size="xl" fw={500}>
                {carData.brand} {carData.model} {carData.year}
              </Text>
              <Text size="md" c="dimmed">
                ID: {carData.id}
              </Text>
              <Text size="md">
                Гос. номер: {carData.plateNumber}
              </Text>
              <Text size="md">
                VIN: {carData.vin}
              </Text>
              <Text size="md">
                Цвет: {carData.color}
              </Text>
              <Text size="md">
                Статус: <Badge color="green" variant="light">{carData.status}</Badge>
              </Text>
            </Stack>
          </Group>
        </Paper>

        {/* Документы */}
        <Box>
          <Title order={2} mb="sm">
            Документы автомобиля
          </Title>
          
          <Table striped
            highlightOnHover
            withColumnBorders
            horizontalSpacing="md"
            verticalSpacing="sm"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '40px' }}></Table.Th>
                <Table.Th>Тип документа</Table.Th>
                <Table.Th>Номер</Table.Th>
                <Table.Th>Дата выдачи</Table.Th>
                <Table.Th style={{ width: '60px' }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {carData.documents.map((doc, index) => (
                <Table.Tr key={index} style={{ cursor: 'pointer' }} onClick={() => handleViewDoc(doc.type)}>
                  <Table.Td>{doc.icon}</Table.Td>
                  <Table.Td>
                    <Anchor component="span" c="blue" underline="hover">
                      {doc.type}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>{doc.number}</Table.Td>
                  <Table.Td>{doc.date}</Table.Td>
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

        {/* Комментарий */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Комментарий</Title>
          <Text>{carData.comment}</Text>
        </Paper>

        <Group justify="flex-end">
          <Button 
            leftSection={<IconEdit size="1rem" />}
            variant="outline"
            onClick={handleEditClick}
          >
            Редактировать
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default CarProfilePage;