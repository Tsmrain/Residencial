import React, { useState, useEffect } from 'react';

export function Reservas() {
  const [documento, setDocumento] = useState('');
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservas = async () => {
    if (!documento) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/reservas/cliente/${documento}`);
      if (!response.ok) {
        throw new Error('Error al obtener reservas');
      }
      const data = await response.json();
      setReservas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: number, action: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/reservas/${id}/${action}`, {
        method: 'POST'
      });
      if (res.ok) {
        fetchReservas(); // Refresh
      } else {
        const msg = await res.text();
        alert('Error: ' + msg);
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  }

  return (
    <main className="fade-in">
      <header>
        <h1>Mis Reservas</h1>
        <p className="subtitle">Consulta el estado de tus reservas.</p>
      </header>

      <section className="search-box">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Documento de Identidad</label>
          <input 
            type="text" 
            className="form-control" 
            value={documento} 
            onChange={(e) => setDocumento(e.target.value)} 
            placeholder="Ej. 12345678"
          />
        </div>
        <button className="btn-search" onClick={fetchReservas}>
          Buscar
        </button>
      </section>

      {error && <div className="error-message">⚠️ {error}</div>}

      <div className="results-container">
        {loading ? (
          <div className="empty-state">Buscando...</div>
        ) : (
          <div className="results-grid">
            {reservas.length > 0 ? reservas.map(r => (
              <div key={r.id} className="room-card">
                <span className={`room-badge ${r.estado === 'CANCELADA' ? 'error' : ''}`}>{r.estado}</span>
                <h3>Hab. {r.habitacionNumero}</h3>
                <p><strong>Cliente:</strong> {r.clienteNombre}</p>
                <p><strong>Entrada:</strong> {r.fechaEntrada}</p>
                <p><strong>Salida:</strong> {r.fechaSalida}</p>
                <p className="price-tag">${r.total.toFixed(2)}</p>
                
                {r.estado === 'CONFIRMADA' && (
                  <button className="btn-search" style={{ marginTop: '1rem', width: '100%', background: '#ff3b30' }} onClick={() => handleAction(r.id, 'cancelar')}>
                    Cancelar Reserva
                  </button>
                )}
              </div>
            )) : (
              searched(documento) && <div className="empty-state">No se encontraron reservas.</div>
            )}
          </div>
        )}
      </div>
    </main>
  );

  function searched(doc: string) {
    return doc.length > 0 && !loading;
  }
}
