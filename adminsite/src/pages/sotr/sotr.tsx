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
import { employees } from '../data/employeesData';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconArrowsSort } from '@tabler/icons-react';

interface Employee {
  id: number;
  name: string;
  phone: string;
  position: string;
  email: string;
}

type SortField = 'id' | 'name';
type SortDirection = 'asc' | 'desc';

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({ field: 'id', direction: 'asc' });
  const itemsPerPage = 5;

  const loadDataFromDB = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setEmployeesData(employees);
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

  const sortedEmployees = [...employeesData].sort((a, b) => {
    if (sortConfig.field === 'id') {
      return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
    } else {
      return sortConfig.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleEmployeeClick = (employeeId: number) => {
    navigate(`/employees/${employeeId}`);
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
          <Title order={2}>Сотрудники</Title>
          <Group>
            <TextInput
              placeholder="Поиск сотрудника"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              style={{ width: 300 }}
            />
            <Button 
              leftSection={<IconPlus size="1rem" />}
              onClick={() => navigate('/employees/add')}
              variant="filled"
            >
              Добавить сотрудника
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
            <col style={{ width: rem(80)}} />
            <col style={{ width: rem(250) }} />
            <col style={{ width: rem(180) }} />
            <col style={{ width: rem(200) }} />
            <col />
          </colgroup>
          <Table.Thead>
            <Table.Tr>
              <SortableHeader field="id">
                <Box ta="center">ID</Box>
              </SortableHeader>
              <SortableHeader field="name">ФИО</SortableHeader>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Телефон</Table.Th>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Должность</Table.Th>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Email</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map(employee => (
                <Table.Tr key={employee.id}>
                  <Table.Td style={{ textAlign: 'center', paddingLeft: rem(16), paddingRight: rem(16) }}>
                    {employee.id}
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>
                    <Anchor
                      component="button"
                      type="button"
                      onClick={() => handleEmployeeClick(employee.id)}
                      c="blue"
                      underline="never"
                    >
                      {employee.name}
                    </Anchor>
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{employee.phone}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{employee.position}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{employee.email}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                  {employeesData.length === 0 ? 'Загрузка данных...' : 'Сотрудники не найдены'}
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {filteredEmployees.length > 0 && (
          <Center mt="md">
            <Pagination
              total={Math.ceil(filteredEmployees.length / itemsPerPage)}
              value={activePage}
              onChange={setActivePage}
            />
          </Center>
        )}
      </Box>
    </Container>
  );
};

export default EmployeesPage;