// 'use client';

import {LoginForm} from './form';

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
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
