class MatchUtility {
  static matchPkFixer = (match, type) => {
    let matchOutput = match;
    let refree = 0;
    let homeTeam = 0;
    let awayTeam = 0;

    refree =
      type === "create"
        ? +match.refree
        : typeof match.refree === "string"
        ? +match.refree
        : match.refree.id;

    homeTeam =
      type === "create"
        ? +match.homeTeam
        : typeof match.homeTeam === "string"
        ? +match.homeTeam
        : match.homeTeam.id;

    awayTeam =
      type === "create"
        ? +match.awayTeam
        : typeof match.awayTeam === "string"
        ? +match.awayTeam
        : match.awayTeam.id;

    matchOutput.awayTeam = awayTeam;
    matchOutput.homeTeam = homeTeam;
    matchOutput.refree = refree;

    return matchOutput;
  };
}

export default MatchUtility;
