import { Button, Container, FileInput, Group, Select, Textarea, TextInput, Title } from "@mantine/core";

export function ClientAddPage() {
    return (<Container>
    <Title order={2}>Добавить клиента</Title>
    <TextInput label="ID клиента" placeholder="12345" required />
    <TextInput label="ФИО" placeholder="Введите ФИО" required />
    <TextInput label="Email" placeholder="Введите email" required />
    <TextInput label="Номер телефона" placeholder="Введите номер" required />
    <TextInput label="Дата рождения" placeholder="ДД/ММ/ГГГГ" required />
    <Select
      label="Пол"
      placeholder="Выберите пол"
      data={[
        { value: 'male', label: 'м' },
        { value: 'female', label: 'ж' },
      ]}
      required
    />
    <Title order={3}>Документы клиента</Title>
    <TextInput label="Серия и номер паспорта" placeholder="123456789" required />
    <TextInput label="Дата выдачи" placeholder="Введите" required />
    <TextInput label="Выдавший орган" placeholder="ДД/ММ/ГГГГ" required />
    <TextInput label="ИНН" placeholder="123456789" required />
    <TextInput label="Должность" placeholder="Введите должность сотрудника" />
    <Textarea label="Комментарий" placeholder="Введите комментарий (при необходимости)" />
    <Group>
      <FileInput label="Паспорт клиента" placeholder="Загрузить файл" />
      <FileInput label="Водительское удостоверение" placeholder="Загрузить файл" />
    </Group>
    <Group>
      <Button variant="outline">Очистить</Button>
      <Button color="blue">Сохранить</Button>
    </Group>
  </Container>)
}