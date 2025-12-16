import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const UsuariosActividad = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Nombres de usuarios
    datasets: [
      {
        label: 'Actividad',
        data: [],
        backgroundColor: '#03A9F4',
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/usuarios')
      .then(res => res.json())
      .then(usuarios => {
        const actividadCount = {};
        usuarios.forEach(u => {
          // Supongamos u.reportes y u.ordenes son números
          actividadCount[u.nombre] = (u.reportes || 0) + (u.ordenes || 0);
        });

        setChartData({
          labels: Object.keys(actividadCount),
          datasets: [
            {
              label: 'Actividad de Usuarios',
              data: Object.values(actividadCount),
              backgroundColor: '#03A9F4',
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Actividad de Usuarios</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default UsuariosActividad;
