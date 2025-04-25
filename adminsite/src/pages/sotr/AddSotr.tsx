import {
  TextInput,
  Textarea,
  Select,
  Button,
  FileInput,
  Group,
  Container,
  Title,
} from '@mantine/core';

const AddEmployee = () => {
  return (
    <Container>
      <Title order={2}>Добавить сотрудника</Title>
      <form>
        <TextInput label="ID сотрудника" placeholder="12345" required />
        <TextInput label="ФИО" placeholder="Введите ФИО" required />
        <TextInput label="Email" placeholder="Введите email" required />
        <TextInput label="Номер телефона" placeholder="Введите номер" required />
        <TextInput label="Дата рождения" placeholder="ДД/ММ/ГГГГ" required />
        <Select
          label="Пол"
          placeholder="Введите м/ж"
          data={[
            { value: 'male', label: 'Мужской' },
            { value: 'female', label: 'Женский' },
          ]}
          required
        />
        <TextInput label="Серия и номер паспорта" placeholder="123456789" required />
        <TextInput label="Выдавший орган" placeholder="Введите" required />
        <TextInput label="Дата выдачи" placeholder="ДД/ММ/ГГГГ" required />
        <FileInput label="Загрузите копию паспорта" required />
        <TextInput label="ИНН" placeholder="123456789" required />
        <TextInput label="Должность" placeholder="Введите должность сотрудника" required />
        <FileInput label="Загрузите трудовую книжку" required />
        <FileInput label="Загрузите публичное фото" required />
        <Textarea label="Загрузите документы об образовании" placeholder="Введите документы" required />
        <TextInput label="Временный пароль" placeholder="fhbs663dge97" required />

        <Group>
          <Button type="submit">Сохранить</Button>
          <Button type="button" variant="outline">Очистить</Button>
        </Group>
      </form>
    </Container>
  );
};

export default AddEmployee;