import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setActiveTab('disponibilidad')}>SKYVIEW</div>
      <div className="nav-links">
        <a 
          href="#buscar" 
          className={activeTab === 'disponibilidad' ? 'active' : ''} 
          onClick={() => setActiveTab('disponibilidad')}
        >
          Disponibilidad
        </a>
        <a 
          href="#reservas" 
          className={activeTab === 'reservas' ? 'active' : ''} 
          onClick={() => setActiveTab('reservas')}
        >
          Mis Reservas
        </a>
        <a 
          href="#recepcion" 
          className={activeTab === 'recepcion' ? 'active' : ''} 
          onClick={() => setActiveTab('recepcion')}
        >
          Recepción
        </a>
        <a 
          href="#reportes" 
          className={activeTab === 'reportes' ? 'active' : ''} 
          onClick={() => setActiveTab('reportes')}
        >
          Reportes
        </a>
      </div>
    </nav>
  );
}
