import React, { useState } from 'react';

type Rol = 'CLIENTE' | 'RECEPCIONISTA' | 'ADMINISTRADOR';

interface LoginProps {
  setRolActual: (rol: Rol) => void;
  closeLogin: () => void;
}

export function Login({ setRolActual, closeLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'recepcion' && password === '1234') {
      setRolActual('RECEPCIONISTA');
      closeLogin();
    } else if (username === 'admin' && password === 'admin') {
      setRolActual('ADMINISTRADOR');
      closeLogin();
    } else {
      setError('Credenciales inválidas. Intente nuevamente.');
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div className="login-card" style={{
        background: 'var(--surface)', padding: '3rem', borderRadius: '16px',
        width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Staff Login</h2>
        <p style={{ textAlign: 'center', color: 'var(--secondary)', marginBottom: '2rem' }}>
          Ingrese sus credenciales corporativas.
        </p>
        
        {error && <div className="error-message" style={{ marginBottom: '1rem' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Usuario</label>
            <input 
              type="text" 
              className="form-control" 
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin / recepcion"
            />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="****"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn-search" style={{ background: '#e2e8f0', color: '#1e293b' }} onClick={closeLogin}>
              Cancelar
            </button>
            <button type="submit" className="btn-search" style={{ flex: 1 }}>
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
