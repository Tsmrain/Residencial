import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Disponibilidad } from './components/Disponibilidad';
import { Reservas } from './components/Reservas';
import { Recepcion } from './components/Recepcion';
import { Reportes } from './components/Reportes';

function App() {
  const [activeTab, setActiveTab] = useState('disponibilidad');

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
        {activeTab === 'disponibilidad' && <Disponibilidad />}
        {activeTab === 'reservas' && <Reservas />}
        {activeTab === 'recepcion' && <Recepcion />}
        {activeTab === 'reportes' && <Reportes />}
      </div>
    </>
  );
}

export default App;
