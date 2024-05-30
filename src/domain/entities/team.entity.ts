import { Document, Schema, model } from "mongoose";

export interface ITeamCreate {
  name: string;
  alias: string;
}

export type ITeam = ITeamCreate & Document;

const teamSchema = new Schema<ITeamCreate>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: [2, "El nombre del equipo debe tener al menos 5 caracteres, por ejemplo Real Madrid, FC Barcelona... etc"],
    },
    alias: {
      type: String,
      trim: true,
      required: true,
      minLength: [2, "El alias del equipo contener debe tener como mínimo 2 caracteres y como máximo 3 caracteres, por ejemplo MAD para Real Madrid o FCB para FC Barcelona"],
      maxLength: [3, "El alias del equipo contener debe tener como mínimo 2 caracteres y como máximo 3 caracteres, por ejemplo MAD para Real Madrid o FCB para FC Barcelona"],
    },
  },
  {
    timestamps: true,
  }
);

export const Team = model<ITeamCreate>("Team", teamSchema);
