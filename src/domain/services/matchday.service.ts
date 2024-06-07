import { Request, Response, NextFunction } from "express";
import { matchdayOdm } from "../odm/matchday.odm";

export const getMatchdays = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const matchdays = await matchdayOdm.getAllMatchdays(page, limit);

    const totalElements = await matchdayOdm.getMatchdayCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: matchdays,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getMatchdayById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only for admins
    if (req.user.rol !== "ADMIN") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const matchdayIdToShow = req.params.id;

    const matchday = await matchdayOdm.getMatchdayById(matchdayIdToShow);

    if (matchday) {
      const matchdayToSend = matchday.toObject();
      res.json(matchdayToSend);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const getMatchdayByTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    if (req.user.rol !== "ADMIN" && req.user.rol !== "DELEGATE" && req.user.rol !== "PLAYER") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const teamId = req.query.team as string;

    const matchdays = await matchdayOdm.getMatchdayByTeam(teamId);

    const response = {
      totalItems: matchdays.length,
      data: matchdays,
    };

    res.json(response);
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    next(error);
  }
};

export const matchdayService = {
  getMatchdays,
  getMatchdayById,
  getMatchdayByTeam,
};
