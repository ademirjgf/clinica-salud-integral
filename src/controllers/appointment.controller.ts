import { Request, Response } from "express";
import {
  createAppointment,
  getDoctorAgenda,
  updateAppointmentStatus,
} from "../models/appointment.model.js";
import { getPatientById } from "../models/patient.model.js";
import { getDoctorById } from "../models/doctor.model.js";

export async function createAppointmentController(req: Request, res: Response) {
  try {
    const { pacienteId, medicoId, fechaHora } = req.body;

    const paciente = await getPatientById(pacienteId);

    if (!paciente) {
      return res.status(404).json({
        message: "Paciente no encontrado",
      });
    }

    const medico = await getDoctorById(medicoId);

    if (!medico) {
      return res.status(404).json({
        message: "Médico no encontrado",
      });
    }

    const cita = await createAppointment({
      pacienteId,
      medicoId,
      fechaHora,
    });

    return res.status(201).json(cita);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al agendar la cita",
    });
  }
}

export async function getDoctorAgendaController(req: Request, res: Response) {
  try {
    const medicoId = Number(req.params.id);

    if (Number.isNaN(medicoId)) {
      return res.status(400).json({
        message: "El id del médico no es válido",
      });
    }

    const { from, to } = req.query;

    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    if (typeof from === "string" && typeof to === "string") {
      fromDate = new Date(from);
      toDate = new Date(to);

      if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
        return res.status(400).json({
          message: "El rango de fechas no es válido",
        });
      }
    }

    const agenda = await getDoctorAgenda(medicoId, fromDate, toDate);

    return res.json(agenda);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener la agenda del médico",
    });
  }
}

export async function updateAppointmentStatusController(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "El id de la cita no es válido",
      });
    }

    const { estado } = req.body;

    const cita = await updateAppointmentStatus(id, estado);

    return res.json(cita);
  } catch (error: any) {
    if (error?.code === "P2025") {
      return res.status(404).json({
        message: "Cita no encontrada",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Error al actualizar el estado de la cita",
    });
  }
}
