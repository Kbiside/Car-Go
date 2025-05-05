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
import { orders } from '../data/ordersData';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconArrowsSort } from '@tabler/icons-react';

interface Request {
  id: number;
  customerName: string;
  carBrand: string;
  carModel: string;
  startDate: string;
  endDate: string;
  licensePlate: string;
}

type SortField = 'id' | 'customerName' | 'carBrand' | 'startDate' | 'endDate';
type SortDirection = 'asc' | 'desc';

const RequestsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [requestsData, setRequestsData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({ field: 'id', direction: 'asc' });
  const itemsPerPage = 5;

  const loadDataFromDB = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setRequestsData(orders);
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

  const sortedRequests = [...requestsData].sort((a, b) => {
    if (sortConfig.field === 'id') {
      return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
    } else {
      const aValue = a[sortConfig.field].toLowerCase();
      const bValue = b[sortConfig.field].toLowerCase();
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  const filteredRequests = sortedRequests.filter(request =>
    request.customerName.toLowerCase().includes(search.toLowerCase()) ||
    request.carBrand.toLowerCase().includes(search.toLowerCase()) ||
    request.carModel.toLowerCase().includes(search.toLowerCase()) ||
    request.licensePlate.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedRequests = filteredRequests.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleRequestClick = (requestId: number) => {
    navigate(`/requests/${requestId}`);
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

        <Group justify="space-between" mb="sm" align="center">
          <Title order={2}>Заказы</Title>
          <Button 
            leftSection={<IconPlus size="1rem" />}
            onClick={() => navigate('/requests/add')}
            variant="filled"
          >
            Добавить заявку
          </Button>
        </Group>

        <TextInput
          placeholder="Поиск заявки"
          value={search} onChange={(event) => setSearch(event.currentTarget.value)}
          mb="md"
          w="100%"
        />

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
            <col style={{ width: rem(150) }} />
            <col style={{ width: rem(150) }} />
            <col style={{ width: rem(120) }} />
            <col style={{ width: rem(120) }} />
            <col style={{ width: rem(120) }} />
          </colgroup>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ textAlign: 'center', paddingLeft: rem(16), paddingRight: rem(16) }}>
                ID
              </Table.Th>
              <SortableHeader field="customerName">ФИО клиента</SortableHeader>
              <SortableHeader field="carBrand">Марка авто</SortableHeader>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Модель авто</Table.Th>
              <SortableHeader field="startDate">Дата начала</SortableHeader>
              <SortableHeader field="endDate">Дата конца</SortableHeader>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Госномер</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map(request => (
                <Table.Tr key={request.id}>
                  <Table.Td style={{ textAlign: 'center', paddingLeft: rem(16), paddingRight: rem(16) }}>
                    <Anchor
                      component="button"
                      type="button"
                      onClick={() => handleRequestClick(request.id)}
                      c="blue"
                      underline="never"
                    >
                      {request.id}
                    </Anchor>
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{request.customerName}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{request.carBrand}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{request.carModel}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{request.startDate}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{request.endDate}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{request.licensePlate}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7} style={{ textAlign: 'center' }}>
                  {requestsData.length === 0 ? 'Загрузка данных...' : 'Заявки не найдены'}
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {filteredRequests.length > 0 && (
          <Center mt="md">
            <Pagination
              total={Math.ceil(filteredRequests.length / itemsPerPage)}
              value={activePage}
              onChange={setActivePage}
            />
          </Center>
        )}
      </Box>
    </Container>
  );
};

export default RequestsPage;