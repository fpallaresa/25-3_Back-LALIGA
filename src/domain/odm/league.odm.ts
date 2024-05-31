import { Match } from "../entities/match.entity";
import { Matchday } from "../entities/matchday.entity";
import { Team } from "../entities/team.entity";

export const generateLeague = async () => {
  // Borrar los partidos y jornadas anteriores
  await Match.deleteMany({});
  await Matchday.deleteMany({});
  console.log("Partidos y jornadas borradas de la BBDD");

  // Obtener todos los equipos
  const teams = await Team.find();

  // Generar todas las combinaciones de partidos de ida y vuelta
  const generateMatches = (teams: any[]) => {
    const matches = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push(new Match({ homeTeam: teams[i]._id, awayTeam: teams[j]._id }));
        matches.push(new Match({ homeTeam: teams[j]._id, awayTeam: teams[i]._id }));
      }
    }
    return matches;
  };

  // Generar calendario de jornadas
  const generateMatchdays = (matches: any[]) => {
    const matchdays = [];
    let matchesRemaining = [...matches];

    while (matchesRemaining.length > 0) {
      const matchesInMatchday: any[] = [];
      const teamsInMatchday = new Set();

      matchesRemaining = matchesRemaining.filter(match => {
        const { homeTeam, awayTeam } = match;
        if (!teamsInMatchday.has(homeTeam.toString()) && !teamsInMatchday.has(awayTeam.toString())) {
          matchesInMatchday.push(match);
          teamsInMatchday.add(homeTeam.toString());
          teamsInMatchday.add(awayTeam.toString());
          return false; // Remove this match from the list
        }
        return true; // Keep this match in the list
      });

      matchdays.push(matchesInMatchday);
    }

    return matchdays;
  };

  // Imprimir el calendario
  const printMatchdays = (matchdays: any[]) => {
    matchdays.forEach((matchday, index) => {
      console.log(`JORNADA ${index + 1}`);
      matchday.forEach((match: { homeTeam: any; awayTeam: any; }) => {
        console.log(`Partido: ${match.homeTeam} - ${match.awayTeam}`);
      });
      console.log('');
    });
  };

  const matches = generateMatches(teams);
  const matchdays = generateMatchdays(matches);
  printMatchdays(matchdays);

  // Guardar todos los partidos en la base de datos
  await Match.insertMany(matches);
  console.log("Partidos guardados en la BBDD");

  // Crear y guardar todas las jornadas en la base de datos
  const matchdayDocuments = matchdays.map((matchesInMatchday, index) => {
    const matchday = new Matchday({
      name: `Jornada ${index + 1}`,
      matches: matchesInMatchday.map(match => match._id),
      date: new Date(),
      matchdayNumber: index + 1
    });
    return matchday;
  });

  await Matchday.insertMany(matchdayDocuments);
  console.log("Jornadas guardadas en la BBDD");
};
