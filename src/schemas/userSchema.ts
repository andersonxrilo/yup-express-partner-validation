import * as yup from 'yup';
import { validate } from './validate';

const schema = yup.object({
  body: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number().min(18, 'Must be at least 18').required(),
  }),
});
export const passwordSchema: yup.ObjectSchema<
  {
    password: string;
    passwordConfirmation: string;
  },
  yup.AnyObject,
  {},
  ''
> = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),

  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
export const validateCreateUserSchema = [validate(schema),validate(passwordSchema)];