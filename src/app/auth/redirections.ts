'use server';
import {redirect} from 'next/navigation';

export async function redirectionLogin() {
  console.log('Redireccionado...');
  redirect('/dashboard');
}
