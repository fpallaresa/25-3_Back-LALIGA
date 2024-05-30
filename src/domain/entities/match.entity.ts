import { Document, Schema, model } from "mongoose";
import { ITeam } from "./team.entity";
import { IMatchday } from "./matchday.entity";

export enum MATCHSTATUS {
  "NODISPUTADO" = "NO DISPUTADO",
  "FINALIZADO" = "FINALIZADO",
}

export interface IMatchCreate {
  homeTeam: ITeam;
  awayTeam: ITeam;
  homeGoals: Number;
  awayGoals: Number;
  status: string;
  matchday?: IMatchday;
}

export type IMatch = IMatchCreate & Document;

const matchSchema = new Schema<IMatchCreate>(
  {
    matchday: {
      type: Schema.Types.ObjectId,
      ref: "Matchday",
      required: false,
    },
    homeTeam: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    awayTeam: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    homeGoals: {
      type: Number,
      required: true,
      default: 0,
    },
    awayGoals: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: MATCHSTATUS,
      default: MATCHSTATUS.NODISPUTADO,
    },
  },
  {
    timestamps: true,
  }
);

export const Match = model<IMatchCreate>("Match", matchSchema);
