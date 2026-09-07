import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Clínica Salud Integral API",
    description: "API REST para la gestión de la Clínica Salud Integral",
  },
  host: "localhost:3000",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Bearer token. Ejemplo: Bearer eyJhbGciOiJIUzI1NiIs...",
    },
  },
};

const outputFile = "./swagger_output.json";

const endpointsFiles = [
  "./src/index.ts",
  "./src/routes/patient.routes.ts",
  "./src/routes/doctor.routes.ts",
  "./src/routes/auth.routes.ts",
  "./src/routes/appointment.routes.ts",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
