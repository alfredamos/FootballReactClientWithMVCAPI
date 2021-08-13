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
    public class SQLLeagueRepository : ILeagueRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLLeagueRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<League> AddEntity(League newEntity)
        {
            var League = await _context.Leagues.AddAsync(newEntity);
            await _context.SaveChangesAsync();
            return League.Entity;
        }

        public async Task<League> DeleteEntity(int id)
        {
            var LeagueToDelete = await _context.Leagues.FindAsync(id);
            if (LeagueToDelete != null)
            {
                _context.Leagues.Remove(LeagueToDelete);
                await _context.SaveChangesAsync();
            }
            return LeagueToDelete;
        }

        public async Task<IEnumerable<League>> GetAll()
        {
            return await _context.Leagues.ToListAsync();
        }

        public async Task<League> GetById(int id)
        {
            return await _context.Leagues.FindAsync(id);
        }

        public async Task<IEnumerable<League>> Search(string searchKey)
        {
            IQueryable<League> query = _context.Leagues;
            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(x => x.Name.Contains(searchKey) ||
                         x.Country.Contains(searchKey)).ToListAsync();
        }

        public async Task<League> UpdateEntity(League updateEntity)
        {
            var LeagueToUpdate = _context.Leagues.Attach(updateEntity);
            LeagueToUpdate.State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return LeagueToUpdate.Entity;
        }
    }
}
