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
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

const CreateRequest = () => {
  const [employee, setEmployee] = useState<string | null>(null);
  const [fio, setFio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carModel, setCarModel] = useState<string | null>(null);
  const [cost, setCost] = useState('');
  const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
  const [childSeat, setChildSeat] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Обработка отправки формы
    console.log({
      employee,
      fio,
      phone,
      email,
      carModel,
      cost,
      dates,
      childSeat,
      comment,
    });
  };

  return (
    <Container>
      <Title order={2}>Создание заявки</Title>
      <Select
        label="Сотрудник"
        placeholder="Выбрать"
        value={employee}
        onChange={setEmployee}
        data={['Сотрудник 1', 'Сотрудник 2', 'Сотрудник 3']}
      />
      <TextInput
        label="ФИО заказчика"
        placeholder="Введите ФИО заказчика"
        value={fio}
        onChange={(event) => setFio(event.currentTarget.value)}
      />
      <TextInput
        label="Номер телефона заказчика"
        placeholder="Введите номер телефона"
        value={phone}
        onChange={(event) => setPhone(event.currentTarget.value)}
      />
      <TextInput
        label="Электронная почта"
        placeholder="Введите электронную почту"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Select
        label="Модель автомобиля"
        placeholder="Выбрать"
        value={carModel}
        onChange={setCarModel}
        data={['Модель 1', 'Модель 2', 'Модель 3']}
      />
      <TextInput
        label="Стоимость"
        placeholder="Введите стоимость"
        value={cost}
        onChange={(event) => setCost(event.currentTarget.value)}
      />
      <Checkbox
        label="Детское кресло"
        checked={childSeat}
        onChange={(event) => setChildSeat(event.currentTarget.checked)}
      />
      <DatePickerInput
        type="range"
        label="Выберите даты"
        value={dates}
        onChange={setDates}
      />
      <Textarea
        label="Комментарий"
        placeholder="Введите комментарий"
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={() => console.log('Очистить')}>
          Очистить
        </Button>
        <Button onClick={handleSubmit}>Оформить</Button>
      </Group>
    </Container>
  );
};

export default CreateRequest;