import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ClientAddPage } from "./pages/AddClient.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { DashboardPage } from "./pages/Dashboard.tsx";
import AddCarPage from "./pages/AddCar.tsx";
import CarProfile from "./pages/Car.tsx";
import CreateRequest from "./pages/AddZaya2.tsx";
import { AppLayout } from "./components/AppLayout.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
  <BrowserRouter>
    <Routes>
    <Route element={<AppLayout/>}>
      <Route path="add-client" element = {<ClientAddPage/>}/>
      <Route path="dashboard" element = {<DashboardPage/>}/>
      <Route path="add-car" element = {<AddCarPage/>}/>
      <Route path="car" element = {<CarProfile/>}/>
      <Route path="create-request" element = {<CreateRequest/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </MantineProvider>
);
