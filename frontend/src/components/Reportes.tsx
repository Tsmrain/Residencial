import React, { useState } from 'react';

export function Reportes() {
  const [fechaTurno, setFechaTurno] = useState(new Date().toISOString().split('T')[0]);
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);

  const [reporteTurno, setReporteTurno] = useState<any>(null);
  const [reporteConsolidado, setReporteConsolidado] = useState<any>(null);

  const fetchTurno = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reportes/turno?fecha=${fechaTurno}`);
      setReporteTurno(await response.json());
    } catch (e: any) { alert(e.message); }
  }

  const fetchConsolidado = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reportes/consolidado?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      setReporteConsolidado(await response.json());
    } catch (e: any) { alert(e.message); }
  }

  return (
    <main className="fade-in">
      <header>
        <h1>Análisis y Reportes</h1>
        <p className="subtitle">Métricas del ecosistema Skyview Residential.</p>
      </header>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <section className="search-box" style={{ flex: 1, minWidth: '300px' }}>
          <h2>Reporte por Turno</h2>
          <div className="form-group">
            <label>Jornada Diaria</label>
            <input type="date" className="form-control" value={fechaTurno} onChange={e => setFechaTurno(e.target.value)} />
          </div>
          <button className="btn-search" onClick={fetchTurno}>Generar Reporte (CU-10)</button>

          {reporteTurno && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f7', borderRadius: '12px' }}>
              <p><strong>Ingresos:</strong> ${reporteTurno.ingresos_totales}</p>
              <p><strong>Check-ins:</strong> {reporteTurno.checkins_realizados}</p>
              <p><strong>Cancelaciones:</strong> {reporteTurno.cancelaciones}</p>
              <p><strong>Reservas Activas:</strong> {reporteTurno.reservas_activas}</p>
            </div>
          )}
        </section>

        <section className="search-box" style={{ flex: 1, minWidth: '300px' }}>
          <h2>Reporte Consolidado</h2>
          <div className="form-group">
            <label>Desde</label>
            <input type="date" className="form-control" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Hasta</label>
            <input type="date" className="form-control" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
          </div>
          <button className="btn-search" onClick={fetchConsolidado}>Generar Consolidado (CU-11)</button>

          {reporteConsolidado && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f7', borderRadius: '12px' }}>
              <p><strong>Ingresos Totales:</strong> ${reporteConsolidado.ingresos_totales}</p>
              <p><strong>Reservas Históricas:</strong> {reporteConsolidado.reservas_totales}</p>
              <p><strong>Unidades Disponibles:</strong> {reporteConsolidado.habitaciones_inventario}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
