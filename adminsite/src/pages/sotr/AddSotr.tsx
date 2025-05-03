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
  Select,
  ActionIcon,
  Tooltip,
  CopyButton,
  Box
} from '@mantine/core';
import { IconUpload, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const AddEmployee = () => {
  const [formValues, setFormValues] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    passportNumber: '',
    issuingAuthority: '',
    issueDate: '',
    passportCopy: null,
    inn: '',
    position: '',
    workBook: null,
    photo: null,
    educationDocuments: null,
    tempPassword: generatePassword(),
  });

  const handleChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const regeneratePassword = () => {
    setFormValues(prev => ({ ...prev, tempPassword: generatePassword() }));
  };

  const RequiredStar = ({ filled }: { filled: boolean }) => (
    <Text span c="red" ml={4} style={{ visibility: filled ? 'hidden' : 'visible' }}>
      *
    </Text>
  );

  return (
    <Container size="lg">
      <Title order={2} mb="md">Добавить сотрудника</Title>
      <Stack>
        <Title order={4}>Основная информация</Title>
        
        <SimpleGrid cols={2} spacing="md">
          <TextInput 
            label={
              <>
                ID сотрудника
                <RequiredStar filled={!!formValues.employeeId} />
              </>
            }
            placeholder="12345"
            value={formValues.employeeId}
            onChange={(e) => handleChange('employeeId', e.target.value)}
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
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' },
            ]}
            value={formValues.gender}
            onChange={(value) => handleChange('gender', value)}
          />
        </SimpleGrid>

        <Title order={4}>Паспортные данные</Title>
        
        <SimpleGrid cols={2} spacing="md">
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
          <FileInput 
            label={
              <>
                Копия паспорта
                <RequiredStar filled={!!formValues.passportCopy} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.passportCopy}
            onChange={(value) => handleChange('passportCopy', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
        </SimpleGrid>

        <Title order={4}>Рабочая информация</Title>
        
        <SimpleGrid cols={2} spacing="md">
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
          <TextInput 
            label={
              <>
                Должность
                <RequiredStar filled={!!formValues.position} />
              </>
            }
            placeholder="Введите должность"
            value={formValues.position}
            onChange={(e) => handleChange('position', e.target.value)}
          />
          <FileInput 
            label={
              <>
                Трудовая книжка
                <RequiredStar filled={!!formValues.workBook} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.workBook}
            onChange={(value) => handleChange('workBook', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
          <FileInput 
            label={
              <>
                Публичное фото
                <RequiredStar filled={!!formValues.photo} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.photo}
            onChange={(value) => handleChange('photo', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
          <FileInput 
            label={
              <>
                Документы об образовании
                <RequiredStar filled={!!formValues.educationDocuments} />
              </>
            }
            placeholder="Загрузить файл"
            value={formValues.educationDocuments}
            onChange={(value) => handleChange('educationDocuments', value)}
            rightSection={<IconUpload size={18} />}
            rightSectionWidth={40}
          />
          <Box>
            <Text size="sm" fw={500} mb={4}>
              Временный пароль <RequiredStar filled={!!formValues.tempPassword} />
            </Text>
            <Group gap="xs">
              <TextInput 
                value={formValues.tempPassword}
                readOnly
                style={{ flex: 1 }}
              />
              <CopyButton value={formValues.tempPassword}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Скопировано!' : 'Копировать'} withArrow>
                    <ActionIcon 
                      color={copied ? 'teal' : 'gray'} 
                      variant="light"
                      onClick={copy}
                    >
                      <IconCopy size={18} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
              <Button 
                variant="outline" 
                size="sm"
                onClick={regeneratePassword}
              >
                Сгенерировать
              </Button>
            </Group>
          </Box>
        </SimpleGrid>

        <Group mt="md">
          <Button variant="outline">Очистить</Button>
          <Button color="blue">Сохранить</Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default AddEmployee;