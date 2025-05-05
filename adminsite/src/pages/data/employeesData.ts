export interface Employee {
    id: number;
    name: string;
    phone: string;
    email: string;
    position: string;
  }
  
  export const employees: Employee[] = [
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'ivanov@example.com',
      position: 'Генеральный директор'
    },
    {
      id: 2,
      name: 'Петрова Анна Сергеевна',
      phone: '+7 (999) 234-56-78',
      email: 'petrova@example.com',
      position: 'Автосервисный менеджер'
    },
    {
      id: 3,
      name: 'Сидоров Дмитрий Петрович',
      phone: '+7 (999) 345-67-89',
      email: 'sidorov@example.com',
      position: 'Менеджер по продажам'
    },
  ];