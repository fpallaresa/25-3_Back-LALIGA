import { Match, IMatch, IMatchCreate } from "../entities/match.entity";
import { Document } from "mongoose";

const getAllMatches = async (page: number, limit: number): Promise<IMatch[]> => {
  return await Match.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .populate("homeTeam")
    .populate("awayTeam")
    .populate("matchday");
};

const getMatchCount = async (): Promise<number> => {
  return await Match.countDocuments();
};

const getMatchById = async (id: string): Promise<Document<IMatch> | any> => {
  return await Match.findById(id)
  .populate("homeTeam")
  .populate("awayTeam")
  .populate("matchday");
};

const getMatchesByTeamId = async (teamId: string): Promise<IMatch[]> => {
  return await Match.find({
    $or: [{ homeTeam: teamId }, { awayTeam: teamId }]
  })    
  .populate("homeTeam")
  .populate("awayTeam")
  .populate("matchday");
};

const updateMatch = async (id: string, matchData: IMatchCreate): Promise<Document<IMatch> | null> => {
  return await Match.findByIdAndUpdate(id, matchData, { new: true, runValidators: true });
};

export const matchOdm = {
  getAllMatches,
  getMatchCount,
  getMatchById,
  getMatchesByTeamId,
  updateMatch,
};
