import { useState, useEffect } from "react";

export default function Activos() {
  const [datos, setDatos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    nombreActivo: "",
    ubicacion: "",
    estado: "Activo",
  });

  useEffect(() => {
    fetch("http://localhost:5000/activos")
      .then((res) => res.json())
      .then((data) => setDatos(data));
  }, []);
  // nuevo
  const nuevo = () => {
    setForm({ nombreActivo: "", ubicacion: "", estado: "Activo" });
    setMostrarForm(true);
  };
  // editar
  const editar = (activo) => {
    setForm(activo);
    setMostrarForm(true);
  };

  const Guardar = async () => {
    if (!form.nombreActivo || !form.ubicacion)
      return alert("Completa los campos");
    const url = form.id ? `http://localhost:5000/activos/${form.id}` : "http://localhost:5000/activos";
    const method = form.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) return alert("Error al guardar");
    const nueva = await fetch("http://localhost:5000/activos").then((r) =>
      r.json()
    );
    setDatos(nueva);
    setForm({ nombreActivo: "", ubicacion: "", estado: "Activo" });
    setMostrarForm(false);
  };

  // eliminar
  const eliminar = async (id) => {
    if (!window.confirm("Estas seguro de eliminar este activo?")) return;
    const res = await fetch(`http://localhost:5000/activos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return alert("Error al eliminar");
    const nueva = await fetch("http://localhost:5000/activos").then((r) =>
      r.json()
    );
    setDatos(nueva);
  };

  return (
    <>
      <h2 className="mb-3">Activos</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={nuevo} 
      >
        Nuevo Activo
      </button>

      {mostrarForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h5> {form.id ? "Editar activo": "Crear Activo"}</h5>

            <input
              className="form-control mb-2"
              placeholder="Nombre"
              value={form.nombreActivo}
              onChange={(e) =>
                setForm({ ...form, nombreActivo: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Ubicacion"
              value={form.ubicacion}
              onChange={(e) =>
                setForm({ ...form, ubicacion: e.target.value })
              }
            />

            <select
              className="form-select mb-2"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>

            <button className="btn btn-success btn-sm me-2" onClick={Guardar}>
              Guardar
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setMostrarForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Ubicacion</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {datos.map((activo) => (
            <tr key={activo.id}>
              <td>{activo.id}</td>
              <td>{activo.nombreActivo}</td>
              <td>{activo.ubicacion}</td>
              <td>{activo.estado}</td>
              <td>
                <button className="btn btn-sm btn-outline-warning me-2" onClick={()=>editar(activo)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>eliminar(activo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}