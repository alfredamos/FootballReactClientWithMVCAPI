using FootballReactClientWithMVCAPI.Contracts;
using FootballReactClientWithMVCAPI.Data;
using FootballReactClientWithMVCAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FootballReactClientWithMVCAPI.Repositories
{
    public class SQLTeamRepository : ITeamRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLTeamRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Team> AddEntity(Team newEntity)
        {
            var Team = await _context.Teams.AddAsync(newEntity);
            await _context.SaveChangesAsync();
            return Team.Entity;
        }

        public async Task<Team> DeleteEntity(int id)
        {
            var TeamToDelete = await _context.Teams.FindAsync(id);
            if (TeamToDelete != null)
            {
                _context.Teams.Remove(TeamToDelete);
                await _context.SaveChangesAsync();
            }
            return TeamToDelete;
        }

        public async Task<IEnumerable<Team>> GetAll()
        {
            return await _context.Teams
                   .Include(x => x.Coach)
                   .Include(y => y.League)
                   .ToListAsync();
        }

        public async Task<Team> GetById(int id)
        {
            return await _context.Teams
                   .Include(x => x.Coach)
                   .Include(y => y.League)
                   .FirstOrDefaultAsync(e => e.TeamId == id);
        }

        public async Task<IEnumerable<Team>> Search(string searchKey)
        {
            IQueryable<Team> query = _context.Teams;
            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query
                   .Include(x => x.Coach)
                   .Include(y => y.League)
                   .Where(x => x.Name.Contains(searchKey) ||
                   x.Coach.Name.Contains(searchKey) ||
                   x.Stadium.Contains(searchKey) ||
                   x.City.Contains(searchKey) ||
                  x.League.Country.Contains(searchKey) ||
                   x.League.Name.Contains(searchKey)).ToListAsync();
        }

        public async Task<Team> UpdateEntity(Team updateEntity)
        {
            var TeamToUpdate = _context.Teams.Attach(updateEntity);
            TeamToUpdate.State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return TeamToUpdate.Entity;
        }
    }
}
