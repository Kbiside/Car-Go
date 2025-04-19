import {
  TextInput,
  Button,
  Stack,
  Title,
  FileInput,
  Group,
  Container,
} from '@mantine/core';

const AddCarPage = () => {
  return (
    <Container>
      <Title order={2}>Добавьте новый автомобиль</Title>
      <Stack>
        <Title order={4}>Информация об автомобиле</Title>
        <TextInput label="Введите ID" placeholder="ID" />
        <TextInput label="Введите марку" placeholder="Марка авто" />
        <TextInput label="Введите модель" placeholder="Модель авто" />
        <TextInput label="Введите номер" placeholder="Регистрационный номер" />
        <TextInput label="Введите комментарий" placeholder="Комментарий" />

        <Title order={4}>Загрузка документов</Title>
        <FileInput label="Паспорт транспортного средства" placeholder="Загрузить файл" />
        <FileInput label="Договор купли-продажи" placeholder="Загрузить файл" />
        <FileInput label="Страховой полис" placeholder="Загрузить файл" />
        <FileInput label="Фото автомобиля" placeholder="Загрузить файл" />
        <FileInput label="Свидетельство о регистрации" placeholder="Загрузить файл" />

        <Group>
          <Button variant="outline">Очистить</Button>
          <Button color="blue">Сохранить</Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default AddCarPage;