using AutoMapper;
using FootballReactClientWithMVCAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FootballReactClientWithMVCAPI.Mappings
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Coach, Coach>().ReverseMap();
            CreateMap<League, League>().ReverseMap();
            CreateMap<Match, Match>().ReverseMap();
            CreateMap<Refree, Refree>().ReverseMap();
            CreateMap<Team, Team>().ReverseMap();
        }
    }
}
