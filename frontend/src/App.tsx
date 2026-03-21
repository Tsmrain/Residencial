import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Disponibilidad } from './components/Disponibilidad';
import { Reservas } from './components/Reservas';
import { Recepcion } from './components/Recepcion';
import { Reportes } from './components/Reportes';

type Rol = 'CLIENTE' | 'RECEPCIONISTA' | 'ADMINISTRADOR';

function App() {
  const [activeTab, setActiveTab] = useState('disponibilidad');
  const [rolActual, setRolActual] = useState<Rol>('CLIENTE');

  return (
    <>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        rolActual={rolActual} 
        setRolActual={setRolActual} 
      />
      
      <div className="container">
        {/* CLIENTE TIENE ACCESO A: Disponibilidad y Reservas */}
        {activeTab === 'disponibilidad' && <Disponibilidad />}
        {activeTab === 'reservas' && <Reservas />}
        
        {/* RECEPCIONISTA TIENE ACCESO A: Recepcion (Check-in, Check-out, Cobro) */}
        {activeTab === 'recepcion' && (rolActual === 'RECEPCIONISTA' || rolActual === 'ADMINISTRADOR') && (
          <Recepcion />
        )}
        
        {/* ADMINISTRADOR TIENE ACCESO A: Reportes y Finanzas */}
        {activeTab === 'reportes' && rolActual === 'ADMINISTRADOR' && (
          <Reportes />
        )}
      </div>
    </>
  );
}

export default App;
