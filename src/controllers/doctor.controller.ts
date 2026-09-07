import { Request, Response } from "express";
import { getAllDoctors } from "../models/doctor.model.js";

export async function getAllDoctorsController(req: Request, res: Response) {
  try {
    const specialty =
      typeof req.query.specialty === "string" ? req.query.specialty : undefined;

    const doctors = await getAllDoctors(specialty);

    return res.json(doctors);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los médicos",
    });
  }
}
