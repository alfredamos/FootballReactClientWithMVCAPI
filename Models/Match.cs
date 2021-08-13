using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FootballReactClientWithMVCAPI.Models
{
    public class Match
    {
        public int MatchId { get; set; }
        [ForeignKey("Team")]
        public int HomeTeamId { get; set; }
        public Team HomeTeam { get; set; }
        [ForeignKey("Team")]
        public int AwayTeamId { get; set; }
        public Team AwayTeam { get; set; }
        public int HomeTeamScore { get; set; }
        public int AwayTeamScore { get; set; }
        public string Venue { get; set; }
        public string Location { get; set; }
        public int RefreeId { get; set; }
        public Refree Refree { get; set; }
    }
}
