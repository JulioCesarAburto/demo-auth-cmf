'use server';
import 'server-only';
// import {cookies} from 'next/headers';
import {SignJWT, jwtVerify} from 'jose';
import {SessionPayload} from './definitions';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';



const secretKey = 'secret-key';
const encodedKey = new TextEncoder().encode(secretKey);
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const {payload} = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log("🚀 ~ decrypt ~ error:", error)
    console.log('Failed to verify session');
  }
}
export async function createSession(email: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({email, expiresAt});
  console.log('🚀 ~ createSession ~ session:', session);
  const c = await cookies();
  c.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
  redirect('/dashboard');
}

export async function deleteSession() {
  (await cookies()).delete('session');
  redirect('/login');
}

// export async function createSession(email: string) {
//   const res = await fetch('/api/session', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({email}),
//   });
//   // Este fetch disparará la redirección definida en el route handler
// }

// export async function createSession(email: string) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Obtén la URL base desde las variables de entorno

//   if (!baseUrl) {
//     throw new Error('Base URL is not defined in NEXT_PUBLIC_BASE_URL');
//   }

//   const res = await fetch(`${baseUrl}/api/session`, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({email}),
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to create session: ${res.statusText}`);
//   }

//   console.log('Session created successfully');
// }

// import 'server-only';
// import {cookies} from 'next/headers';
// import {redirect} from 'next/navigation';

// export async function createSession(email: string) {
//   const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
//   const session = JSON.stringify({email});

//   const c = await cookies(); // Esperar la promesa
//   c.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   });
//   redirect('/dashboard');
// }
