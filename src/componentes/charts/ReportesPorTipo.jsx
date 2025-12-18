import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportesPorTipo = () => {
  const [chartData, setChartData] = useState({
    labels: ['Eléctrica', 'Mecánica', 'Software', 'Otros'],
    datasets: [
      {
        label: 'Cantidad de reportes',
        data: [0, 0, 0, 0],
        backgroundColor: ['#FF5722', '#03A9F4', '#9C27B0', '#FFC107']
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/reportes')
      .then(res => res.json())
      .then(reportes => {
        const tipoCount = { 'Eléctrica':0, 'Mecánica':0, 'Software':0, 'Otros':0 };
        reportes.forEach(r => {
          tipoCount[r.tipo] = (tipoCount[r.tipo] || 0) + 1;
        });

        setChartData({
          labels: ['Eléctrica', 'Mecánica', 'Software', 'Otros'],
          datasets: [
            {
              label: 'Cantidad de reportes',
              data: Object.values(tipoCount),
              backgroundColor: ['#FF5722', '#03A9F4', '#9C27B0', '#FFC107']
            }
          ]
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Reportes por Tipo de Falla</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default ReportesPorTipo;
