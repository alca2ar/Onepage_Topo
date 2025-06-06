import React from 'react';
import { MantineProvider, AppShell, Header, Title, Image } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PosoDashboard from './pages/PosoDashboard';
import TagsDashboard from './pages/TagsDashboard';
import Vision from './pages/Vision';
import Navigation from './components/Navigation';
import logo from './SLB_logo.png'; // Asegúrate de tener tu logo en la carpeta src

function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light', primaryColor: 'blue' }}>
        <AppShell
          padding="md"
          header={
            <Header height={60} p="xs" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0014dc', color: 'white' }}>
              <Image src={logo} alt="SLB Logo" width={40} height={40} mr="md" />
              <Title order={3}>Dashboard de Análisis de Datos de Transporte</Title>
            </Header>
          }
          navbar={<Navigation />}
        >
          <Routes>
            <Route path="/" element={<PosoDashboard />} />
            <Route path="/tags" element={<TagsDashboard />} />
            <Route path="/vision" element={<Vision />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;