import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Image,
  Checkbox,
  Button,
} from '@mantine/core';

const CarProfile = () => {
  const carDetails = {
    registrationNumber: 'A567PH',
    id: '34562',
    model: 'Audi A4',
    year: '2019',
    color: 'Black',
    comment: 'Царапина на задней двери',
    status: 'Свободен',
    documents: [
      'Фото автомобиля',
      'Страховой полис',
      'Паспорт ТС',
      'Свидетельство о регистрации',
      'Договор купли-продажи',
    ],
  };

  return (
    <Container>
      <Title order={1}>Профиль автомобиля</Title>
      <Text>Регистрационный номер: {carDetails.registrationNumber}</Text>
      <Text>ID {carDetails.id}</Text>
      <Text>
        {carDetails.model}, {carDetails.year}, {carDetails.color}
      </Text>

      <Text mt="md">Комментарий</Text>
      <Text>{carDetails.comment}</Text>

      <Text mt="md">Доступ</Text>
      <Text>Статус: {carDetails.status}</Text>

      <Grid mt="md">
          <Card shadow="sm">
            <Image
              src="https://example.com/car-image.jpg" // Замените на URL изображения автомобиля
              alt="Car"
              height={160}
            />
          </Card>
          <Text >Документы и фото</Text>
          {carDetails.documents.map((doc, index) => (
            <Checkbox key={index} label={doc} />
          ))}
      </Grid>

      <Button mt="md">Редактировать</Button>
    </Container>
  );
};

export default CarProfile;