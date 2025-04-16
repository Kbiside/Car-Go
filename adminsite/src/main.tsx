import "@mantine/core/styles.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ClientAddPage } from "./pages/AddClient.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { DashboardPage } from "./pages/Dashboard.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
  <BrowserRouter>
    <Routes>
      <Route path="addclient" element = {<ClientAddPage/>}/>
      <Route path="dashboard" element = {<DashboardPage/>}/>
    </Routes>
  </BrowserRouter>
  </MantineProvider>
);
