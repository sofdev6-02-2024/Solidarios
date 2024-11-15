using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO;

public abstract class BaseRepository <T, TId> : IBaseRepository<T, TId> where T : BaseEntity<TId>
{
    protected readonly AppDbContext _dbContext;

    public BaseRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<IEnumerable<T>> GetAllAsync(int page, int pageSize)
    {
        return await _dbContext.Set<T>()
            .Where(e => !e.IsDeleted)
            .Skip(page)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbContext.Set<T>().
            Where(e => !e.IsDeleted).
            ToListAsync();
    }

    public async Task<T?> GetByIdAsync(TId id)
    {
        var entity = await _dbContext.FindAsync<T>(id);
        return !entity.IsDeleted ? entity : null;
    }

    public async Task<T> CreateAsync(T entity)
    {
        entity.IsDeleted = false;
        _dbContext.Set<T>().Add(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public async Task<T> UpdateAsync(TId id, T entity)
    {
        entity.Id = id;
        entity.IsDeleted = false;
        var existingEntity = await GetByIdAsync(id);
        if (existingEntity == null)
        {
            throw new KeyNotFoundException("Entity not found in the database.");
        }
        
        _dbContext.Entry(existingEntity).CurrentValues.SetValues(entity);
        await _dbContext.SaveChangesAsync();

        return existingEntity;
    }

    public async Task<int> SoftDeleteAsync(TId id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            await UpdateAsync(entity.Id, entity);
        }

        return await _dbContext.SaveChangesAsync();
    }
}