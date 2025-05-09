import { Router, Request, Response } from 'express';
import { validateCreateUserSchema } from '../schemas/userSchema';

const router = Router();

router.post('/users', validateCreateUserSchema, (req: Request, res: Response) => {
  res.status(201).json({ message: 'User created successfully', data: req.body });
});

export { router };
