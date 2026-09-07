import express from "express";
import prisma from "./config/prisma.js";

const app = express();

app.use(express.json());

app.get("/api/specialties", async (_req, res) => {
  const specialties = await prisma.especialidad.findMany({
    orderBy: {
      id: "asc",
    },
  });

  res.json(specialties);
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
