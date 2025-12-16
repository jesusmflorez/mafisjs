import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const UsuariosPorRol = () => {
  const [chartData, setChartData] = useState({
    labels: ['Administrador', 'Técnico', 'Solicitante'],
    datasets: [
      {
        label: 'Usuarios por rol',
        data: [0, 0, 0],
        backgroundColor: ['#9C27B0', '#2196F3', '#FF9800'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/usuarios')
      .then(res => res.json())
      .then(usuarios => {
        const admin = usuarios.filter(u => u.rol === 'Administrador').length;
        const tecnico = usuarios.filter(u => u.rol === 'Técnico').length;
        const solicitante = usuarios.filter(u => u.rol === 'Solicitante').length;

        setChartData({
          labels: ['Administrador', 'Técnico', 'Solicitante'],
          datasets: [
            {
              label: 'Usuarios por rol',
              data: [admin, tecnico, solicitante],
              backgroundColor: ['#9C27B0', '#2196F3', '#FF9800'],
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ChartsItem">
      <h3>Usuarios por Rol</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default UsuariosPorRol;
