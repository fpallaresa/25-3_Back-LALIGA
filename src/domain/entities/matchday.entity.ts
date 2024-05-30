import { Document, Schema, model } from "mongoose";
import { IMatch } from "./match.entity";

export interface IMatchdayCreate {
  matchdayNumber: number;
  date: Date;
  matches: IMatch[];
}
export type IMatchday = IMatchdayCreate & Document;

const matchdaySchema = new Schema<IMatchdayCreate>(
  {
    matchdayNumber: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    matches: [
      {
        type: Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Matchday = model<IMatchdayCreate>("Matchday", matchdaySchema);
