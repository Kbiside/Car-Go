import {
  TextInput,
  Button,
  Stack,
  Title,
  FileInput,
  Group,
  Container,
  SimpleGrid,
  Text,
  Grid,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useState } from 'react';

const AddCarPage = () => {
  const [formValues, setFormValues] = useState({
    brand: '',
    model: '',
    number: '',
    comment: '',
    vehiclePassport: null,
    salesContract: null,
    insurancePolicy: null,
    carPhoto: null,
    registrationCertificate: null,
  });

  const handleChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const RequiredStar = ({ filled }: { filled: boolean }) => (
    <Text span c="red" ml={4} style={{ visibility: filled ? 'hidden' : 'visible' }}>
      *
    </Text>
  );

  return (
    <Container size="lg">
      <Title order={2} mb="md">Добавить новый автомобиль</Title>
      <Stack >
        <Title order={4}>Информация об автомобиле</Title>
        
        <SimpleGrid cols={2} spacing="md">
          <TextInput 
            label={
              <>
                Марка авто
                <RequiredStar filled={!!formValues.brand} />
              </>
            } 
            placeholder="Введите марку"
            value={formValues.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
          />
          <TextInput 
            label={
              <>
                Модель авто
                <RequiredStar filled={!!formValues.model} />
              </>
            } 
            placeholder="Введите модель"
            value={formValues.model}
            onChange={(e) => handleChange('model', e.target.value)}
          />
          
          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput 
                label={
                  <>
                    Регистрационный номер
                    <RequiredStar filled={!!formValues.number} />
                  </>
                } 
                placeholder="Введите номер"
                value={formValues.number}
                onChange={(e) => handleChange('number', e.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput 
                label="Комментарий" 
                placeholder="Введите комментарий" 
                value={formValues.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>

        <Title order={4}>Загрузка документов</Title>
        
        <SimpleGrid cols={2} spacing="md">
          <FileInput 
            label={
              <>
                Паспорт транспортного средства
                <RequiredStar filled={!!formValues.vehiclePassport} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.vehiclePassport}
            onChange={(value) => handleChange('vehiclePassport', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
          <FileInput 
            label={
              <>
                Договор купли-продажи
                <RequiredStar filled={!!formValues.salesContract} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.salesContract}
            onChange={(value) => handleChange('salesContract', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
          <FileInput 
            label={
              <>
                Страховой полис
                <RequiredStar filled={!!formValues.insurancePolicy} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.insurancePolicy}
            onChange={(value) => handleChange('insurancePolicy', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
          <FileInput 
            label={
              <>
                Фото автомобиля
                <RequiredStar filled={!!formValues.carPhoto} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.carPhoto}
            onChange={(value) => handleChange('carPhoto', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
          <FileInput 
            label={
              <>
                Свидетельство о регистрации
                <RequiredStar filled={!!formValues.registrationCertificate} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.registrationCertificate}
            onChange={(value) => handleChange('registrationCertificate', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
        </SimpleGrid>

        <Group mt="md">
          <Button variant="outline">Очистить</Button>
          <Button color="blue">Сохранить</Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default AddCarPage;