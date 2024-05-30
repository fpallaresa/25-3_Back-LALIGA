import express from "express";
import { matchdayService } from "../domain/services/matchday.service";
import { isAuth } from "../utils/auth.middleware";

export const matchdayRouter = express.Router();

matchdayRouter.get("/", matchdayService.getMatchdays);
matchdayRouter.get("/:id", isAuth, matchdayService.getMatchdayById);
