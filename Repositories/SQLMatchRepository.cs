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
    public class SQLMatchRepository : IMatchRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLMatchRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Match> AddEntity(Match newEntity)
        {
            var Match = await _context.Matches.AddAsync(newEntity);
            await _context.SaveChangesAsync();
            return Match.Entity;
        }

        public async Task<Match> DeleteEntity(int id)
        {
            var MatchToDelete = await _context.Matches.FindAsync(id);
            if (MatchToDelete != null)
            {
                _context.Matches.Remove(MatchToDelete);
                await _context.SaveChangesAsync();
            }
            return MatchToDelete;
        }

        public async Task<IEnumerable<Match>> GetAll()
        {
            return await _context.Matches
                   .Include(x => x.AwayTeam)
                   .Include(y => y.HomeTeam)
                   .Include(z => z.Refree)
                   .ToListAsync();
        }

        public async Task<Match> GetById(int id)
        {
            return await _context.Matches.Include(x => x.AwayTeam)
                   .Include(y => y.HomeTeam)
                   .Include(z => z.Refree)
                   .FirstOrDefaultAsync(e => e.MatchId == id);
        }

        public async Task<IEnumerable<Match>> Search(string searchKey)
        {
            IQueryable<Match> query = _context.Matches;
            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Include(y => y.AwayTeam)
                   .Include(yy => yy.HomeTeam)
                   .Include(xx => xx.Refree)
                   .Where(x => x.AwayTeam.Name.Contains(searchKey) ||
                   x.AwayTeam.Stadium.Contains(searchKey) ||
                   x.AwayTeam.City.Contains(searchKey) ||
                   x.AwayTeam.League.Name.Contains(searchKey) ||
                   x.HomeTeam.Name.Contains(searchKey) ||
                   x.HomeTeam.Stadium.Contains(searchKey) ||
                   x.HomeTeam.City.Contains(searchKey) ||
                   x.HomeTeam.League.Name.Contains(searchKey) ||                   
                   x.Venue.Contains(searchKey) || 
                   x.Location.Contains(searchKey) ||
                   x.Refree.Location.Contains(searchKey) ||
                   x.Refree.Name.Contains(searchKey) ||
                   x.Refree.Rank.Contains(searchKey)).ToListAsync();
        }

        public async Task<Match> UpdateEntity(Match updateEntity)
        {
            var MatchToUpdate = _context.Matches.Attach(updateEntity);
            MatchToUpdate.State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return MatchToUpdate.Entity;
        }
    }
}
