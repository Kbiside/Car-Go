import { Container, Title, Text, Table, Button, Textarea } from '@mantine/core';

const ClientProfile = () => {
  const clientData = {
    name: "Смирнова Анна Сергеевна",
    id: "937601",
    passport: {
      number: "123456789",
      issuedBy: "ГУ МВД ПО ИРКУТСКОЙ ОБЛАСТИ",
      issueDate: "23.08.2011",
      email: "petrova@mail.ru",
    },
    drivingLicense: {
      number: "123456789",
      category: "Введите категорию",
    },
    comments: "Предпочитает электромобили",
  };

  return (
    <Container>
      <Title order={1}>Профиль клиента</Title>
      <Text>{clientData.name}</Text>
      <Text>ID {clientData.id}</Text>

      <Title order={2}>Документы клиента</Title>
      <Table>
        <tbody>
          <tr>
            <td>Серия и номер паспорта</td>
            <td>{clientData.passport.number}</td>
          </tr>
          <tr>
            <td>Выдавший орган</td>
            <td>{clientData.passport.issuedBy}</td>
          </tr>
          <tr>
            <td>Дата выдачи</td>
            <td>{clientData.passport.issueDate}</td>
          </tr>
          <tr>
            <td>Адрес электронной почты</td>
            <td>{clientData.passport.email}</td>
          </tr>
          <tr>
            <td>Серия и номер ВУ</td>
            <td>{clientData.drivingLicense.number}</td>
          </tr>
          <tr>
            <td>Категория</td>
            <td>{clientData.drivingLicense.category}</td>
          </tr>
        </tbody>
      </Table>

      <Title order={2}>Комментарии</Title>
      <Textarea value={clientData.comments} readOnly />

      <Button variant="outline" mt="md">Редактировать</Button>
    </Container>
  );
};

export default ClientProfile;