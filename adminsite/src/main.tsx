import "@mantine/core/styles.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ClientAddPage } from "./pages/AddClient.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
  <BrowserRouter>
    <Routes>
      <Route path="dashboard" element = {<ClientAddPage/>}/>
    </Routes>
  </BrowserRouter>
  </MantineProvider>
);
