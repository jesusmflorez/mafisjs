import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ActivosPorUbicacion = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Ubicaciones
    datasets: [
      {
        label: 'Cantidad de activos',
        data: [], // Cantidad por ubicación
        backgroundColor: '#4CAF50',
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/activos') // Trae los activos desde tu API
      .then((res) => {
        if (!res.ok) throw new Error('Error al traer los activos');
        return res.json();
      })
      .then((activos) => {
        // Contar cantidad de activos por ubicación
        const ubicacionesCount = {};
        activos.forEach((a) => {
          ubicacionesCount[a.ubicacion] = (ubicacionesCount[a.ubicacion] || 0) + 1;
        });

        setChartData({
          labels: Object.keys(ubicacionesCount),
          datasets: [
            {
              label: 'Cantidad de activos',
              data: Object.values(ubicacionesCount),
              backgroundColor: '#4CAF50',
            },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ActivosPorUbicacion" style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}>
      <h3>Activos por Ubicación</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default ActivosPorUbicacion;
