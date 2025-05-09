import { Router, Request, Response } from 'express';
import { validateUserSchema } from '../schemas/userSchema';

const router = Router();

router.post('/users', validateUserSchema, (req: Request, res: Response) => {
  res.status(201).json({ message: 'User created successfully', data: req.body });
});

export { router };
