using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FootballReactClientWithMVCAPI.Models
{
    public class Team
    {
        public int TeamId { get; set; }
        public string Name { get; set; }        
        public int LeagueId { get; set; }       
        public League League { get; set; }
        public int CoachId { get; set; }
        public Coach Coach { get; set; }
        public string City { get; set; }
        public string Stadium { get; set; }
    }
}
