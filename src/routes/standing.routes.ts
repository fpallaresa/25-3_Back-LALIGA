import express from "express";
import { standingService } from "../domain/services/standing.service";

export const standingRouter = express.Router();

standingRouter.get("/", standingService.getStandingsEndpoint);