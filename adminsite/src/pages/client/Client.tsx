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
  rem,
  Notification
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconArrowsSort, IconX } from '@tabler/icons-react';
import { useFetch } from '@mantine/hooks';
import api from '/api/clients';

interface Client {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  birthDate?: string;
  gender?: string;
}

type SortField = 'id' | 'fullName';
type SortDirection = 'asc' | 'desc';

const ClientsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({ field: 'id', direction: 'asc' });
  const itemsPerPage = 10;

  // Загрузка данных с бэкенда
  const { data: clientsData = [], loading, error: fetchError } = useFetch(api.getAllClients);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message || 'Ошибка загрузки данных');
    }
  }, [fetchError]);

  const handleSort = (field: SortField) => {
    setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedClients = [...clientsData].sort((a, b) => {
    if (sortConfig.field === 'id') {
      return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
    } else {
      return sortConfig.direction === 'asc'
        ? (a.fullName || '').localeCompare(b.fullName || '')
        : (b.fullName || '').localeCompare(a.fullName || '');
    }
  });

  const filteredClients = sortedClients.filter(client =>
    client.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    client.phone?.includes(search) ||
    client.email?.toLowerCase().includes(search.toLowerCase())
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
      {error && (
        <Notification 
          icon={<IconX size="1.1rem" />} 
          color="red" 
          title="Ошибка"
          onClose={() => setError(null)}
          mb="md"
        >
          {error}
        </Notification>
      )}

      <Box pos="relative">
        <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

        <Group justify="space-between" mb="sm" align="center">
          <Title order={2}>Клиенты</Title>
          <Button 
            leftSection={<IconPlus size="1rem" />}
            onClick={() => navigate('/clients/add')}
            variant="filled"
          >
            Добавить клиента
          </Button>
        </Group>

        <TextInput
          placeholder="Поиск по ФИО, телефону или email"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          mb="md"
          w="100%"
        />

        <Table
          striped
          highlightOnHover
          withColumnBorders
          horizontalSpacing="md"
          verticalSpacing="sm"
          layout="fixed"
        >
          <colgroup>
            <col style={{ width: '10%' }} /> {/* ID */}
            <col style={{ width: '30%' }} /> {/* ФИО */}
            <col style={{ width: '25%' }} /> {/* Телефон */}
            <col style={{ width: '35%' }} /> {/* Email */}
          </colgroup>
          <Table.Thead>
            <Table.Tr>
              <SortableHeader field="id">
                <Box ta="center">ID</Box>
              </SortableHeader>
              <SortableHeader field="fullName">ФИО</SortableHeader>
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
                      {client.fullName}
                    </Anchor>
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{client.phone}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>
                    {client.email || '-'}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                  {loading ? 'Загрузка данных...' : 'Клиенты не найдены'}
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