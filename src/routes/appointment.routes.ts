import { Router } from "express";
import {
  createAppointmentController,
  updateAppointmentStatusController,
} from "../controllers/appointment.controller.js";
import {
  validateAppointment,
  validateAppointmentStatus,
} from "../middlewares/validate-appointment.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

/*
  #swagger.security = [{
    "bearerAuth": []
  }]
*/

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateAppointment,
  createAppointmentController,
);

/*
  #swagger.security = [{
    "bearerAuth": []
  }]
*/

router.patch(
  "/:id/status",
  verifyToken,
  authorize("MEDICO"),
  validateAppointmentStatus,
  updateAppointmentStatusController,
);

export default router;
