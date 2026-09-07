import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const cardiologia = await prisma.especialidad.create({
    data: {
      nombre: "Cardiología",
      medicos: {
        create: [
          {
            nombre: "Carlos",
            apellido: "Ramírez",
          },
          {
            nombre: "Lucía",
            apellido: "Fernández",
          },
        ],
      },
    },
  });

  const pediatria = await prisma.especialidad.create({
    data: {
      nombre: "Pediatría",
      medicos: {
        create: [
          {
            nombre: "Jorge",
            apellido: "Mendoza",
          },
          {
            nombre: "Ana",
            apellido: "Torres",
          },
        ],
      },
    },
  });

  const dermatologia = await prisma.especialidad.create({
    data: {
      nombre: "Dermatología",
      medicos: {
        create: [
          {
            nombre: "Miguel",
            apellido: "Salazar",
          },
          {
            nombre: "Elena",
            apellido: "Vargas",
          },
        ],
      },
    },
  });

  console.log("Seed completado");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
