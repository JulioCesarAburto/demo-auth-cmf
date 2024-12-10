'use client';
import {deleteSession} from '../auth/session';

export const ButtonDelete = () => {
  return (
    <button
      style={{
        display: 'inline-block',
        width: '100%',
        padding: '12px 16px',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: '#0070f3',
        color: '#ffffff',
        transition: 'opacity 0.3s ease',
      }}
      onClick={() => deleteSession()}>
      Cerrar Sesión
    </button>
  );
};
