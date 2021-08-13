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
    public class SQLCoachRepository : ICoachRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLCoachRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Coach> AddEntity(Coach newEntity)
        {
            var coach = await _context.Coaches.AddAsync(newEntity);
            await _context.SaveChangesAsync();
            return coach.Entity;
        }

        public async Task<Coach> DeleteEntity(int id)
        {
            var coachToDelete = await _context.Coaches.FindAsync(id);
            if (coachToDelete != null)
            {
                _context.Coaches.Remove(coachToDelete);
                await _context.SaveChangesAsync();
            }
            return coachToDelete;
        }

        public async Task<IEnumerable<Coach>> GetAll()
        {
            return await _context.Coaches.ToListAsync();
        }

        public async Task<Coach> GetById(int id)
        {
            return await _context.Coaches.FindAsync(id);
        }

        public async Task<IEnumerable<Coach>> Search(string searchKey)
        {
            IQueryable<Coach> query = _context.Coaches;
            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(x => x.Name.Contains(searchKey) ||
                         x.Location.Contains(searchKey)).ToListAsync();
        }

        public async Task<Coach> UpdateEntity(Coach updateEntity)
        {
            var coachToUpdate = _context.Coaches.Attach(updateEntity);
            coachToUpdate.State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return coachToUpdate.Entity;
        }
    }
}
