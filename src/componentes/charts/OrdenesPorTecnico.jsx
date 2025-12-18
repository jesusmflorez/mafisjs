import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const OrdenesPorTecnico = () => {
  const [chartData, setChartData] = useState({
    labels: [],  // Nombres de técnicos
    datasets: [
      {
        label: 'Órdenes por técnico',
        data: [],
        backgroundColor: '#03A9F4',
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/ordenes')
      .then(res => res.json())
      .then(ordenes => {
        const tecnicoCount = {};
        ordenes.forEach(o => {
          tecnicoCount[o.tecnico] = (tecnicoCount[o.tecnico] || 0) + 1;
        });

        setChartData({
          labels: Object.keys(tecnicoCount),
          datasets: [
            {
              label: 'Órdenes por técnico',
              data: Object.values(tecnicoCount),
              backgroundColor: '#03A9F4',
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Órdenes por Técnico</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default OrdenesPorTecnico;
