import { Matchday, IMatchday } from "../entities/matchday.entity";
import { Document, Types } from "mongoose";

const getAllMatchdays = async (page: number, limit: number, filter?: string, value?: string): Promise<IMatchday[]> => {
  const query: any = {};

  if (filter && value) {
    if (filter === "team") {
      query["$or"] = [{ "matches.homeTeam": value }, { "matches.awayTeam": value }];
    }
  }

  console.log("Query:", query);

  return await Matchday.find(query)
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
  const query: any = {};

  if (filter && value) {
    if (filter === "team") {
      query["$or"] = [{ "matches.homeTeam": value }, { "matches.awayTeam": value }];
    }
  }

  return await Matchday.countDocuments(query);
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
