import { Request, Response } from "express";
import {
  getAppointmentsBySpecialty,
  getDailyCutoff,
} from "../models/report.model.js";

export async function getAppointmentsBySpecialtyController(
  _req: Request,
  res: Response,
) {
  try {
    const report = await getAppointmentsBySpecialty();

    return res.json(report);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener el reporte de citas por especialidad",
    });
  }
}
export async function getDailyCutoffController(req: Request, res: Response) {
  try {
    const date = req.query.date as string;

    const report = await getDailyCutoff(date);

    return res.json(report);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener el corte operativo diario",
    });
  }
}
