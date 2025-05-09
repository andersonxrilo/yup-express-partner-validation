import * as yup from 'yup';
import { validate } from './validate';

const schema = yup.object({
  body: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number().min(18, 'Must be at least 18').required(),
  }),
});

export const validateUserSchema = validate(schema);