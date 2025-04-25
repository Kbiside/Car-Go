import {
  TextInput,
  Button,
  Stack,
  Title,
  FileInput,
  Group,
  Container,
  Paper,
  Grid,
  Text,
  Divider,
  Avatar,
  Badge,
  Flex,
  Box
} from '@mantine/core';
import { IconUpload, IconPhoto, IconCar, IconTrash, IconCheck } from '@tabler/icons-react';

const CarProfilePage = () => {
  // Данные автомобиля (в реальном приложении будут из API)
  const carData = {
    id: 'CAR-2023-056',
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    plateNumber: 'А123БВ777',
    vin: 'JT2BF22K2W0158759',
    color: 'Серебристый',
    status: 'Доступен',
    comment: 'Пробег 15 000 км. Состояние отличное.'
  };

  return (
    <Container size="lg" py="md">
      <Stack gap="xl">
        {/* Шапка с основной информацией */}
        <Paper p="md" shadow="sm" radius="md">
          <Group align="flex-start">
            <Avatar size={120} radius="md" color="blue">
              <IconCar size="2.5rem" />
            </Avatar>
            
            <Box>
              <Title order={2}>{carData.brand} {carData.model} {carData.year}</Title>
              <Group mt="sm">
                <Badge variant="light" color="green" size="lg">
                  {carData.status}
                </Badge>
                <Text c="dimmed">ID: {carData.id}</Text>
              </Group>
              
              <Group mt="md" gap="xl">
                <div>
                  <Text size="sm" c="dimmed">Гос. номер</Text>
                  <Text fw={500}>{carData.plateNumber}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">VIN</Text>
                  <Text fw={500}>{carData.vin}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Цвет</Text>
                  <Text fw={500}>{carData.color}</Text>
                </div>
              </Group>
            </Box>
          </Group>
        </Paper>

        {/* Основная информация */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p="md" shadow="sm" radius="md" h="100%">
              <Title order={4} mb="md">Основные данные</Title>
              <Stack gap="sm">
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
                <TextInput 
                  label="Год выпуска" 
                  value={carData.year.toString()} 
                  readOnly
                />
                <TextInput 
                  label="Гос. номер" 
                  value={carData.plateNumber} 
                  readOnly
                />
              </Stack>
            </Paper>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p="md" shadow="sm" radius="md" h="100%">
              <Title order={4} mb="md">Технические данные</Title>
              <Stack gap="sm">
                <TextInput 
                  label="VIN номер" 
                  value={carData.vin} 
                  readOnly
                />
                <TextInput 
                  label="Цвет" 
                  value={carData.color} 
                  readOnly
                />
                <TextInput 
                  label="Статус" 
                  value={carData.status} 
                  readOnly
                />
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Комментарий */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={4} mb="md">Комментарий</Title>
          <TextInput 
            value={carData.comment} 
            readOnly
          />
        </Paper>

        {/* Документы */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={4} mb="md">Документы автомобиля</Title>
          <Stack gap="md">
            <FileInput 
              label="Паспорт транспортного средства" 
              placeholder="Загрузить файл"
              rightSection={<IconUpload size="1rem" />}
              accept=".pdf,.jpg,.png"
            />
            <FileInput 
              label="Свидетельство о регистрации" 
              placeholder="Загрузить файл"
              rightSection={<IconUpload size="1rem" />}
              accept=".pdf,.jpg,.png"
            />
            <FileInput 
              label="Страховой полис" 
              placeholder="Загрузить файл"
              rightSection={<IconUpload size="1rem" />}
              accept=".pdf,.jpg,.png"
            />
            <FileInput 
              label="Фото автомобиля" 
              placeholder="Загрузить файл"
              rightSection={<IconPhoto size="1rem" />}
              accept="image/*"
            />
          </Stack>
        </Paper>

        {/* Кнопки действий */}
        <Group justify="flex-end" mt="md">
          <Button 
            variant="outline" 
            color="red" 
            leftSection={<IconTrash size="1rem" />}
          >
            Удалить
          </Button>
          <Button 
            color="blue" 
            leftSection={<IconCheck size="1rem" />}
          >
            Сохранить изменения
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default CarProfilePage;