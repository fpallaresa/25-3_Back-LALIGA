import { standingOdm } from "../odm/standing.odm";
import { IMatch } from "../entities/match.entity";

export const getStandings = async (): Promise<any[]> => {
  // Obtener todos los partidos finalizados
  const finalMatches: IMatch[] = await standingOdm.getAllFinalizedMatches();

  // Estructura para almacenar la información de los equipos
  const standings: { [key: string]: any } = {};

  finalMatches.forEach(match => {
    const homeTeamId = (match.homeTeam as any)._id.toString();
    const awayTeamId = (match.awayTeam as any)._id.toString();

    if (!standings[homeTeamId]) {
      standings[homeTeamId] = {
        position: 0,
        teamName: (match.homeTeam as any).name,
        points: 0,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0
      };
    }

    if (!standings[awayTeamId]) {
      standings[awayTeamId] = {
        position: 0,
        teamName: (match.awayTeam as any).name,
        points: 0,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0
      };
    }

    const homeTeam = standings[homeTeamId];
    const awayTeam = standings[awayTeamId];

    homeTeam.played += 1;
    awayTeam.played += 1;

    homeTeam.goalsFor += Number(match.homeGoals);
    homeTeam.goalsAgainst += Number(match.awayGoals);
    homeTeam.goalDifference += (Number(match.homeGoals) - Number(match.awayGoals));

    awayTeam.goalsFor += Number(match.awayGoals);
    awayTeam.goalsAgainst += Number(match.homeGoals);
    awayTeam.goalDifference += (Number(match.awayGoals) - Number(match.homeGoals));

    if (Number(match.homeGoals) > Number(match.awayGoals)) {
      homeTeam.wins += 1;
      homeTeam.points += 3;
      awayTeam.losses += 1;
    } else if (Number(match.homeGoals) < Number(match.awayGoals)) {
      awayTeam.wins += 1;
      awayTeam.points += 3;
      homeTeam.losses += 1;
    } else {
      homeTeam.draws += 1;
      awayTeam.draws += 1;
      homeTeam.points += 1;
      awayTeam.points += 1;
    }
  });

  const sortedStandings = Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.teamName.localeCompare(b.teamName);
  });

  sortedStandings.forEach((team, index) => {
    team.position = index + 1;
  });

  return sortedStandings;
};

// Endpoint para obtener la clasificación
export const getStandingsEndpoint = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const standings = await getStandings();
    res.json(standings);
  } catch (error) {
    next(error);
  }
};

export const standingService = {
  getStandingsEndpoint,
};
