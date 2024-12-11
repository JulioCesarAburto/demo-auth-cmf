// 'use client';
import Image from 'next/image';
import {LoginForm} from './form';
import imagebackground from '@/app/(public)/images/fondoLoginCMF.webp';
import logoCMF from '@/app/(public)/images/logoCMF.svg';
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
        <Image src={logoCMF} alt="Logo" style={{marginBottom: '20px'}} />
        <LoginForm />
      </div>
      <div style={{flex: 1}}>
        <Image
          src={imagebackground}
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'right bottom',
          }}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Login;
