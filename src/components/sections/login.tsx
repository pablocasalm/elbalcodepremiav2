// src/components/sections/Login.tsx
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [user, setUser]   = useState('');
  const [pass, setPass]   = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/.netlify/functions/auth-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass }),
      });

      if (res.ok) {
        const { token } = await res.json();
        sessionStorage.setItem('admin-token', token);
        // redirige al admin con token en la URL
        window.location.href = `/admin=${token}`;
      } else {
        const { error: msg } = await res.json();
        setError(msg || 'Credenciales inválidas');
      }
    } catch {
      setError('Error de conexión');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <form onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 300,
              padding: '2rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              borderRadius: '8px'
            }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Admin Login</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={e => setUser(e.target.value)}
          required
          style={{ padding: '0.5rem', marginBottom: '1rem' }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
          style={{ padding: '0.5rem', marginBottom: '1rem' }}
        />

        <button type="submit"
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
          Entrar
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;