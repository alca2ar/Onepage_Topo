import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { SimpleGrid, Title, Paper, Table, Badge, ScrollArea } from '@mantine/core';

// URL de nuestro backend
const API_URL = 'http://localhost:8000';

function TagsDashboard() {
  // 1. Estados para almacenar los datos de la API
  const [summary, setSummary] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [comparison, setComparison] = useState([]);

  // 2. useEffect para pedir todos los datos cuando el componente se carga
  useEffect(() => {
    // Pedir resumen de clusters
    axios.get(`${API_URL}/api/tags/cluster-summary`)
      .then(response => setSummary(response.data))
      .catch(error => console.error("Error fetching cluster summary:", error));

    // Pedir recomendaciones
    axios.get(`${API_URL}/api/tags/recommendations`)
      .then(response => setRecommendations(response.data))
      .catch(error => console.error("Error fetching recommendations:", error));
      
    // Pedir comparación numérica
    axios.get(`${API_URL}/api/tags/numerical-comparison`)
      .then(response => setComparison(response.data))
      .catch(error => console.error("Error fetching numerical comparison:", error));

  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // Función para asignar colores a las prioridades en la tabla de recomendaciones
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'alta': return 'red';
      case 'media': return 'orange';
      case 'bajo': return 'green'; // Corregido de "Baja" a "Bajo" para coincidir con los datos
      default: return 'gray';
    }
  };

  // 3. Renderizado de los componentes visuales
  return (
    <div>
      <Title order={2} align="center" mb="xl" c="blue.8">Análisis de Clusters y Recomendaciones (TAGS)</Title>

      {/* --- Gráficos Principales --- */}
      <SimpleGrid cols={2} spacing="xl" mb="xl">
        <Paper withBorder shadow="md" p="md">
          <Plot
            data={[
              {
                values: summary.map(d => d.percentage),
                labels: summary.map(d => `Cluster ${d.cluster_id}`),
                type: 'pie',
                hole: 0.4,
                textinfo: 'percent+label',
              },
            ]}
            layout={{ title: 'Distribución de Viajes por Cluster (%)' }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler
          />
        </Paper>
        <Paper withBorder shadow="md" p="md">
          <Plot
            data={[
              {
                x: summary.map(d => `Cluster ${d.cluster_id}`),
                y: summary.map(d => d.CO2_por_KM_mean),
                type: 'bar',
                marker: { color: '#0014dc' },
              },
            ]}
            layout={{ title: 'Emisiones de CO2 Promedio por Cluster', yaxis: {title: 'CO2 por KM (Promedio)'} }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler
          />
        </Paper>
      </SimpleGrid>

      {/* --- Tabla de Recomendaciones --- */}
      <Title order={3} mb="md" c="blue.7">Recomendaciones y Acciones Priorizadas</Title>
      <Paper withBorder shadow="md" p="md" mb="xl">
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Acción Específica</th>
                <th>Impacto Esperado</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((row, index) => (
                <tr key={index}>
                  <td>{row.variable}</td>
                  <td>{row.specific_action}</td>
                  <td>{row.expected_impact}</td>
                  <td>
                    <Badge color={getPriorityColor(row.priority)} variant="filled">
                      {row.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
      
      {/* --- Tabla de Comparación Numérica --- */}
      <Title order={3} mb="md" c="blue.7">Comparación Numérica Detallada de Clusters</Title>
      <Paper withBorder shadow="md" p="md">
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Media Cluster A</th>
                <th>Media Cluster B</th>
                <th>Diferencia</th>
                <th>P-Value</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, index) => (
                <tr key={index}>
                  <td>{row.variable}</td>
                  <td>{row.cluster_a_mean.toFixed(4)}</td>
                  <td>{row.cluster_b_mean.toFixed(4)}</td>
                  <td>{row.difference.toFixed(4)}</td>
                  <td>{row.p_value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </div>
  );
}

export default TagsDashboard;