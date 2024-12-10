'use client';
import {deleteSession} from '../auth/session';

export const ButtonDelete = () => {
  return <button onClick={() => deleteSession()}>Click me!</button>;
};
