import {
  TextInput,
  Button,
  Stack,
  Title,
  Group,
  Container,
  Paper,
  Text,
  Badge,
  Box,
  ActionIcon,
  Modal
} from '@mantine/core';
import { IconDownload, IconCar, IconEdit, IconPhoto } from '@tabler/icons-react';
import { useState } from 'react';

const CarProfilePage = () => {
  const [openedPhoto, setOpenedPhoto] = useState(false);
  
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
    photoUrl: 'https://example.com/car-photo.jpg', // URL фото автомобиля
    documents: [
      { type: 'Паспорт ТС', number: '78ОК123456', date: '15.03.2022' },
      { type: 'Страховой полис', number: 'СБ123456789', date: '20.01.2023' },
      { type: 'Свидетельство о регистрации', number: '77AA123456', date: '10.03.2022' }
    ]
  };

  const handleDownload = (docType: string) => {
    console.log(`Скачивание ${docType}`);
    // В реальном приложении здесь будет запрос к API для скачивания файла
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
        {/* Заголовок и кнопка редактирования */}
        <Group justify="space-between" align="center">
          <Title order={2}>Профиль автомобиля</Title>
          <Button 
            leftSection={<IconEdit size="1rem" />}
            variant="outline"
          >
            Редактировать
          </Button>
        </Group>

        {/* Основная информация */}
        <Paper p="md" shadow="sm" radius="md">
          <Stack gap="xs">
            <Group align="center">
              <ActionIcon 
                variant="subtle" 
                size="xl" 
                onClick={() => setOpenedPhoto(true)}
                title="Просмотреть фото автомобиля"
              >
                <Box p="sm" bg="blue.1" style={{ borderRadius: '50%' }}>
                  <IconPhoto size="2rem" color="var(--mantine-color-blue-6)" />
                </Box>
              </ActionIcon>
              <Box>
                <Title order={3}>{carData.brand} {carData.model} {carData.year}</Title>
                <Badge color="green" variant="light">{carData.status}</Badge>
              </Box>
            </Group>

            <Group grow>
              <TextInput 
                label="ID автомобиля" 
                value={carData.id} 
                readOnly 
              />
              <TextInput 
                label="Гос. номер" 
                value={carData.plateNumber} 
                readOnly 
              />
            </Group>

            <Group grow>
              <TextInput 
                label="Марка" 
                value={carData.brand} 
                readOnly 
              />
              <TextInput 
                label="Модель" 
                value={carData.model} 
                readOnly 
              />
            </Group>

            <Group grow>
              <TextInput 
                label="Год выпуска" 
                value={carData.year.toString()} 
                readOnly 
              />
              <TextInput 
                label="Цвет" 
                value={carData.color} 
                readOnly 
              />
            </Group>

            <TextInput 
              label="VIN номер" 
              value={carData.vin} 
              readOnly 
            />
          </Stack>
        </Paper>

        {/* Документы */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Документы автомобиля</Title>
          <Stack gap="sm">
            {carData.documents.map((doc, index) => (
              <Group key={index} justify="space-between">
                <Box>
                  <Text fw={500}>{doc.type}</Text>
                  <Text size="sm" c="dimmed">№ {doc.number} от {doc.date}</Text>
                </Box>
                <ActionIcon 
                  variant="subtle" 
                  color="blue"
                  onClick={() => handleDownload(doc.type)}
                  title="Скачать документ"
                >
                  <IconDownload size="1rem" />
                </ActionIcon>
              </Group>
            ))}
          </Stack>
        </Paper>

        {/* Комментарий */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Комментарий</Title>
          <TextInput 
            value={carData.comment} 
            readOnly
          />
        </Paper>
      </Stack>
    </Container>
  );
};

export default CarProfilePage;