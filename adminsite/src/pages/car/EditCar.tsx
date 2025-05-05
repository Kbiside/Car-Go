import {
    Title,
    Text,
    Button,
    Group,
    Stack,
    Container,
    Paper,
    TextInput,
    Select,
    FileInput,
    SimpleGrid,
    Badge,
    Modal,
    Avatar,
    ActionIcon,
  } from '@mantine/core';
  import { IconUpload, IconEdit, IconX } from '@tabler/icons-react';
  import { useState } from 'react';
  
  interface CarData {
    id: string;
    brand: string;
    model: string;
    year: string;
    plateNumber: string;
    vin: string;
    color: string;
    status: string;
    comment: string;
    photoUrl: string;
    carPhotoFile: File | null;
    vehiclePassportFile: File | null;
    insuranceFile: File | null;
    registrationFile: File | null;
  }
  
  interface SelectOption {
    value: string;
    label: string;
  }
  
  const EditCarPage = () => {
    // Данные автомобиля
    const [carData, setCarData] = useState<CarData>({
      id: 'CAR-2023-056',
      brand: 'Toyota',
      model: 'Camry',
      year: '2022',
      plateNumber: 'А123БВ777',
      vin: 'JT2BF22K2W0158759',
      color: 'Серебристый',
      status: 'available',
      comment: 'Пробег 15 000 км. Состояние отличное.',
      photoUrl: 'https://example.com/car-photo.jpg',
      carPhotoFile: null,
      vehiclePassportFile: null,
      insuranceFile: null,
      registrationFile: null,
    });
  
    const [openedPhoto, setOpenedPhoto] = useState(false);
  
    const statuses: SelectOption[] = [
      { value: 'available', label: 'Доступен' },
      { value: 'unavailable', label: 'Недоступен' },
      { value: 'maintenance', label: 'На обслуживании' },
      { value: 'rented', label: 'В аренде' },
    ];
  
    const colors: SelectOption[] = [
      'Белый', 'Черный', 'Серебристый', 'Серый', 'Красный', 'Синий', 'Зеленый', 'Желтый', 'Коричневый'
    ].map(color => ({ value: color, label: color }));
  
    const years: SelectOption[] = Array.from({ length: 10 }, (_, i) => {
      const year = new Date().getFullYear() - i;
      return { value: year.toString(), label: year.toString() };
    });
  
    const handleChange = (field: keyof CarData, value: any) => {
      setCarData(prev => ({ ...prev, [field]: value }));
    };
  
    const handleSave = () => {
      console.log('Сохранение данных автомобиля:', carData);
      // Здесь будет логика сохранения данных
    };
  
    const handleReset = () => {
      console.log('Сброс изменений');
      // Здесь будет логика сброса изменений
    };
  
    const handleRemovePhoto = () => {
      setCarData(prev => ({ ...prev, photoUrl: '', carPhotoFile: null }));
    };
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'available': return 'green';
        case 'rented': return 'blue';
        case 'maintenance': return 'yellow';
        default: return 'red';
      }
    };
  
    const currentStatus = statuses.find(s => s.value === carData.status);
  
    return (
      <Container size="lg" py="md">
        {/* Модальное окно для просмотра фото */}
        <Modal
          opened={openedPhoto}
          onClose={() => setOpenedPhoto(false)}
          title={`Фото автомобиля ${carData.brand} ${carData.model}`}
          size="xl"
        >
          <Group justify="center">
            <Avatar 
              src={carData.photoUrl} 
              size="100%"
              maw="100%"
              mah="70vh"
              radius="md"
              alt={`Фото ${carData.brand} ${carData.model}`}
            />
          </Group>
        </Modal>
  
        <Stack gap="xl">
          <Title order={1} ta="center">
            Редактирование автомобиля
          </Title>
  
          {/* Основная информация */}
          <Paper p="md" shadow="sm" radius="md">
            <Group align="flex-start" wrap="nowrap" gap="xl">
              <Stack align="center">
                <Avatar 
                  src={carData.photoUrl || null}
                  size={160}
                  radius="md"
                  alt={`Фото ${carData.brand} ${carData.model}`}
                  onClick={() => carData.photoUrl && setOpenedPhoto(true)}
                  style={{ cursor: carData.photoUrl ? 'pointer' : 'default' }}
                />
                <Group>
                  <FileInput
                    placeholder="Изменить фото"
                    accept="image/*"
                    value={carData.carPhotoFile}
                    onChange={(file) => handleChange('carPhotoFile', file)}
                    leftSection={<IconUpload size="1rem" />}
                    variant="filled"
                    size="xs"
                  />
                  {carData.photoUrl && (
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
  
              <Stack gap="xs" style={{ flexGrow: 1 }}>
                <Text size="md" c="dimmed">
                  ID: {carData.id}
                </Text>
  
                <SimpleGrid cols={2}>
                  <TextInput
                    label="Марка"
                    value={carData.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                  />
                  <TextInput
                    label="Модель"
                    value={carData.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                  />
                  <Select
                    label="Год выпуска"
                    data={years}
                    value={carData.year}
                    onChange={(value) => handleChange('year', value)}
                  />
                  <Select
                    label="Цвет"
                    data={colors}
                    value={carData.color}
                    onChange={(value) => handleChange('color', value)}
                  />
                  <TextInput
                    label="Гос. номер"
                    value={carData.plateNumber}
                    onChange={(e) => handleChange('plateNumber', e.target.value)}
                  />
                  <TextInput
                    label="VIN номер"
                    value={carData.vin}
                    onChange={(e) => handleChange('vin', e.target.value)}
                  />
                  <Select
                    label="Статус"
                    data={statuses}
                    value={carData.status}
                    onChange={(value) => handleChange('status', value)}
                    leftSection={
                      currentStatus && (
                        <Badge 
                          color={getStatusColor(carData.status)}
                          variant="light"
                          size="sm"
                        >
                          {currentStatus.label}
                        </Badge>
                      )
                    }
                    leftSectionWidth={90}
                    comboboxProps={{
                      withinPortal: true,
                    }}
                  />
                </SimpleGrid>
              </Stack>
            </Group>
          </Paper>
  
          {/* Документы */}
          <Paper p="md" shadow="sm" radius="md">
            <Title order={3} mb="md">Документы автомобиля</Title>
            
            <SimpleGrid cols={2}>
              <FileInput
                label="Паспорт ТС"
                placeholder="Загрузить файл"
                value={carData.vehiclePassportFile}
                onChange={(file) => handleChange('vehiclePassportFile', file)}
                leftSection={<IconUpload size="1rem" />}
                rightSectionWidth={40}
              />
              <FileInput
                label="Страховой полис"
                placeholder="Загрузить файл"
                value={carData.insuranceFile}
                onChange={(file) => handleChange('insuranceFile', file)}
                leftSection={<IconUpload size="1rem" />}
                rightSectionWidth={40}
              />
              <FileInput
                label="Свидетельство о регистрации"
                placeholder="Загрузить файл"
                value={carData.registrationFile}
                onChange={(file) => handleChange('registrationFile', file)}
                leftSection={<IconUpload size="1rem" />}
                rightSectionWidth={40}
              />
            </SimpleGrid>
          </Paper>
  
          {/* Комментарий */}
          <Paper p="md" shadow="sm" radius="md">
            <TextInput
              label="Комментарий"
              value={carData.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
            />
          </Paper>
  
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={handleReset}>
              Отменить
            </Button>
            <Button onClick={handleSave} leftSection={<IconEdit size="1rem" />}>
              Сохранить изменения
            </Button>
          </Group>
        </Stack>
      </Container>
    );
  };
  
  export default EditCarPage;