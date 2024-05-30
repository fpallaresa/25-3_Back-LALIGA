import { Match } from "../entities/match.entity";
import { Matchday } from "../entities/matchday.entity";
import { Team } from "../entities/team.entity";

export const generateLeague = async () => {
  // Borrar los partidos y jornadas anteriores
  await Match.collection.drop();
  await Matchday.collection.drop();
  console.log("partido y jornadas borradas de la bbdd");

  // Obtener todos los equipos
  const teams = await Team.find();

  const totalTeams = teams.length;
  const matches = [];
  const matchdays = [];

  // Generar todos los partidos (ida y vuelta)
  for (let i = 0; i < totalTeams; i++) {
    for (let j = i + 1; j < totalTeams; j++) {
      matches.push({ homeTeam: teams[i]._id, awayTeam: teams[j]._id, status: "NO DISPUTADO" });
      matches.push({ homeTeam: teams[j]._id, awayTeam: teams[i]._id, status: "NO DISPUTADO" });
    }
  }

  // Guardar todos los partidos en la base de datos
  const createdMatches = await Match.insertMany(matches);
  console.log("Guardados todos los partidos en la bbdd");

  // Generar las jornadas
  const startDate = new Date(new Date().getFullYear(), 7, 31); // Último domingo de agosto
  let currentDate = startDate;

  for (let i = 0; i < createdMatches.length; i += totalTeams / 2) {
    const matchdayMatches = createdMatches.slice(i, i + totalTeams / 2);
    const matchday = new Matchday({
      matchdayNumber: Math.floor(i / (totalTeams / 2)) + 1,
      date: new Date(currentDate),
      matches: matchdayMatches.map((match) => match._id),
    });
    matchdays.push(matchday);
    currentDate.setDate(currentDate.getDate() + 7); // Incrementar una semana para la siguiente jornada
  }

  // Guardar todas las jornadas en la base de datos
  await Matchday.insertMany(matchdays);
  console.log("Guardadas todas las jornadas en la bbdd");
};
