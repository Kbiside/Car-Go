import {
    Table,
    TextInput,
    Pagination,
    Button,
    Container,
    Title,
  } from '@mantine/core';
  
  const ClientsPage = () => {
    const [search, setSearch] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [clientsData, setClientsData] = useState([]); // Начальное состояние - пустой массив
    const itemsPerPage = 5;
  
    const filteredClients = clientsData.filter(client =>
      client.name?.toLowerCase().includes(search.toLowerCase())
    );
  
    const paginatedClients = filteredClients.slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    );
  
    // Функция для загрузки данных (заглушка, которую вы замените на реальный запрос к БД)
    const loadDataFromDB = async () => {
      // Здесь будет ваш код для загрузки данных из базы данных
      // Например:
      // const data = await fetchClientsFromDatabase();
      // setClientsData(data);
    };
  
    return (
      <Container>
        <Title order={2}>Клиенты</Title>
        <TextInput
          placeholder="Поиск клиента"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          mb="md"
        />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.length > 0 ? (
              paginatedClients.map(client => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  Нет данных для отображения
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {filteredClients.length > 0 && (
          <Pagination
            total={Math.ceil(filteredClients.length / itemsPerPage)}
            page={activePage}
            onChange={setActivePage}
            mt="md"
          />
        )}
        <Button mt="md" onClick={loadDataFromDB}>
          Загрузить данные
        </Button>
      </Container>
    );
  };
  
  export default ClientsPage;