// 'use client';

import { LoginForm } from "./form";

// Componente Login
const Login = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'rgb(242, 244, 247)',
        }}>
        <img
          src="/assets/images/cmf_linea/logoCMF.svg"
          alt="Logo"
          style={{marginBottom: '20px'}}
        />
        <LoginForm />
      </div>

      {/* Imagen de fondo y mockup */}
      <div style={{flex: 1}}>
        <img
          // src="/assets/images/cmf_linea/fondoLoginCMF.webp"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'right bottom',
          }}
          alt="Background"
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
          <img
            // src="/assets/images/cmf_linea/mockup.webp"
            style={{width: '80%'}}
            alt="Mockup"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
