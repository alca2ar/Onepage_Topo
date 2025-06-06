import React from 'react';
import { Navbar, NavLink } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  return (
    <Navbar width={{ base: 200 }} p="xs">
      <NavLink label="Análisis POSO" component={Link} to="/" active={location.pathname === '/'} />
      <NavLink label="Análisis de Clusters (TAGS)" component={Link} to="/tags" active={location.pathname === '/tags'} />
      <NavLink label="Visión" component={Link} to="/vision" active={location.pathname === '/vision'} />
    </Navbar>
  );
}
export default Navigation;