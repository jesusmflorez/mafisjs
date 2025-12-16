import { useState } from "react";
import Activos from "./Activos";
import Reportes from "./Reportes";
import Usuarios from "./Usuarios";
import Ordenes from "./Ordenes"; 
import "./Dashboard.css";


export default function Dashboard({ user, onLogout }) {
  const [seccion, setSeccion] = useState("activos"); // activos | reportes | usuarios | ordenes

  // Sidebar
  const Sidebar = () => (
    <div
      className="d-flex flex-column p-3 bg-light border-end"
      style={{ width: 220, height: "100vh" }}
    >
      <h5 className="mb-4">Menú</h5>
      <button
        className={`btn btn-sm mb-2 ${
          seccion === "activos" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setSeccion("activos")}
      >
        Activos
      </button>
      <button
        className={`btn btn-sm mb-2 ${
          seccion === "reportes" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setSeccion("reportes")}
      >
        Reportes
      </button>

      {/* Órdenes: solo técnico y admin */}
      {["administrador", "tecnico"].includes(user.rol) && (
        <button
          className={`btn btn-sm mb-2 ${
            seccion === "ordenes" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSeccion("ordenes")}
        >
          Órdenes
        </button>
      )}

      {user.rol === "administrador" && (
        <button
          className={`btn btn-sm mb-2 ${
            seccion === "usuarios" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSeccion("usuarios")}
        >
          Usuarios
        </button>
      )}

      <div className="mt-auto">
        <button
          className="btn btn-sm btn-outline-danger w-100"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
    
  // Área principal (sin recargar)
  const MainArea = () => {
    switch (seccion) {
      case "activos":
        return (
        <>
          <Activos />
        </>
      );
      case "reportes":
        return <Reportes />;
      case "usuarios":
        return <Usuarios />;
      case "ordenes":
        return <Ordenes />; // ← nuevo
      default:
        return <Activos />;
    }
  };

  return (
  <div className="d-flex vh-100 dashboard-container">
    <Sidebar />

    <div className="flex-fill p-4 overflow-auto main-content">
      <div className="alert alert-success mb-4 dashboard-welcome">
        <strong>Bienvenido, {user.nombre}</strong> — Rol: {user.rol}
      </div>
      <MainArea />
    </div>
  </div>
);
}