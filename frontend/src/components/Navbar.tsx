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
        {rolActual === 'CLIENTE' ? (
          <button 
            className="btn-search" 
            style={{ padding: '0.4rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
            onClick={() => {
              // Si el componente padre pasa algo para abrir login:
              // Para no complicar App.tsx, lo abrimos desde acá si se envía una función
              if (typeof (window as any).setShowLogin === 'function') {
                (window as any).setShowLogin(true);
              }
            }}
          >
            Log In (Staff)
          </button>
        ) : (
          <button 
            className="btn-search" 
            style={{ padding: '0.4rem 1rem', background: '#ff3b30', border: 'none', color: 'white' }}
            onClick={() => {
              setRolActual('CLIENTE');
              setActiveTab('disponibilidad');
            }}
          >
            Log Out ({rolActual})
          </button>
        )}
      </div>
    </nav>
  );
}
