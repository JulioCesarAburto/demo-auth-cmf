'use server';
import {FormState, validationLoginSchema} from './definitions';
import {createSession} from './session';
import {redirect} from 'next/navigation';
// import {createSession} from './session';

// interface EmailValues {
//   email: string;
// }
// interface PasswordValues {
//   password: string;
// }

// export const authLoginDemo = async (
//   email: EmailValues,
//   password: PasswordValues,
// ) => {
//   try {
//     const response = await fetch(
//       'https://dev-ab5tsrsfm1xzx5ga.us.auth0.com/oauth/token',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Cookie:
//             'did=s%3Av0%3A1ea8a396-f2cd-4380-96d0-b181aab1301e.%2FTa%2FP2BiHPZtGvskrWz8ZNiGz6GPFqCVPQl%2FuYCUtug; did_compat=s%3Av0%3A1ea8a396-f2cd-4380-96d0-b181aab1301e.%2FTa%2FP2BiHPZtGvskrWz8ZNiGz6GPFqCVPQl%2FuYCUtug',
//         },
//         body: new URLSearchParams({
//           grant_type: 'password',
//           username: email.email,
//           password: password.password,
//           client_id: '2vbplyPZfgQ1VpisME4529JT5kd2OiPR',
//           client_secret:
//             '2sciww-DddgjYdJATtiHYXsO54uO9r4d5yFYKBxgXTrr06ceiwEkX4-vnb-MyqKl',
//         }),
//       },
//     );

//     const data = await response.json();
//     if (response.ok) {
//       // Process the response data (e.g., save the token, redirect, etc.)
//       console.log('Login successful:', data);
//       return true;
//     } else {
//       // Handle error
//       console.log('Login failed:', data);
//       return false;
//       //   redirect('/demo/login')
//     }
//   } catch (error) {
//     console.log('Request failed:', error);
//   }
// };

// export async function authLoginDemo(
//   state: FormState,
//   formData: FormData,
// ): Promise<FormState> {
//   // 1. Validate form fields
//   const validatedFields = validationLoginSchema.validate({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });
//   const {email, password} = await validatedFields;

//   // If any form fields are invalid, return early
//   if (!validatedFields) {
//     return {
//       errors: validatedFields,
//     };
//   }
//   try {
//     const response = await fetch(
//       'https://dev-ab5tsrsfm1xzx5ga.us.auth0.com/oauth/token',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//           grant_type: 'password',
//           username: email,
//           password: password,
//           client_id: '2vbplyPZfgQ1VpisME4529JT5kd2OiPR',
//           client_secret:
//             '2sciww-DddgjYdJATtiHYXsO54uO9r4d5yFYKBxgXTrr06ceiwEkX4-vnb-MyqKl',
//         }),
//       },
//     );

//     const data = await response.json();

//     if (!response.ok || data.error) {
//       console.log('Login successful:', data);
//       const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
//       const session = await encrypt({email, expiresAt});

//       // Establecemos la cookie
//       (await cookies()).set('session', session, {
//         expires: expiresAt,
//         httpOnly: true,
//         secure: true,
//         sameSite: 'lax',
//         path: '/',
//       });

//       // Redirigimos al dashboard
//       redirect('/dashboard');
//     } else {
//       // Login exitoso
//       console.log('Login successful:', data);
//       const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
//       const session = await encrypt({email, expiresAt});

//       // Establecemos la cookie
//       (await cookies()).set('session', session, {
//         expires: expiresAt,
//         httpOnly: true,
//         secure: true,
//         sameSite: 'lax',
//         path: '/',
//       });

//       // Redirigimos al dashboard
//       redirect('/dashboard');
//     }
//   } catch (error) {
//     console.log('Request failed:', error);
//   }
// }

export async function authLoginDemo(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // Variables de entorno
  const clientId = process.env.CLIENT_ID as string;
  const clientSecret = process.env.CLIENT_SECRET as string;
  const authUrl = 'https://dev-ab5tsrsfm1xzx5ga.us.auth0.com/oauth/token';
  // 1. Validate form fields
  const validatedFields = validationLoginSchema.validate({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const {email, password} = await validatedFields;

  // If any form fields are invalid, return early
  if (!validatedFields) {
    return {
      errors: validatedFields,
    };
  }
  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await response.json();
  console.log('🚀 ~ response', response);
  console.log('🚀 ~ data:', data);

  if (response.status === 200) {
    await createSession(email);
  } else {
    redirect('/login');
  }
}
