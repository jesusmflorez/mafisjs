import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportesPorEstado = () => {
  const [chartData, setChartData] = useState({
    labels: ['Abiertos', 'En proceso', 'Cerrados'],
    datasets: [
      {
        label: 'Estado de los reportes',
        data: [0, 0, 0],
        backgroundColor: ['#FF9800', '#2196F3', '#4CAF50'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/reportes')
      .then(res => {
        if (!res.ok) throw new Error('Error al traer los reportes');
        return res.json();
      })
      .then(reportes => {
        const abiertos = reportes.filter(r => r.estado === 'Abierto').length;
        const enProceso = reportes.filter(r => r.estado === 'En proceso').length;
        const cerrados = reportes.filter(r => r.estado === 'Cerrado').length;

        setChartData({
          labels: ['Abiertos', 'En proceso', 'Cerrados'],
          datasets: [
            {
              label: 'Estado de los reportes',
              data: [abiertos, enProceso, cerrados],
              backgroundColor: ['#FF9800', '#2196F3', '#4CAF50'],
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Reportes por Estado</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default ReportesPorEstado;
