// app/api/session/route.ts
import {NextResponse} from 'next/server';
import {encrypt} from '@/app/auth/session'; // Ajusta la ruta según tu proyecto

export async function POST(request: Request) {
  const {email} = await request.json();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({email, expiresAt});

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
  response.cookies.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}

// no se utiliza