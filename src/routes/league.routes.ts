import express from "express";
import { generateLeagueService } from "../domain/services/league.service";
import { isAuth } from "../utils/auth.middleware";

export const leagueRouter = express.Router();

leagueRouter.post("/generate", isAuth, generateLeagueService);
