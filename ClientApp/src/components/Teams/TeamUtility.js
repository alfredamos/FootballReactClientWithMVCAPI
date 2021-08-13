class TeamUtility {
  static teamPkFixer = (team, type) => {
    let teamOutput = team;
    let league = 0;
    let coach = 0;

    league =
      type === "create"
        ? +team.league
        : typeof team.league === "string"
        ? +team.league
        : team.league.id;
    coach =
      type === "create"
        ? +team.coach
        : typeof team.coach === "string"
        ? +team.coach
        : team.coach.id;

    teamOutput.coach = coach;
    teamOutput.league = league;    

    return teamOutput;
  };
}

export default TeamUtility;
