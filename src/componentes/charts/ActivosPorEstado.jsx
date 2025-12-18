// ActivosPorEstado.jsx
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const ActivosPorEstado = () => {
  const [chartData, setChartData] = useState({
    labels: ['Activo', 'Inactivo', 'Mantenimiento'],
    datasets: [
      {
        label: 'Estado de los activos',
        data: [0, 0, 0],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/activos') // fetch en lugar de axios
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al traer los activos');
        }
        return res.json();
      })
      .then((activos) => {
        const activosCount = activos.filter(a => a.estado === 'Activo').length;
        const inactivosCount = activos.filter(a => a.estado === 'Inactivo').length;
        const mantenimientoCount = activos.filter(a => a.estado === 'Mantenimiento').length;

        setChartData({
          labels: ['Activo', 'Inactivo', 'Mantenimiento'],
          datasets: [
            {
              label: 'Estado de los activos',
              data: [activosCount, inactivosCount, mantenimientoCount],
              backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
            },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ActivosPorEstado" style={{ maxWidth: '450px', margin: '20px auto', textAlign: 'center' }}>
      <h3>Activos por Estado</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default ActivosPorEstado;
