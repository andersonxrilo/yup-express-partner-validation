import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

export const validate = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({ body: req.body }, { abortEarly: false });
       next();
    } catch (err: any) {
       res.status(400).json({
        errors: err.inner?.map((e: any) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }
  };
};