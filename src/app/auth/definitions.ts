import * as yup from 'yup';
export const validationLoginSchema = yup.object({
  email: yup
    .string()
    .email('Introduzca un correo electrónico válido')
    .required('Campo requerido'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Campo requerido'),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
export type FormStateTest = {
  errors: {[key: string]: string};
  message: string;
};

export type SessionPayload = {
  email: string | number;
  expiresAt: Date;
};
