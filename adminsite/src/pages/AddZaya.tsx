import {
  Title,
  Select,
  TextInput,
  Switch,
  DatePicker,
  Textarea,
  Button,
  Group,
  Stack,
  Grid,
  Container,
} from '@mantine/core';

export default function CreateRequestPage() {
  const [employee, setEmployee] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [carModel, setCarModel] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [childSeat, setChildSeat] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Обработка отправки формы
    console.log({
      employee,
      customerName,
      birthDate,
      phoneNumber,
      email,
      carModel,
      price,
      childSeat,
      startDate,
      endDate,
      comment,
    });
  };

  const handleClear = () => {
    setEmployee(null);
    setCustomerName('');
    setBirthDate('');
    setPhoneNumber('');
    setEmail('');
    setCarModel(null);
    setPrice('');
    setChildSeat(false);
    setStartDate(null);
    setEndDate(null);
    setComment('');
  };

  return (
    <Container size="md" py="xl">
      <Stack spacing="xl">
        <Title align="center" order={1}>
          Создание заявки
        </Title>

        <Select
          label="Сотрудник"
          placeholder="Выбрать"
          data={[
            { value: '1', label: 'Иванов Иван Иванович' },
            { value: '2', label: 'Петров Петр Петрович' },
            { value: '3', label: 'Сидорова Анна Владимировна' },
          ]}
          value={employee}
          onChange={setEmployee}
        />

        <TextInput
          label="ФИО заказчика"
          placeholder="Введите ФИО заказчика"
          value={customerName}
          onChange={(e) => setCustomerName(e.currentTarget.value)}
        />

        <TextInput
          label="Номер и серия ВУ"
          placeholder="Введите номер и серию водительского удостоверения"
          value={birthDate}
          onChange={(e) => setBirthDate(e.currentTarget.value)}
        />

        <TextInput
          label="Дата выдачи ВУ"
          placeholder="Введите дату выдачи водительского удостоверения"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.currentTarget.value)}
        />

        <TextInput
          label="Электронная почта"
          placeholder="Введите электронную почту"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <Grid>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Select
              label="Модель автомобиля"
              placeholder="Выбрать"
              data={[
                { value: '1', label: 'Toyota Camry' },
                { value: '2', label: 'Honda Accord' },
                { value: '3', label: 'BMW X5' },
              ]}
              value={carModel}
              onChange={setCarModel}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <TextInput
              label="Стоимость"
              placeholder="Введите стоимость"
              value={price}
              onChange={(e) => setPrice(e.currentTarget.value)}
            />
          </Grid.Col>
        </Grid>

        <Switch
          label="Детское кресло"
          checked={childSeat}
          onChange={(e) => setChildSeat(e.currentTarget.checked)}
        />

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <DatePicker
              label="Дата начала"
              placeholder="Выберите дату"
              value={startDate}
              onChange={setStartDate}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <DatePicker
              label="Дата окончания"
              placeholder="Выберите дату"
              value={endDate}
              onChange={setEndDate}
            />
          </Grid.Col>
        </Grid>

        <Textarea
          label="Комментарий"
          placeholder="Введите комментарий"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          autosize
          minRows={3}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleClear}>
            Очистить
          </Button>
          <Button onClick={handleSubmit}>Оформить</Button>
        </Group>
      </Stack>
    </Container>
  );
}