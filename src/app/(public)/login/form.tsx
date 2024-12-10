'use client';

import React, {useState} from 'react';
import {authLoginDemo} from '@/app/auth/login';

import {useFormState, useFormStatus} from 'react-dom';
import Link from 'next/link';
// Estilos personalizados para el TextField

// Componente Login
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  // Formulario con Formik
  const [state, action] = useFormState(authLoginDemo, undefined);
  console.log('🚀 ~ LoginForm ~ action:', action);
  return (
    <form
      action={action}
      style={{
        maxWidth: '400px',
        margin: '40px auto',
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
          <label
            htmlFor="email"
            style={{fontWeight: 'bold', fontSize: '0.9rem', color: '#000'}}>
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="m@example.com"
            type="email"
            style={{
              padding: '10px',
              fontSize: '0.9rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
            required
          />
          {state?.errors?.email && (
            <p style={{fontSize: '0.85rem', color: '#d32f2f', margin: 0}}>
              {state.errors.email}
            </p>
          )}
        </div>

        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <label
              htmlFor="password"
              style={{fontWeight: 'bold', fontSize: '0.9rem', color: '#000'}}>
              Password
            </label>
            <Link
              href="#"
              style={{
                fontSize: '0.85rem',
                textDecoration: 'underline',
                color: '#0070f3',
                cursor: 'pointer',
              }}>
              Forgot your password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            style={{
              padding: '10px',
              fontSize: '0.9rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
            required
          />
          {state?.errors?.password && (
            <p style={{fontSize: '0.85rem', color: '#d32f2f', margin: 0}}>
              {state.errors.password}
            </p>
          )}
        </div>

        {state?.message && (
          <p style={{fontSize: '0.85rem', color: '#d32f2f', margin: 0}}>
            {state.message}
          </p>
        )}

        <div style={{marginTop: '16px'}}>
          <LoginButton />
        </div>
      </div>
    </form>
  );
}

export function LoginButton() {
  const {pending} = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit">
      {pending ? 'Submitting...' : 'Sign up'}
    </button>
  );
}