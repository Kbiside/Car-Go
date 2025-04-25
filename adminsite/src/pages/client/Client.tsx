import { useState, useEffect } from 'react';
import {
  Table,
  TextInput,
  Pagination,
  Button,
  Container,
  Title,
  LoadingOverlay,
  Box,
  Group,
  Center,
  Anchor,
  rem
} from '@mantine/core';
import { clients } from '../data/clientsData';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconArrowsSort } from '@tabler/icons-react';

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

type SortField = 'id' | 'name';
type SortDirection = 'asc' | 'desc';

const ClientsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({ field: 'id', direction: 'asc' });
  const itemsPerPage = 5;

  const loadDataFromDB = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setClientsData(clients);
    setLoading(false);
  };

  useEffect(() => {
    loadDataFromDB();
  }, []);

  const handleSort = (field: SortField) => {
    if (sortConfig.field === field) {
      setSortConfig({
        field,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ field, direction: 'asc' });
    }
  };

  const sortedClients = [...clientsData].sort((a, b) => {
    if (sortConfig.field === 'id') {
      return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
    } else {
      return sortConfig.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const filteredClients = sortedClients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedClients = filteredClients.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleClientClick = (clientId: number) => {
    navigate(`/clients/${clientId}`);
  };

  const SortableHeader = ({ 
    field, 
    children 
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <Table.Th 
      style={{ 
        cursor: 'pointer',
        paddingLeft: rem(16),
        paddingRight: rem(16)
      }}
      onClick={() => handleSort(field)}
    >
      <Group gap={4} wrap="nowrap">
        {children}
        <IconArrowsSort 
          style={{
            width: rem(16),
            height: rem(16),
            opacity: sortConfig.field === field ? 1 : 0.3,
            transform: sortConfig.field === field && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms ease, opacity 200ms ease'
          }}
        />
      </Group>
    </Table.Th>
  );

  return (
    <Container size="xl" py="md" pos="relative">
      <Box pos="relative">
        <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

        <Group justify="space-between" mb="md" align="center">
          <Title order={2}>Клиенты</Title>
          <Group>
            <TextInput
              placeholder="Поиск клиента"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              style={{ width: 300 }}
            />
            <Button 
              leftSection={<IconPlus size="1rem" />}
              onClick={() => navigate('/clients/add')}
              variant="filled"
            >
              Добавить клиента
            </Button>
          </Group>
        </Group>

        <Table
          striped
          highlightOnHover
          withColumnBorders
          horizontalSpacing="md"
          verticalSpacing="sm"
        >
          <colgroup>
            <col style={{ width: rem(80) }} />
            <col style={{ width: rem(250) }} />
            <col style={{ width: rem(180) }} />
            <col />
          </colgroup>
          <Table.Thead>
            <Table.Tr>
              <SortableHeader field="id">
                <Box ta="center">ID</Box>
              </SortableHeader>
              <SortableHeader field="name">ФИО</SortableHeader>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Телефон</Table.Th>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Email</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedClients.length > 0 ? (
              paginatedClients.map(client => (
                <Table.Tr key={client.id}>
                  <Table.Td style={{ textAlign: 'center', paddingLeft: rem(16), paddingRight: rem(16) }}>
                    {client.id}
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>
                    <Anchor
                      component="button"
                      type="button"
                      onClick={() => handleClientClick(client.id)}
                      c="blue"
                      underline="never"
                    >
                      {client.name}
                    </Anchor>
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{client.phone}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{client.email}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                  {clientsData.length === 0 ? 'Загрузка данных...' : 'Клиенты не найдены'}
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {filteredClients.length > 0 && (
          <Center mt="md">
            <Pagination
              total={Math.ceil(filteredClients.length / itemsPerPage)}
              value={activePage}
              onChange={setActivePage}
            />
          </Center>
        )}
      </Box>
    </Container>
  );
};

export default ClientsPage;