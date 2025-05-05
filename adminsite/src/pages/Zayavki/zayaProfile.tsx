import { 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Container,
  Paper,
  Checkbox,
  Anchor
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

export default function OrderCardPage() {
  const navigate = useNavigate();
  
  // Данные заказа
  const orderData = {
      orderId: '34562', // Изменено для использования в URL
      car: {
          model: 'Audi A4, 2019, Black',
          registrationNumber: 'A567PH',
          registrationNumberLink: '/cars/1', 
          childSeat: true
      },
      customer: {
          fullName: 'Смирнова Анна Сергеевна',
          customerId: '937601',
          passport: '123456789',
          birthDate: '12.02.1983',
          license: '123456789',
          licenseIssueDate: '23.11.2020',
          phone: '89025834789',
          email: 'petrovav@yandex.ru'
      },
      employee: {
          fullName: 'Иванов Иван Иванович',
          employeeId: '12345' 
      },
      orderDetails: {
          startDate: '01.02.2025',
          endDate: '06.02.2025',
          price: '40.000',
          comment: 'текст комментария'
      }
  };

  // Обработчик клика по кнопке редактирования
  const handleEditClick = () => {
      navigate(`/requests/edit`);
  };

  return (
      <Container size="lg" py="md">
          <Stack gap="xl">
              <Title order={1} ta="center">
                  Карточка заказа
              </Title>
              
              <Text size="md" ta="center" c="dimmed">
                  ID {orderData.orderId}
              </Text>

              {/* Информация об автомобиле */}
              <Paper p="md" shadow="sm" radius="md">
                  <Title order={2} mb="sm">
                      Автомобиль
                  </Title>
                  <Stack gap="xs">
                      <Text size="md">Модель: {orderData.car.model}</Text>
                      <Text size="md">
                          Регистрационный номер:{' '}
                          <Anchor component={Link} to={orderData.car.registrationNumberLink}>
                              {orderData.car.registrationNumber}
                          </Anchor>
                      </Text>
                      <Checkbox 
                          label="Детское кресло" 
                          checked={orderData.car.childSeat} 
                          readOnly
                      />
                  </Stack>
              </Paper>

              {/* Данные о заказчике */}
              <Paper p="md" shadow="sm" radius="md">
                  <Title order={2} mb="sm">
                      Данные о заказчике
                  </Title>
                  <Stack gap="xs">
                      <Text size="md">
                          ФИО:{' '}
                          <Anchor component={Link} to={`/clients/${orderData.customer.customerId}`}>
                              {orderData.customer.fullName}
                          </Anchor>
                      </Text>
                      <Text size="md">Серия и номер паспорта: {orderData.customer.passport}</Text>
                      <Text size="md">Дата рождения: {orderData.customer.birthDate}</Text>
                      <Text size="md">Серия и номер ВУ: {orderData.customer.license}</Text>
                      <Text size="md">Дата выдачи ВУ: {orderData.customer.licenseIssueDate}</Text>
                      <Text size="md">Номер телефона: {orderData.customer.phone}</Text>
                      <Text size="md">Электронная почта: {orderData.customer.email}</Text>
                  </Stack>
              </Paper>

              {/* Данные о сотруднике */}
              <Paper p="md" shadow="sm" radius="md">
                  <Title order={2} mb="sm">
                      Данные о сотруднике
                  </Title>
                  <Text size="md">
                      ФИО:{' '}
                      <Anchor component={Link} to={`/employees/${orderData.employee.employeeId}`}>
                          {orderData.employee.fullName}
                      </Anchor>
                  </Text>
              </Paper>

              {/* Данные о заказе */}
              <Paper p="md" shadow="sm" radius="md">
                  <Title order={2} mb="sm">
                      Данные о заказе
                  </Title>
                  <Stack gap="xs">
                      <Text size="md">Дата начала: {orderData.orderDetails.startDate}</Text>
                      <Text size="md">Дата конца: {orderData.orderDetails.endDate}</Text>
                      <Text size="md">Стоимость: {orderData.orderDetails.price} ₽</Text>
                      <Text size="md">Комментарий: {orderData.orderDetails.comment}</Text>
                  </Stack>
              </Paper>

              <Group justify="flex-end">
                  <Button 
                      leftSection={<IconEdit size="1rem" />} 
                      variant="outline"
                      onClick={handleEditClick}
                  >
                      Редактировать
                  </Button>
              </Group>
          </Stack>
      </Container>
  );
}