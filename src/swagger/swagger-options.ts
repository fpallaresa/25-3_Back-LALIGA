import { type SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "La Liga API",
      description: "API documentation ",
      version: "1.0.0",
      license: {
        name: "MIT",
        url: "https://www.mit.edu/",
      },
      contact: {
        name: "Francesc Pallares",
        url: "https://github.com/fpallaresa",
        email: "francescpallares@gmail.com",
      },
    },
    server: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  paths: {},
  apis: [
    "./src/swagger/*/*.ts",
  ]
};
