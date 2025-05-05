import { 
  Title,
  TextInput,
  Button,
  Group,
  Stack,
  Container,
  Paper,
  Box,
  SimpleGrid,
  Select,
  Textarea,
  LoadingOverlay
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';

interface Request {
  id: number;
  customerName: string;
  carBrand: string;
  carModel: string;
  startDate: string;
  endDate: string;
  licensePlate: string;
  status: string;
  comment?: string;
}

const carBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Volkswagen'];
const statusOptions = ['Новая', 'В обработке', 'Подтверждена', 'Отклонена', 'Завершена'];

export default function EditRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState<Request>({
    id: 0,
    customerName: '',
    carBrand: '',
    carModel: '',
    startDate: '',
    endDate: '',
    licensePlate: '',
    status: 'Новая',
    comment: ''
  });

  useEffect(() => {
    const fetchRequestData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockData = {
          id: Number(id),
          customerName: 'Иванов Иван Иванович',
          carBrand: 'Toyota',
          carModel: 'Camry',
          startDate: '2023-06-15',
          endDate: '2023-06-20',
          licensePlate: 'А123БВ777',
          status: 'В обработке',
          comment: 'Клиент просит детское кресло'
        };
        setRequestData(mockData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestData();
  }, [id]);

  const handleChange = (field: keyof Request, value: string) => {
    setRequestData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | null) => {
    if (date) {
      setRequestData(prev => ({ 
        ...prev, 
        [field]: date.toISOString().split('T')[0] 
      }));
    } else {
      setRequestData(prev => ({ 
        ...prev, 
        [field]: '' 
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Сохраненные данные:', requestData);
      navigate(`/requests/${requestData.id}`);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/requests/${requestData.id}`);
  };

  return (
    <Container size="lg" py="md" pos="relative">
      <Box pos="relative">
        <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

        <Stack gap="xl">
          <Title order={1} ta="center">
            Редактирование заказа 
          </Title>

          <Paper p="md" shadow="sm" radius="md">
            <SimpleGrid cols={2}>
              <TextInput
                label="ФИО клиента"
                value={requestData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
              />
              <Select
                label="Марка авто"
                data={carBrands}
                value={requestData.carBrand}
                onChange={(value) => handleChange('carBrand', value || '')}
                searchable
              />
              <TextInput
                label="Модель авто"
                value={requestData.carModel}
                onChange={(e) => handleChange('carModel', e.target.value)}
              />
              <TextInput
                label="Госномер"
                value={requestData.licensePlate}
                onChange={(e) => handleChange('licensePlate', e.target.value)}
              />
              <DateInput
                label="Дата начала"
                value={requestData.startDate ? new Date(requestData.startDate) : null}
                onChange={(date) => handleDateChange('startDate', date)}
                placeholder="Выберите дату"
                valueFormat="DD.MM.YYYY"
              />
              <DateInput
                label="Дата окончания"
                value={requestData.endDate ? new Date(requestData.endDate) : null}
                onChange={(date) => handleDateChange('endDate', date)}
                placeholder="Выберите дату"
                valueFormat="DD.MM.YYYY"
              />
              <Select
                label="Статус"
                data={statusOptions}
                value={requestData.status}
                onChange={(value) => handleChange('status', value || 'Новая')}
              />
            </SimpleGrid>
          </Paper>

          <Paper p="md" shadow="sm" radius="md">
            <Textarea
              label="Комментарий"
              value={requestData.comment || ''}
              onChange={(e) => handleChange('comment', e.target.value)}
              minRows={3}
              autosize
            />
          </Paper>

          <Group justify="flex-end">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              leftSection={<IconX size="1rem" />}
            >
              Отменить
            </Button>
            <Button 
              onClick={handleSave}
              leftSection={<IconCheck size="1rem" />}
            >
              Сохранить изменения
            </Button>
          </Group>
        </Stack>
      </Box>
    </Container>
  );
}