import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const OrdenesPorEstado = () => {
  const [chartData, setChartData] = useState({
    labels: ['Pendientes', 'En ejecución', 'Finalizadas', 'Vencidas'],
    datasets: [
      {
        label: 'Órdenes por estado',
        data: [0, 0, 0, 0],
        backgroundColor: ['#FF9800', '#2196F3', '#4CAF50', '#F44336'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/ordenes')
      .then(res => res.json())
      .then(ordenes => {
        const pendientes = ordenes.filter(o => o.estado === 'Pendiente').length;
        const ejecucion = ordenes.filter(o => o.estado === 'En ejecución').length;
        const finalizadas = ordenes.filter(o => o.estado === 'Finalizada').length;
        const vencidas = ordenes.filter(o => o.estado === 'Vencida').length;

        setChartData({
          labels: ['Pendientes', 'En ejecución', 'Finalizadas', 'Vencidas'],
          datasets: [
            {
              label: 'Órdenes por estado',
              data: [pendientes, ejecucion, finalizadas, vencidas],
              backgroundColor: ['#FF9800', '#2196F3', '#4CAF50', '#F44336'],
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Órdenes por Estado</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default OrdenesPorEstado;
