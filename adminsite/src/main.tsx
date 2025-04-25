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
import ClientProfile from "./pages/client/ProfileClient.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
  <BrowserRouter>
  <Routes>
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Клиенты */}
        <Route path="clients">
          <Route index element={<ClientsPage />} />
          <Route path="add" element={<ClientAddPage />} />
          <Route path=":id" element={<ClientProfile />} />
        </Route>
        
        {/* Автопарк */}
        <Route path="cars">
          <Route index element={<div>Список автомобилей</div>} /> {/* Замените на ваш компонент */}
          <Route path="add" element={<AddCarPage />} />
          <Route path=":id" element={<CarProfile />} />
        </Route>
        
        
        {/* Резервные маршруты */}
        <Route path="/" element={<DashboardPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </MantineProvider>
);
