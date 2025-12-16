import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const OrdenesVencidasVsTiempo = () => {
  const [chartData, setChartData] = useState({
    labels: ['Vencidas', 'A tiempo'],
    datasets: [
      {
        label: 'Órdenes',
        data: [0, 0],
        backgroundColor: ['#F44336', '#4CAF50'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/ordenes')
      .then(res => res.json())
      .then(ordenes => {
        const vencidas = ordenes.filter(o => o.estado === 'Vencida').length;
        const aTiempo = ordenes.filter(o => o.estado !== 'Vencida').length;

        setChartData({
          labels: ['Vencidas', 'A tiempo'],
          datasets: [
            {
              label: 'Órdenes',
              data: [vencidas, aTiempo],
              backgroundColor: ['#F44336', '#4CAF50'],
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Órdenes Vencidas vs A Tiempo</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default OrdenesVencidasVsTiempo;
