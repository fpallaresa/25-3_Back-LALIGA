import { Request, Response, NextFunction } from "express";
import { generateLeague } from "../odm/league.odm";

export const generateLeagueService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only for admins
    if (req.user.rol !== "ADMIN") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    await generateLeague();
    res.status(200).json({ message: "Liga generada con éxito" });
  } catch (error) {
    next(error);
  }
};

export const leagueService = {
  generateLeague,
};
