export interface Order {
    id: number;
    customerName: string;
    carBrand: string;
    carModel: string;
    startDate: string;
    endDate: string;
    licensePlate: string;
}
export const orders: Order[] = [
    {
      id: 1,
      customerName: "Иванов Иван Иванович",
      carBrand: "Toyota",
      carModel: "Camry",
      startDate: "2023-10-15",
      endDate: "2023-10-20",
      licensePlate: "А123БВ777"
    },
    {
      id: 2,
      customerName: "Петров Петр Петрович",
      carBrand: "BMW",
      carModel: "X5",
      startDate: "2023-10-12",
      endDate: "2023-10-18",
      licensePlate: "В456ТУ777"
    },
    {
      id: 3,
      customerName: "Сидорова Анна Михайловна",
      carBrand: "Audi",
      carModel: "A4",
      startDate: "2023-10-20",
      endDate: "2023-10-25",
      licensePlate: "Е789КХ777"
    },
    {
      id: 4,
      customerName: "Кузнецов Дмитрий Сергеевич",
      carBrand: "Mercedes-Benz",
      carModel: "E-Class",
      startDate: "2023-10-22",
      endDate: "2023-10-28",
      licensePlate: "О321РС777"
    },
    {
      id: 5,
      customerName: "Смирнова Елена Викторовна",
      carBrand: "Lexus",
      carModel: "RX",
      startDate: "2023-10-18",
      endDate: "2023-10-24",
      licensePlate: "Н654ТУ777"
    },
    {
      id: 6,
      customerName: "Васильев Алексей Николаевич",
      carBrand: "Volkswagen",
      carModel: "Tiguan",
      startDate: "2023-10-25",
      endDate: "2023-10-30",
      licensePlate: "М987АВ777"
    },
    {
      id: 7,
      customerName: "Николаева Ольга Дмитриевна",
      carBrand: "Hyundai",
      carModel: "Solaris",
      startDate: "2023-10-28",
      endDate: "2023-11-03",
      licensePlate: "Р159ОК777"
    },
    {
      id: 8,
      customerName: "Федоров Сергей Иванович",
      carBrand: "Kia",
      carModel: "Rio",
      startDate: "2023-10-30",
      endDate: "2023-11-05",
      licensePlate: "С753УК777"
    },
    {
      id: 9,
      customerName: "Морозова Татьяна Александровна",
      carBrand: "Skoda",
      carModel: "Octavia",
      startDate: "2023-11-01",
      endDate: "2023-11-07",
      licensePlate: "У456АВ777"
    },
    {
      id: 10,
      customerName: "Белов Андрей Владимирович",
      carBrand: "Ford",
      carModel: "Focus",
      startDate: "2023-11-05",
      endDate: "2023-11-10",
      licensePlate: "Х321КН777"
    }
  ];