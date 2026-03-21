import { useState, useEffect } from 'react'
import './App.css'

interface Propiedad {
  id: number;
  numero: string;
  bloque: string;
  propietario: string;
}

function App() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/propiedades')
      .then(res => res.json())
      .then(data => {
        setPropiedades(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Residencial - Gestión de Propiedades</h1>
      </header>
      
      <main>
        {loading ? (
          <p>Cargando propiedades...</p>
        ) : (
          <div className="grid">
            {propiedades.length === 0 ? (
              <p>No hay propiedades registradas.</p>
            ) : (
              propiedades.map(p => (
                <div key={p.id} className="card">
                  <h3>Propiedad {p.numero}</h3>
                  <p><strong>Bloque:</strong> {p.bloque}</p>
                  <p><strong>Propietario:</strong> {p.propietario}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
