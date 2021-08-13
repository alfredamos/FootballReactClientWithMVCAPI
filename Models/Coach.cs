using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FootballReactClientWithMVCAPI.Models
{
    public class Coach
    {
        public int CoachId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int Age { get; set; }
    }
}
