import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { SimpleGrid, Title, Paper } from '@mantine/core'; // Removí 'Group' que no se usaba

// URL de nuestro backend
const API_URL = 'http://localhost:8000';

// Helper para procesar los datos de las matrices para el heatmap de Plotly
const processMatrixData = (data, labelKey) => {
  if (data.length === 0) {
    return { x: [], y: [], z: [] };
  }
  const headers = Object.keys(data[0]).filter(k => k !== labelKey);
  const y_labels = data.map(row => row[labelKey]);
  const z_values = data.map(row => headers.map(header => row[header]));
  return { x: headers, y: y_labels, z: z_values };
};

function PosoDashboard() {
  // Estados para todos nuestros datos
  const [volatilidad, setVolatilidad] = useState([]);
  const [predicciones, setPredicciones] = useState([]);
  const [matrizPrecio, setMatrizPrecio] = useState([]);
  const [matrizCosto, setMatrizCosto] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  // useEffect para pedir TODOS los datos al cargar
  useEffect(() => {
    axios.get(`${API_URL}/api/poso/volatilidad`).then(res => setVolatilidad(res.data));
    axios.get(`${API_URL}/api/poso/predicciones-co2`).then(res => setPredicciones(res.data));
    axios.get(`${API_URL}/api/poso/matriz-precio`).then(res => setMatrizPrecio(res.data));
    axios.get(`${API_URL}/api/poso/matriz-costo`).then(res => setMatrizCosto(res.data));
    axios.get(`${API_URL}/api/poso/estadisticas`).then(res => setEstadisticas(res.data));
  }, []); 

  // Procesamos los datos para los heatmaps
  const heatmapPrecioData = processMatrixData(matrizPrecio, 'PRECIO POR LT');
  const heatmapCostoData = processMatrixData(matrizCosto, 'Costo por KM');

  return (
    <div>
      <Title order={2} align="center" mb="xl" c="blue.8">Análisis de Operaciones (POSO)</Title>

      {/* --- Fila 1 de Gráficos --- */}
      <SimpleGrid cols={2} spacing="xl" mb="xl">
        <Paper withBorder shadow="md" p="md" style={{ minHeight: 400 }}> {/* Altura Mínima */}
          <Plot
            data={[{ x: volatilidad.map(d => d.Fecha), y: volatilidad.map(d => d.Volatilidad_PRECIO_POR_LT), type: 'scatter', mode: 'lines+markers', marker: { color: '#0014dc' } }]}
            layout={{ title: 'Volatilidad de Precio (Lts)' }}
            style={{ width: '100%', height: '100%' }} useResizeHandler
          />
        </Paper>
        <Paper withBorder shadow="md" p="md" style={{ minHeight: 400 }}> {/* Altura Mínima */}
          <Plot
            data={[
              { x: predicciones.map(d => d.Fecha), y: predicciones.map(d => d['KG CO2 real']), name: 'Real', type: 'scatter' },
              { x: predicciones.map(d => d.Fecha), y: predicciones.map(d => d['KG CO2 predicho']), name: 'Predicho', type: 'scatter', line: { dash: 'dash' } },
            ]}
            layout={{ title: 'CO₂: Real vs. Predicho' }}
            style={{ width: '100%', height: '100%' }} useResizeHandler
          />
        </Paper>
      </SimpleGrid>

      {/* --- Fila 2 de Gráficos --- */}
      <SimpleGrid cols={2} spacing="xl" mb="xl">
        <Paper withBorder shadow="md" p="md" style={{ minHeight: 400 }}> {/* Altura Mínima */}
          <Plot
            data={[{ ...heatmapPrecioData, type: 'heatmap', colorscale: 'Blues', reversescale: true }]}
            layout={{ title: 'Matriz de Transición (Precio)' }}
            style={{ width: '100%', height: '100%' }} useResizeHandler
          />
        </Paper>
        <Paper withBorder shadow="md" p="md" style={{ minHeight: 400 }}> {/* Altura Mínima */}
          <Plot
            data={[{ ...heatmapCostoData, type: 'heatmap', colorscale: 'Blues', reversescale: true }]}
            layout={{ title: 'Matriz de Transición (Costo)' }}
            style={{ width: '100%', height: '100%' }} useResizeHandler
          />
        </Paper>
      </SimpleGrid>
      
      {/* --- Gráfico de Ancho Completo --- */}
      <Paper withBorder shadow="md" p="md" style={{ minHeight: 450 }}> {/* Altura Mínima */}
        <Plot
          data={[
            { type: 'bar', name: 'Media', x: estadisticas.map(d => d.Horizonte), y: estadisticas.map(d => d.Media) },
            { type: 'bar', name: 'Máximo', x: estadisticas.map(d => d.Horizonte), y: estadisticas.map(d => d.Máximo) },
            { type: 'bar', name: 'Mínimo', x: estadisticas.map(d => d.Horizonte), y: estadisticas.map(d => d.Mínimo) },
          ]}
          layout={{ title: 'Estadísticas de Simulación', barmode: 'group' }}
          style={{ width: '100%', height: '100%' }} useResizeHandler
        />
      </Paper>
    </div>
  );
}

export default PosoDashboard;