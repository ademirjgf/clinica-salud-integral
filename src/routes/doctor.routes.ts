import { Router } from "express";
import { getAllDoctorsController } from "../controllers/doctor.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

/*
  #swagger.security = [{
    "bearerAuth": []
  }]
*/

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  getAllDoctorsController,
);

export default router;
