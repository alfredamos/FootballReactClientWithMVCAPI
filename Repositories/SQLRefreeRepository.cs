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
    public class SQLRefreeRepository : IRefreeRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLRefreeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Refree> AddEntity(Refree newEntity)
        {
            var Refree = await _context.Refrees.AddAsync(newEntity);
            await _context.SaveChangesAsync();
            return Refree.Entity;
        }

        public async Task<Refree> DeleteEntity(int id)
        {
            var RefreeToDelete = await _context.Refrees.FindAsync(id);
            if (RefreeToDelete != null)
            {
                _context.Refrees.Remove(RefreeToDelete);
                await _context.SaveChangesAsync();
            }
            return RefreeToDelete;
        }

        public async Task<IEnumerable<Refree>> GetAll()
        {
            return await _context.Refrees.ToListAsync();
        }

        public async Task<Refree> GetById(int id)
        {
            return await _context.Refrees.FindAsync(id);
        }

        public async Task<IEnumerable<Refree>> Search(string searchKey)
        {
            IQueryable<Refree> query = _context.Refrees;
            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(x => x.Name.Contains(searchKey) ||
                   x.Location.Contains(searchKey) || x.Rank.Contains(searchKey))
                   .ToListAsync();
        }

        public async Task<Refree> UpdateEntity(Refree updateEntity)
        {
            var RefreeToUpdate = _context.Refrees.Attach(updateEntity);
            RefreeToUpdate.State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return RefreeToUpdate.Entity;
        }
    }
}
