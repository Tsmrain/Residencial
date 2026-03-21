import { useState, useEffect, useCallback } from 'react'
import './App.css'

interface Habitacion {
  id: number;
  numero: string;
  tipo: string;
  estado: string;
  precioPorBloque: number;
  horarioDisponible: string;
}

const ROOM_TYPES = [
  { value: 'ESTANDAR', label: 'Estándar' },
  { value: 'VIP', label: 'VIP' },
  { value: 'SUPER_VIP', label: 'Super VIP' }
];

function App() {
  const [tipo, setTipo] = useState('ESTANDAR');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const fetchDisponibilidad = useCallback(async (selectedTipo: string, selectedFecha: string) => {
    // Validar fecha en el cliente por UX
    const today = new Date().toISOString().split('T')[0];
    if (selectedFecha < today) {
      setError('La fecha seleccionada no puede ser anterior a la fecha actual.');
      setHabitaciones([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/disponibilidad?tipo=${selectedTipo}&fecha=${selectedFecha}`);
      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || 'Error al consultar disponibilidad');
      }
      const data = await response.json();
      setHabitaciones(data);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hubo un error inesperado');
      setHabitaciones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Búsqueda automática cuando cambian los filtros
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tipo && fecha) fetchDisponibilidad(tipo, fecha);
    }, 300); // Debounce para suavidad
    return () => clearTimeout(timer);
  }, [tipo, fecha, fetchDisponibilidad]);

  const handleSuggestion = (suggestedTipo: string) => {
    setTipo(suggestedTipo);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">SKYVIEW</div>
        <div className="nav-links">
          <a href="#buscar">Disponibilidad</a>
          <a href="#reservas">Mis Reservas</a>
          <a href="#soporte">Soporte</a>
        </div>
      </nav>

      <div className="container">
        <header>
          <h1>Expertly Designed Living</h1>
          <p className="subtitle">Discover tranquility and luxury at Skyview Residences.</p>
        </header>

        <main id="buscar">
        {/* Formulario de Búsqueda */}
        <section className="search-box">
          <div className="form-group">
            <label>Tipo de Habitación</label>
            <select 
              className="form-control" 
              value={tipo} 
              onChange={(e) => setTipo(e.target.value)}
            >
              {ROOM_TYPES.map(rt => (
                <option key={rt.value} value={rt.value}>{rt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha de Ingreso</label>
            <input 
              type="date" 
              className="form-control" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
            />
          </div>

          <button className="btn-search" onClick={() => fetchDisponibilidad(tipo, fecha)}>
            Consultar Ahora
          </button>
        </section>

        {/* Mensajes de Error */}
        {error && (
          <div className="error-message">
            ⚠️ <span>{error}</span>
          </div>
        )}

        {/* Listado de Resultados */}
        <div className="results-container">
          {loading ? (
            <div className="empty-state">
              <h2>Preparando habitaciones...</h2>
            </div>
          ) : (
            <>
              {searched && habitaciones.length === 0 && !error ? (
                <div className="empty-state">
                  <h2>😔 No hay disponibilidad para {ROOM_TYPES.find(r => r.value === tipo)?.label}</h2>
                  <p>Intenta con otra fecha o mira nuestras sugerencias:</p>
                  <div className="suggestions">
                    {ROOM_TYPES.filter(rt => rt.value !== tipo).map(rt => (
                      <button 
                        key={rt.value} 
                        className="btn-search" 
                        style={{ background: '#f8fafc', color: 'var(--primary)', border: '1px solid #cbd5e1', margin: '0.5rem' }}
                        onClick={() => handleSuggestion(rt.value)}
                      >
                        Ver {rt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="results-grid">
                  {habitaciones.map(h => (
                    <div key={h.id} className="room-card">
                      <span className="room-badge">{h.tipo.replace('_', ' ')}</span>
                      <h3>Habitación {h.numero}</h3>
                      <p className="price-tag">
                        ${h.precioPorBloque.toFixed(2)} <span>/ bloque</span>
                      </p>
                      <div className="schedule">
                        🟢 {h.horarioDisponible}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      </div>
    </>
  )
}

export default App
