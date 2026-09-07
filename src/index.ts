import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json" with { type: "json" };

import prisma from "./config/prisma.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get("/api/specialties", async (_req, res) => {
  const specialties = await prisma.especialidad.findMany({
    orderBy: {
      id: "asc",
    },
  });

  res.json(specialties);
});

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
