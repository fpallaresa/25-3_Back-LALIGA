import { Matchday, IMatchday } from "../entities/matchday.entity";
import { Document } from "mongoose";

const getAllMatchdays = async (page: number, limit: number): Promise<IMatchday[]> => {
  return await Matchday.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .populate({
      path: "matches",
      populate: {
        path: "homeTeam awayTeam",
        model: "Team",
      },
    });
};

const getMatchdayCount = async (filter?: string, value?: string): Promise<number> => {
  return await Matchday.countDocuments();
};

const getMatchdayById = async (id: string): Promise<Document<IMatchday> | any> => {
  return await Matchday.findById(id).populate({
    path: "matches",
    populate: {
      path: "homeTeam awayTeam",
      model: "Team",
    },
  });
};

export const matchdayOdm = {
  getAllMatchdays,
  getMatchdayCount,
  getMatchdayById,
};
