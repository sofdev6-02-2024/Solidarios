using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public abstract class BaseService<T, TId> : IBaseService<T, TId> where T : BaseEntity<TId>
{
    private readonly IBaseRepository<T, TId> _repository;

    public BaseService(IBaseRepository<T, TId> repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<T>> GetAllAsync(int page, int pageSize)
    {
        return await _repository.GetAllAsync(page, pageSize);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<T?> GetByIdAsync(TId id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<T> CreateAsync(T entity)
    {
        return await _repository.CreateAsync(entity);
    }

    public async Task<T> UpdateAsync(TId id, T entity)
    {
        return await _repository.UpdateAsync(id, entity);
    }

    public async Task<int> SoftDeleteAsync(TId id)
    {
        return await _repository.SoftDeleteAsync(id);
    }
}