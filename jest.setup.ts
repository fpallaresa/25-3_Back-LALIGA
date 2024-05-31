import { mongoConnect } from "./src/domain/repositories/mongo-repository";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoConnect();
  console.log("Conectado a la base de datos MongoDB");
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("Conexión a la base de datos MongoDB cerrada");
});