# ✅ Yup Express Partner Validation

This project demonstrates a clean way to use schema validation in an Express app using Yup and TypeScript. It allows you to pass Yup schemas directly into your routes, making your validation logic clean, reusable, and decoupled.


## 🎯 Motivation

The main motivation behind this project is the encapsulation of validation logic directly in the route definition — allowing schemas to be easily passed as parameters. This results in better separation of concerns, simpler route handlers, and the ability to define dynamic validation flows.

For example, you can pass a single schema:

```ts
router.post('/create', validateCreateUserSchema, (req, res) => {
  res.status(201).json({ message: 'User created', user: req.body });
});

router.put('/update', validateUpdateUserSchema, (req, res) => {
  res.status(201).json({ message: 'User created', user: req.body });
});


//userSchema.ts

export const validateCreateUserSchema = [
  validate(schema),
  validate(passwordSchema),
];

export const validateUpdateUserSchema = [
  validate(schema),
];



```
📘 Recommended Approach: Schema Validation as Middleware Arrays

This pattern improves clarity, reusability, and scalability by defining validation pipelines separately from the routes.
 - ✅ Advantages of this approach:

 - 💡 Clear separation of concerns (validation logic is not embedded in the route definition)

 - 🔁 Reusable validation rules across routes

 - 🧩 Composable: you can mix multiple schemas together easily

 - 🛠️ Maintainable: changes in validation rules don’t require touching route files

 - 🧪 Easier to test validation chains independently



## 📦 Technologies Used

- [Express](https://expressjs.com/)
- [Yup](https://github.com/jquense/yup)
- [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/andersonxrilo/yup-express-partner-validation.git
cd yup-express-partner-validation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```
The server will start on: [LocalHost](https://localhost:3000)

# 🧩 Project Structure

src/
│
├── app.ts                   # Express application setup
├── middlewares/
├── routes/
│   └── user.route.ts              # Route that registers a POST /users endpoint
└── schemas/
    └── userSchema.ts        # Yup schema for user validation
    └── validate.ts          # Global middleware that handles Yup schema validation

# 🛠️ How It Works

Instead of calling a middleware function with a schema, you directly pass the schema itself into the route definition:

```ts
import { Router } from 'express';
import { validateCreateUserSchema } from '../schemas/userSchema';

const router = Router();

router.post('/users', validateCreateUserSchema, (req: Request, res: Response) => {
  res.status(201).json({ message: 'User created successfully', data: req.body });
});
```

# ✅ Example Schema (userSchema.ts)

Instead of calling a middleware function with a schema, you directly pass the schema itself into the route definition:

```ts
import * as yup from 'yup';
import { validate } from './validate';

const schema = yup.object({
  body: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number().min(18, 'Must be at least 18').required(),
  }),
});
export const passwordSchema = yup.object({
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
```