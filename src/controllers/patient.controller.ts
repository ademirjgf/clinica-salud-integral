import { Request, Response } from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
} from "../models/patient.model.js";

export async function createPatientController(req: Request, res: Response) {
  try {
    const patient = await createPatient(req.body);

    return res.status(201).json(patient);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear el paciente",
    });
  }
}

export async function getAllPatientsController(_req: Request, res: Response) {
  try {
    const patients = await getAllPatients();

    return res.json(patients);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los pacientes",
    });
  }
}

export async function getPatientByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "El id del paciente no es válido",
      });
    }

    const patient = await getPatientById(id);

    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado",
      });
    }

    return res.json(patient);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el paciente",
    });
  }
}
