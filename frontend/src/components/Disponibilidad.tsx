import React, { useState, useEffect, useCallback } from 'react';

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

export function Disponibilidad() {
  const [tipo, setTipo] = useState('ESTANDAR');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [fechaSalida, setFechaSalida] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  // Booking Flow State
  const [selectedRoom, setSelectedRoom] = useState<Habitacion | null>(null);
  const [clienteData, setClienteData] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    email: ''
  });

  const fetchDisponibilidad = useCallback(async (selectedTipo: string, selectedFecha: string) => {
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
        throw new Error('Error al consultar disponibilidad');
      }
      const data = await response.json();
      setHabitaciones(data);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || 'Hubo un error inesperado');
      setHabitaciones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBooking = async () => {
    if (!selectedRoom) return;
    try {
      const res = await fetch('http://localhost:8080/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clienteNombre: clienteData.nombre,
          clienteDocumento: clienteData.documento,
          clienteTelefono: clienteData.telefono,
          clienteEmail: clienteData.email,
          habitacionId: selectedRoom.id,
          fechaEntrada: fecha,
          fechaSalida: fechaSalida
        })
      });

      if (res.ok) {
        alert('Reserva exitosa!');
        setSelectedRoom(null);
        fetchDisponibilidad(tipo, fecha);
      } else {
        const msg = await res.text();
        alert('Error: ' + msg);
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  useEffect(() => {
    if (tipo && fecha) fetchDisponibilidad(tipo, fecha);
  }, [tipo, fecha, fetchDisponibilidad]);

  if (selectedRoom) {
    return (
      <main className="fade-in">
        <header>
          <h1>Realizar Reserva</h1>
          <p className="subtitle">Completando datos para la Habitación {selectedRoom.numero}</p>
        </header>

        <section className="search-box">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input type="text" className="form-control" onChange={e => setClienteData({...clienteData, nombre: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Documento de Identidad</label>
            <input type="text" className="form-control" onChange={e => setClienteData({...clienteData, documento: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input type="text" className="form-control" onChange={e => setClienteData({...clienteData, telefono: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" onChange={e => setClienteData({...clienteData, email: e.target.value})} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Fecha Extensión (Opcional Salida)</label>
            <input type="date" className="form-control" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-search" style={{ background: '#f8fafc', color: '#1d1d1f' }} onClick={() => setSelectedRoom(null)}>Volver</button>
            <button className="btn-search" style={{ flex: 1 }} onClick={handleBooking}>Confirmar Reserva</button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main id="buscar" className="fade-in">
      <header>
        <h1>Expertly Designed Living</h1>
        <p className="subtitle">Discover tranquility and luxury at Skyview Residences.</p>
      </header>

      {/* Formulario de Búsqueda */}
      <section className="search-box">
        <div className="form-group">
          <label>Tipo de Habitación</label>
          <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {ROOM_TYPES.map(rt => (<option key={rt.value} value={rt.value}>{rt.label}</option>))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha de Ingreso</label>
          <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <button className="btn-search" onClick={() => fetchDisponibilidad(tipo, fecha)}>Consultar</button>
      </section>

      {error && <div className="error-message">⚠️ {error}</div>}

      <div className="results-container">
        {loading ? (
          <div className="empty-state"><h2>Preparando habitaciones...</h2></div>
        ) : (
          <>
            {searched && habitaciones.length === 0 && !error ? (
              <div className="empty-state">
                <h2>😔 No hay disponibilidad</h2>
                <div className="suggestions">
                  {ROOM_TYPES.filter(rt => rt.value !== tipo).map(rt => (
                    <button key={rt.value} className="btn-search" style={{ background: '#f8fafc', color: 'var(--primary)', border: '1px solid #cbd5e1', margin: '0.5rem' }} onClick={() => setTipo(rt.value)}>Ver {rt.label}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="results-grid">
                {habitaciones.map(h => (
                  <div key={h.id} className="room-card">
                    <span className="room-badge">{h.tipo.replace('_', ' ')}</span>
                    <h3>Habitación {h.numero}</h3>
                    <p className="price-tag">${h.precioPorBloque.toFixed(2)} <span>/ bloque</span></p>
                    <div className="schedule">🟢 {h.horarioDisponible}</div>
                    <button className="btn-search" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setSelectedRoom(h)}>Reservar</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
