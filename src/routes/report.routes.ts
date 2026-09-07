import { Router } from "express";
import {
  getAppointmentsBySpecialtyController,
  getDailyCutoffController,
} from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validateDailyCutoffQuery } from "../middlewares/validate-report.js";

const router = Router();

/*
  #swagger.security = [{
    "bearerAuth": []
  }]
*/

router.get(
  "/appointments-by-specialty",
  verifyToken,
  authorize("GERENCIA"),
  getAppointmentsBySpecialtyController,
);

/*
  #swagger.security = [{
    "bearerAuth": []
  }]
*/

router.get(
  "/daily-cutoff",
  verifyToken,
  authorize("GERENCIA"),
  validateDailyCutoffQuery,
  getDailyCutoffController,
);

export default router;
