import { Request, Response, NextFunction } from "express";
import { matchOdm } from "../odm/match.odm";

export const getMatches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only for admins
    if (req.user.rol !== "ADMIN") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    // Ternario que se queda con el parametro si llega
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const matches = await matchOdm.getAllMatches(page, limit);

    // Num total de elementos
    const totalElements = await matchOdm.getMatchCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: matches,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getMatchById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const matchIdToShow = req.params.id;

    // Only for admins and delegates
    if (req.user.rol !== "ADMIN" && req.user.rol !== "DELEGATE") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const match = await matchOdm.getMatchById(matchIdToShow);

    if (match) {
      const matchToSend = match.toObject();
      res.json(matchToSend);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const matchIdToShow = req.params.id;

    // Only for admins and user to show
    if (req.user.rol !== "ADMIN" && req.user.id !== matchIdToShow) {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const id = req.params.id;
    const matchToUpdate = await matchOdm.getMatchById(id);
    if (matchToUpdate) {
      Object.assign(matchToUpdate, req.body);
      await matchToUpdate.save();
      // Quitamos pass de la respuesta
      res.json(matchToUpdate);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const matchService = {
  getMatches,
  getMatchById,
  updateMatch,
};
