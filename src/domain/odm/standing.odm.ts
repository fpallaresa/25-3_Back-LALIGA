import { Match, IMatch } from "../entities/match.entity";

// Obtener todos los partidos finalizados
const getAllFinalizedMatches = async (): Promise<IMatch[]> => {
  return await Match.find({ status: "FINALIZADO" }).populate(["homeTeam", "awayTeam"]);
};

export const standingOdm = {
  getAllFinalizedMatches,
};
