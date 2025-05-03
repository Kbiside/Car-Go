import { useState } from 'react';
import {
  TextInput,
  Select,
  Checkbox,
  Button,
  Group,
  Textarea,
  Container,
  Title,
  SimpleGrid,
  Stack,
  Text,
  Box,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

const CreateRequest = () => {
  const [formValues, setFormValues] = useState({
    employee: null as string | null,
    fio: '',
    phone: '',
    email: '',
    carModel: null as string | null,
    cost: '',
    dates: [null, null] as [Date | null, Date | null],
    childSeat: false,
    comment: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(formValues);
  };

  const RequiredStar = ({ filled }: { filled: boolean }) => (
    <Text span c="red" ml={4} style={{ visibility: filled ? 'hidden' : 'visible' }}>
      *
    </Text>
  );

  return (
    <Container size="lg">
      <Title order={2} mb="md">Создание заявки</Title>
      <Stack>
        <Title order={4}>Информация о заказчике</Title>
        
        <SimpleGrid cols={2} spacing="md">
          <Select
            label={
              <>
                Сотрудник
                <RequiredStar filled={!!formValues.employee} />
              </>
            }
            placeholder="Выбрать"
            value={formValues.employee}
            onChange={(value) => handleChange('employee', value)}
            data={['Сотрудник 1', 'Сотрудник 2', 'Сотрудник 3']}
          />
          <TextInput
            label={
              <>
                ФИО заказчика
                <RequiredStar filled={!!formValues.fio} />
              </>
            }
            placeholder="Введите ФИО заказчика"
            value={formValues.fio}
            onChange={(e) => handleChange('fio', e.target.value)}
          />
          <TextInput
            label={
              <>
                Номер телефона
                <RequiredStar filled={!!formValues.phone} />
              </>
            }
            placeholder="Введите номер телефона"
            value={formValues.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <TextInput
            label="Электронная почта"
            placeholder="Введите электронную почту"
            value={formValues.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </SimpleGrid>

        <Title order={4}>Информация об аренде</Title>
        
        <SimpleGrid cols={2} spacing="md">
          <Select
            label={
              <>
                Модель автомобиля
                <RequiredStar filled={!!formValues.carModel} />
              </>
            }
            placeholder="Выбрать"
            value={formValues.carModel}
            onChange={(value) => handleChange('carModel', value)}
            data={['Модель 1', 'Модель 2', 'Модель 3']}
          />
          <TextInput
            label={
              <>
                Стоимость
                <RequiredStar filled={!!formValues.cost} />
              </>
            }
            placeholder="Введите стоимость"
            value={formValues.cost}
            onChange={(e) => handleChange('cost', e.target.value)}
          />
          <Box>
            <DatePickerInput
              type="range"
              label={
                <>
                  Даты аренды
                  <RequiredStar filled={!!formValues.dates[0] && !!formValues.dates[1]} />
                </>
              }
              value={formValues.dates}
              onChange={(value) => handleChange('dates', value)}
              rightSection={<IconCalendar size={18} />}
              rightSectionPointerEvents="none"
            />
          </Box>
          <Checkbox
            label="Детское кресло"
            checked={formValues.childSeat}
            onChange={(e) => handleChange('childSeat', e.target.checked)}
            mt={28}
          />
        </SimpleGrid>

        <Textarea
          label="Комментарий"
          placeholder="Введите комментарий"
          value={formValues.comment}
          onChange={(e) => handleChange('comment', e.target.value)}
          minRows={3}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={() => setFormValues({
            employee: null,
            fio: '',
            phone: '',
            email: '',
            carModel: null,
            cost: '',
            dates: [null, null],
            childSeat: false,
            comment: '',
          })}>
            Очистить
          </Button>
          <Button color="blue" onClick={handleSubmit}>
            Оформить
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default CreateRequest;