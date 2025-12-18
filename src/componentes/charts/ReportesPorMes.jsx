import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportesPorMes = () => {
  const [chartData, setChartData] = useState({
    labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    datasets: [
      {
        label: 'Reportes por mes',
        data: Array(12).fill(0),
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        fill: true,
        tension: 0.4
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/reportes')
      .then(res => res.json())
      .then(reportes => {
        const meses = Array(12).fill(0);
        reportes.forEach(r => {
          const fecha = new Date(r.fecha); // asumiendo r.fecha tiene formato YYYY-MM-DD
          meses[fecha.getMonth()] += 1;
        });

        setChartData({
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: meses
            }
          ]
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Reportes por Mes</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ReportesPorMes;
