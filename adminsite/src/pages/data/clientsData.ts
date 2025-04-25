export interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
  }
  
  export const clients: Client[] = [
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'ivanov@example.com'
    },
    {
      id: 2,
      name: 'Петрова Анна Сергеевна',
      phone: '+7 (999) 234-56-78',
      email: 'petrova@example.com'
    },
    {
      id: 3,
      name: 'Сидоров Дмитрий Петрович',
      phone: '+7 (999) 345-67-89',
      email: 'sidorov@example.com'
    },
    // Добавьте больше клиентов по необходимости
  ];