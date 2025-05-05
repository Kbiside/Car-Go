import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { AppLayout } from "./components/AppLayout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { DashboardPage } from "./pages/Dashboard.tsx";
import { ClientAddPage } from "./pages/client/AddClient.tsx";
import AddCarPage from "./pages/car/AddCar.tsx";
import CarProfile from "./pages/car/Car.tsx";
import ClientsPage from "./pages/client/Client.tsx";
import EmployeesPage from "./pages/sotr/sotr.tsx";
import AddEmployee from "./pages/sotr/AddSotr.tsx";
import VehiclesPage from "./pages/car/Vehicle.tsx";
import ClientProfilePage from "./pages/client/ProfileClient.tsx";
import EmployeeProfilePage from "./pages/sotr/sotrProfile.tsx";
import CreateRequest from "./pages/Zayavki/AddZaya2.tsx";
import RequestsPage from "./pages/Zayavki/Zaya.tsx";
import OrderCardPage from "./pages/Zayavki/zayaProfile.tsx";
import FeedbackPage from "./pages/sviaz/sviaz.tsx";
import EditCarPage from "./pages/car/EditCar.tsx";
import EditClientPage from "./pages/client/EditClient.tsx";
import EditEmployeePage from "./pages/sotr/EditSotr.tsx";
import EditRequestPage from "./pages/Zayavki/EditZaya.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, 
  },
  {
    element: (
        <AppLayout />
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
        handle: { crumb: "Дашборд" }
      },
      {
        path: "feedback",
        element: <FeedbackPage />,
        handle: { crumb: "Обратная связь" }
      },
      {
        path: "clients",
        handle: { crumb: "Клиенты" },
        children: [
          { index: true, element: <ClientsPage /> },
          { 
            path: "add", 
            element: <ClientAddPage />,
            handle: { crumb: "Добавить клиента" }
          },
          { 
            path: ":id", 
            element: <ClientProfilePage />,
            handle: { crumb: "Профиль клиента" }
          },
          { 
            path: "edit", 
            element: <EditClientPage />,
            handle: { crumb: "Редактировать профиль клиента" }
          }
        ]
      },
      {
        path: "cars",
        handle: { crumb: "Автопарк" },
        children: [
          { index: true, element: <VehiclesPage /> },
          { 
            path: "add", 
            element: <AddCarPage />,
            handle: { crumb: "Добавить авто" }
          },
          { 
            path: ":id", 
            element: <CarProfile />,
            handle: { crumb: "Карточка авто" }
          },
          { 
            path: "edit", 
            element: <EditCarPage />,
            handle: { crumb: "Редактировать авто" }
          }
        ]
      },
      {
        path: "requests",
        handle: { crumb: "Заказы" },
        children: [
          { index: true, element: <RequestsPage /> },
          { 
            path: "add", 
            element: <CreateRequest />,
            handle: { crumb: "Создать заказ" }
          },
          { 
            path: ":id", 
            element: <OrderCardPage />,
            handle: { crumb: "Карточка заказа" }
          },
          { 
            path: "edit", 
            element: <EditRequestPage />,
            handle: { crumb: "Редактировать заказ" }
          }
        ]
      },
      {
        path: "employees",
        handle: { crumb: "Сотрудники" },
        children: [
          { index: true, element: <EmployeesPage /> },
          { 
            path: "add", 
            element: <AddEmployee />,
            handle: { crumb: "Добавить сотрудника" }
          },
          { 
            path: ":id", 
            element: <EmployeeProfilePage />,
            handle: { crumb: "Профиль сотрудника" }
          },
          { 
            path: "edit", 
            element: <EditEmployeePage />,
            handle: { crumb: "Редактировать профиль сотрудника" }
          }
        ]
      },
    ]
  },
  { 
    path: "*", 
    element: <div>404 Not Found</div>,
    handle: { crumb: "Страница не найдена" }
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
    <RouterProvider router={router} />
  </MantineProvider>
);