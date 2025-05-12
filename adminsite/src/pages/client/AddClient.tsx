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
  Select,
  Textarea,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useState } from 'react';

export function ClientAddPage() {

  const [formValues, setFormValues] = useState({
    clientId: '',
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    passportNumber: '',
    issueDate: '',
    issuingAuthority: '',
    inn: '',
    comment: '',
    passportFile: null,
    driverLicense: null,
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
      <Title order={2} mb="md">Добавить клиента</Title>
      <Stack>
        <Title order={4}>Основная информация</Title>
        
        <SimpleGrid cols={2} spacing="md">
          <TextInput 
            label={
              <>
                ID клиента
                <RequiredStar filled={!!formValues.clientId} />
              </>
            }
            placeholder="12345"
            value={formValues.clientId}
            onChange={(e) => handleChange('clientId', e.target.value)}
          />
          <TextInput 
            label={
              <>
                ФИО
                <RequiredStar filled={!!formValues.fullName} />
              </>
            }
            placeholder="Введите ФИО"
            value={formValues.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
          <TextInput 
            label={
              <>
                Email
                <RequiredStar filled={!!formValues.email} />
              </>
            }
            placeholder="Введите email"
            value={formValues.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <TextInput 
            label={
              <>
                Номер телефона
                <RequiredStar filled={!!formValues.phone} />
              </>
            }
            placeholder="Введите номер"
            value={formValues.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <TextInput 
            label={
              <>
                Дата рождения
                <RequiredStar filled={!!formValues.birthDate} />
              </>
            }
            placeholder="ДД/ММ/ГГГГ"
            value={formValues.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
          />
          <Select
            label={
              <>
                Пол
                <RequiredStar filled={!!formValues.gender} />
              </>
            }
            placeholder="Выберите пол"
            data={[
              { value: 'male', label: 'м' },
              { value: 'female', label: 'ж' },
            ]}
            value={formValues.gender}
            onChange={(value) => handleChange('gender', value)}
          />
        </SimpleGrid>

        <Title order={4}>Документы клиента</Title>
        
        <Grid gutter="md">
          <Grid.Col span={6}>
            <TextInput 
              label={
                <>
                  Серия и номер паспорта
                  <RequiredStar filled={!!formValues.passportNumber} />
                </>
              }
              placeholder="123456789"
              value={formValues.passportNumber}
              onChange={(e) => handleChange('passportNumber', e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput 
              label={
                <>
                  Дата выдачи
                  <RequiredStar filled={!!formValues.issueDate} />
                </>
              }
              placeholder="ДД/ММ/ГГГГ"
              value={formValues.issueDate}
              onChange={(e) => handleChange('issueDate', e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput 
              label={
                <>
                  Выдавший орган
                  <RequiredStar filled={!!formValues.issuingAuthority} />
                </>
              }
              placeholder="Введите"
              value={formValues.issuingAuthority}
              onChange={(e) => handleChange('issuingAuthority', e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput 
              label={
                <>
                  ИНН
                  <RequiredStar filled={!!formValues.inn} />
                </>
              }
              placeholder="123456789"
              value={formValues.inn}
              onChange={(e) => handleChange('inn', e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea 
              label="Комментарий" 
              placeholder="Введите комментарий (при необходимости)" 
              value={formValues.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FileInput 
              label={
                <>
                  Паспорт клиента
                  <RequiredStar filled={!!formValues.passportFile} />
                </>
              }
              placeholder="Загрузить файл"
              value={formValues.passportFile}
              onChange={(value) => handleChange('passportFile', value)}
              rightSection={<IconUpload size={18} />}
              rightSectionWidth={40}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FileInput 
              label={
                <>
                  Водительское удостоверение
                  <RequiredStar filled={!!formValues.driverLicense} />
                </>
              }
              placeholder="Загрузить файл"
              value={formValues.driverLicense}
              onChange={(value) => handleChange('driverLicense', value)}
              rightSection={<IconUpload size={18} />}
              rightSectionWidth={40}
            />
          </Grid.Col>
        </Grid>

        <Group mt="md">
          <Button variant="outline">Очистить</Button>
          <Button color="blue">Сохранить</Button>
        </Group>
      </Stack>
    </Container>
  );
}