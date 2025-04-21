import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { Header } from '../components/header';
import { Navbar } from '../components/navbar';
import { Outlet } from 'react-router';

export function AppLayout() {
  const theme = useMantineTheme();
  const [navbarOpened, setNavbarOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={{
        collapsed: false
      }}
    >
      <AppShell.Header>
      <Header
          onNavbarOpen={() => setNavbarOpened((o) => !o)}
        />
        </AppShell.Header>
        <AppShell.Navbar>
        <Navbar opened={navbarOpened} />
          </AppShell.Navbar>
          <AppShell.Main>
          <Outlet/>
          </AppShell.Main>
      
    </AppShell>
  );
}