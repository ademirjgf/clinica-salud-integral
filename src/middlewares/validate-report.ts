import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const dailyCutoffQuerySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato YYYY-MM-DD"),
});

export function validateDailyCutoffQuery(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = dailyCutoffQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      message: "Fecha inválida",
      errors: result.error.issues,
    });
  }

  next();
}
