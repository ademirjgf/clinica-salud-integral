import { Router } from "express";
import {
  createPatientController,
  getAllPatientsController,
  getPatientByIdController,
} from "../controllers/patient.controller.js";
import { validatePatient } from "../middlewares/validate-patient.js";
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
  validatePatient,
  createPatientController,
);

/*
  #swagger.security = [{
    "bearerAuth": []
  }]
*/

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  getAllPatientsController,
);

/*
  #swagger.security = [{
    "bearerAuth": []
  }]
*/

router.get(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA"),
  getPatientByIdController,
);

export default router;
