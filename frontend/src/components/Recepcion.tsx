import React, { useState, useEffect } from 'react';

export function Recepcion() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagoModal, setPagoModal] = useState<number | null>(null);
  const [pagoData, setPagoData] = useState({ monto: '', metodo: 'EFECTIVO' });

  const fetchReservas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/reservas`);
      const data = await response.json();
      setReservas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleAction = async (id: number, action: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/reservas/${id}/${action}`, { method: 'POST' });
      if (res.ok) fetchReservas();
      else alert(await res.text());
    } catch (e: any) { alert(e.message); }
  }

  const handlePago = async () => {
    if (!pagoModal) return;
    try {
      const res = await fetch(`http://localhost:8080/api/pagos/${pagoModal}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pagoData)
      });
      if (res.ok) {
        alert('Pago registrado correctamente');
        setPagoModal(null);
      }
      else alert(await res.text());
    } catch (e: any) { alert(e.message); }
  }

  return (
    <main className="fade-in">
      <header>
        <h1>Recepción Central</h1>
        <p className="subtitle">Gestione el estado de las habitaciones (Check-in, Check-out, Pagos).</p>
      </header>
      
      {pagoModal && (
        <section className="search-box">
          <h2>Registrar Pago - Reserva {pagoModal}</h2>
          <div className="form-group">
            <label>Monto</label>
            <input type="number" className="form-control" value={pagoData.monto} onChange={e => setPagoData({...pagoData, monto: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Método</label>
            <select className="form-control" value={pagoData.metodo} onChange={e => setPagoData({...pagoData, metodo: e.target.value})}>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TARJETA">Tarjeta</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>
          <div style={{display: 'flex', gap: '1rem'}}>
            <button className="btn-search" style={{background: '#f8fafc', color: '#1d1d1f'}} onClick={() => setPagoModal(null)}>Cerrar</button>
            <button className="btn-search" style={{flex: 1}} onClick={handlePago}>Completar Pago</button>
          </div>
        </section>
      )}

      <div className="results-container" style={{ marginTop: '2rem' }}>
        {loading ? <div className="empty-state">Cargando datos...</div> : (
          <div className="results-grid">
            {reservas.map(r => (
              <div key={r.id} className="room-card">
                <span className={`room-badge ${r.estado === 'CHECK_IN' ? 'active' : ''}`}>{r.estado}</span>
                <h3>Hab. {r.habitacionNumero}</h3>
                <p><strong>Cliente:</strong> {r.clienteNombre} ({r.clienteDocumento})</p>
                <p><strong>Fechas:</strong> {r.fechaEntrada} a {r.fechaSalida}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                  {r.estado === 'CONFIRMADA' && <button className="btn-search" style={{ flex: 1, padding: '0.5rem' }} onClick={() => handleAction(r.id, 'checkin')}>Check-in</button>}
                  {r.estado === 'CHECK_IN' && <button className="btn-search" style={{ flex: 1, padding: '0.5rem', background: '#ff3b30' }} onClick={() => handleAction(r.id, 'checkout')}>Check-out</button>}
                  {(r.estado === 'CONFIRMADA' || r.estado === 'CHECK_IN' || r.estado === 'CHECK_OUT') && (
                    <button className="btn-search" style={{ flex: 1, padding: '0.5rem', background: '#34c759' }} onClick={() => { setPagoModal(r.id); setPagoData({ ...pagoData, monto: r.total }); }}>Cobrar</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
