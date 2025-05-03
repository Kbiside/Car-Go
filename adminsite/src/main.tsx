import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ClientAddPage } from "./pages/client/AddClient.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { DashboardPage } from "./pages/Dashboard.tsx";
import AddCarPage from "./pages/car/AddCar.tsx";
import CarProfile from "./pages/car/Car.tsx";
import { AppLayout } from "./components/AppLayout.tsx";
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
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
  <BrowserRouter>
  <Routes>
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        {/* Клиенты */}
        <Route path="clients">
          <Route index element={<ClientsPage />} />
          <Route path="add" element={<ClientAddPage />} />
          <Route path=":id" element={<ClientProfilePage />} />
        </Route>
        {/* Автопарк */}
        <Route path="cars">
          <Route index element={<VehiclesPage />} /> 
          <Route path="add" element={<AddCarPage />} />
          <Route path=":id" element={<CarProfile />} />
        </Route>
        {/* Автопарк */}
        <Route path="requests">
          <Route index element={<RequestsPage/>} /> 
          <Route path="add" element={<CreateRequest />} />
          <Route path=":id" element={<OrderCardPage />} />
        </Route>
        <Route path="employees">
          <Route index element={<EmployeesPage />} /> 
          <Route path="add" element={<AddEmployee />} />
          <Route path=":id" element={<EmployeeProfilePage />} />
        </Route>
        {/* Резервные маршруты */}
        <Route path="/" element={<DashboardPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </MantineProvider>
);
