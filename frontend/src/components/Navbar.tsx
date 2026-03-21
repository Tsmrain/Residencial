import React from 'react';

type Rol = 'CLIENTE' | 'RECEPCIONISTA' | 'ADMINISTRADOR';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  rolActual: Rol;
  setRolActual: (rol: Rol) => void;
}

export function Navbar({ activeTab, setActiveTab, rolActual, setRolActual }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setActiveTab('disponibilidad')} style={{ cursor: 'pointer' }}>SKYVIEW</div>
      
      <div className="nav-links">
        {/* Enlaces para CLIENTES */}
        {(rolActual === 'CLIENTE' || rolActual === 'RECEPCIONISTA' || rolActual === 'ADMINISTRADOR') && (
          <>
            <a href="#buscar" className={activeTab === 'disponibilidad' ? 'active' : ''} onClick={() => setActiveTab('disponibilidad')}>
              Disponibilidad
            </a>
            <a href="#reservas" className={activeTab === 'reservas' ? 'active' : ''} onClick={() => setActiveTab('reservas')}>
              Mis Reservas
            </a>
          </>
        )}

        {/* Enlaces para RECEPCIÓN y ADMINISTRADOR */}
        {(rolActual === 'RECEPCIONISTA' || rolActual === 'ADMINISTRADOR') && (
          <a href="#recepcion" className={activeTab === 'recepcion' ? 'active' : ''} onClick={() => setActiveTab('recepcion')}>
            Recepción
          </a>
        )}

        {/* Enlaces exclusivos para ADMINISTRADOR */}
        {rolActual === 'ADMINISTRADOR' && (
          <a href="#reportes" className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}>
            Reportes
          </a>
        )}
      </div>

      <div className="role-switcher">
        <select 
          className="form-control" 
          style={{ width: 'auto', padding: '0.2rem 0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 500 }}
          value={rolActual}
          onChange={(e) => {
            const newRol = e.target.value as Rol;
            setRolActual(newRol);
            // Redirigir si pierde acceso
            if (newRol === 'CLIENTE' && (activeTab === 'recepcion' || activeTab === 'reportes')) setActiveTab('disponibilidad');
            if (newRol === 'RECEPCIONISTA' && activeTab === 'reportes') setActiveTab('recepcion');
          }}
        >
          <option value="CLIENTE" style={{ color: 'black' }}>👨‍💼 Cliente</option>
          <option value="RECEPCIONISTA" style={{ color: 'black' }}>👩‍💻 Recepcionista</option>
          <option value="ADMINISTRADOR" style={{ color: 'black' }}>👑 Administrador</option>
        </select>
      </div>
    </nav>
  );
}
