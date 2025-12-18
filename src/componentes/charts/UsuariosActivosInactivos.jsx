import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const UsuariosActivosInactivos = () => {
  const [chartData, setChartData] = useState({
    labels: ['Activos', 'Inactivos'],
    datasets: [
      {
        label: 'Usuarios',
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/usuarios')
      .then(res => res.json())
      .then(usuarios => {
        const activos = usuarios.filter(u => u.estado === 'Activo').length;
        const inactivos = usuarios.filter(u => u.estado === 'Inactivo').length;

        setChartData({
          labels: ['Activos', 'Inactivos'],
          datasets: [
            {
              label: 'Usuarios',
              data: [activos, inactivos],
              backgroundColor: ['#4CAF50', '#F44336'],
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Usuarios Activos vs Inactivos</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default UsuariosActivosInactivos;
