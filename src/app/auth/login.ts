'use server';
import {FormState, validationLoginSchema} from './definitions';
import {createSession} from './session';
import {redirect} from 'next/navigation';
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
  console.log('🚀 ~ data:', data);

  if (response.status === 200) {
    await createSession(email);
  } else {
    redirect('/login');
  }
}
