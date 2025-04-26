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
  Menu,
  Checkbox,
  Divider,
  Badge,
  Flex
} from '@mantine/core';
import { vehicles } from '../data/vehiclesData';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconArrowsSort, IconFilter, IconX, IconChevronDown } from '@tabler/icons-react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  category: string;
  year: number;
  licensePlate: string;
}

type SortField = 'id' | 'brand' | 'model' | 'year';
type SortDirection = 'asc' | 'desc';

const VehiclesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({ field: 'id', direction: 'asc' });
  const itemsPerPage = 5;

  // Фильтры
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [filtersOpened, setFiltersOpened] = useState(false);

  const allBrands = Array.from(new Set(vehicles.map(v => v.brand))).sort();
  const allCategories = Array.from(new Set(vehicles.map(v => v.category))).sort();
  const allYears = Array.from(new Set(vehicles.map(v => v.year.toString()))).sort((a, b) => b.localeCompare(a));

  const loadDataFromDB = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setVehiclesData(vehicles);
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

  const sortedVehicles = [...vehiclesData].sort((a, b) => {
    switch (sortConfig.field) {
      case 'id':
        return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
      case 'brand':
        return sortConfig.direction === 'asc'
          ? a.brand.localeCompare(b.brand)
          : b.brand.localeCompare(a.brand);
      case 'model':
        return sortConfig.direction === 'asc'
          ? a.model.localeCompare(b.model)
          : b.model.localeCompare(a.model);
      case 'year':
        return sortConfig.direction === 'asc' ? a.year - b.year : b.year - a.year;
      default:
        return 0;
    }
  });

  const filteredVehicles = sortedVehicles.filter(vehicle => {
    const matchesSearch = `${vehicle.brand} ${vehicle.model} ${vehicle.licensePlate}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(vehicle.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(vehicle.category);
    const matchesYear = selectedYears.length === 0 || selectedYears.includes(vehicle.year.toString());
    
    return matchesSearch && matchesBrand && matchesCategory && matchesYear;
  });

  const paginatedVehicles = filteredVehicles.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleVehicleClick = (vehicleId: number) => {
    navigate(`/cars/${vehicleId}`); // Изменено на /cars/:id
  };

  const handleAddVehicle = () => {
    navigate('/cars/add'); // Изменено на /cars/add
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedYears([]);
    setSearch('');
    setFiltersOpened(false);
  };

  const hasFilters = selectedBrands.length > 0 || selectedCategories.length > 0 || selectedYears.length > 0 || search;
  const activeFiltersCount = selectedBrands.length + selectedCategories.length + selectedYears.length;

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode; }) => (
    <Table.Th 
      style={{ cursor: 'pointer', paddingLeft: rem(16), paddingRight: rem(16) }}
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
          <Title order={2}>Автопарк</Title>
          <Button 
            leftSection={<IconPlus size="1rem" />}
            onClick={handleAddVehicle} // Используем новую функцию
            variant="filled"
          >
            Добавить автомобиль
          </Button>
        </Group>

        <Flex gap="md" mb="md" align="flex-end">
          <TextInput
            placeholder="Поиск автомобиля"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            style={{ flex: 1 }}
          />
          
          <Menu 
            position="bottom-end"
            width={300}
            opened={filtersOpened}
            onChange={setFiltersOpened}
            closeOnClickOutside={false}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <Button 
                variant={hasFilters ? 'light' : 'outline'}
                leftSection={<IconFilter size="1rem" />}
                rightSection={<IconChevronDown size="1rem" />}
                onClick={() => setFiltersOpened((o) => !o)}
              >
                Фильтры
                {activeFiltersCount > 0 && (
                  <Badge ml={5} circle>
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Бренд</Menu.Label>
              <Box px="sm" mih={150} style={{ overflowY: 'auto' }}>
                {allBrands.map(brand => (
                  <Menu.Item key={brand} p={0} closeMenuOnClick={false}>
                    <Checkbox
                      label={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => 
                        setSelectedBrands(prev => 
                          prev.includes(brand) 
                            ? prev.filter(b => b !== brand) 
                            : [...prev, brand]
                        )
                      }
                      w="100%"
                      py="xs"
                    />
                  </Menu.Item>
                ))}
              </Box>

              <Divider />

              <Menu.Label>Категория</Menu.Label>
              <Box px="sm" mih={120} style={{ overflowY: 'auto' }}>
                {allCategories.map(category => (
                  <Menu.Item key={category} p={0} closeMenuOnClick={false}>
                    <Checkbox
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => 
                        setSelectedCategories(prev => 
                          prev.includes(category) 
                            ? prev.filter(c => c !== category) 
                            : [...prev, category]
                        )
                      }
                      w="100%"
                      py="xs"/>
                  </Menu.Item>
                ))}
              </Box>

              <Divider />

              <Menu.Label>Год выпуска</Menu.Label>
              <Box px="sm" mih={120} style={{ overflowY: 'auto' }}>
                {allYears.map(year => (
                  <Menu.Item key={year} p={0} closeMenuOnClick={false}>
                    <Checkbox
                      label={year}
                      checked={selectedYears.includes(year)}
                      onChange={() => 
                        setSelectedYears(prev => 
                          prev.includes(year) 
                            ? prev.filter(y => y !== year) 
                            : [...prev, year]
                        )
                      }
                      w="100%"
                      py="xs"
                    />
                  </Menu.Item>
                ))}
              </Box>

              <Divider />

              <Menu.Item 
                onClick={resetFilters}
                disabled={!hasFilters}
                leftSection={<IconX size="1rem" />}
                closeMenuOnClick={true}
              >
                Сбросить все фильтры
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>

        <Table
          striped
          highlightOnHover
          withColumnBorders
          horizontalSpacing="md"
          verticalSpacing="sm"
        >
          <colgroup>
            <col style={{ width: rem(80) }} />
            <col style={{ width: rem(180) }} />
            <col style={{ width: rem(180) }} />
            <col style={{ width: rem(150) }} />
            <col style={{ width: rem(120) }} />
            <col style={{ width: rem(150) }} />
          </colgroup>
          <Table.Thead>
            <Table.Tr>
              <SortableHeader field="id">
                <Box ta="center">ID</Box>
              </SortableHeader>
              <SortableHeader field="brand">Марка</SortableHeader>
              <SortableHeader field="model">Модель</SortableHeader>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Категория</Table.Th>
              <SortableHeader field="year">Год выпуска</SortableHeader>
              <Table.Th style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>Госномер</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedVehicles.length > 0 ? (
              paginatedVehicles.map(vehicle => (
                <Table.Tr key={vehicle.id}>
                  <Table.Td style={{ textAlign: 'center', paddingLeft: rem(16), paddingRight: rem(16) }}>
                    {vehicle.id}
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>
                    <Anchor
                      component="button"
                      type="button"
                      onClick={() => handleVehicleClick(vehicle.id)}
                      c="blue"
                      underline="never"
                    >
                      {vehicle.brand}
                    </Anchor>
                  </Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{vehicle.model}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{vehicle.category}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{vehicle.year}</Table.Td>
                  <Table.Td style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>{vehicle.licensePlate}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                  {vehiclesData.length === 0 ? 'Загрузка данных...' : 'Автомобили не найдены'}
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {filteredVehicles.length > 0 && (
          <Center mt="md">
            <Pagination
              total={Math.ceil(filteredVehicles.length / itemsPerPage)}
              value={activePage}
              onChange={setActivePage}
            />
          </Center>
        )}
      </Box>
    </Container>
  );
};

export default VehiclesPage;