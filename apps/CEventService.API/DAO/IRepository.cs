namespace CEventService.API.DAO
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> GetAllAsync(int page, int pageSize);
        Task<T?> GetByIdAsync(int id);
        Task<T> CreateAsync(T newElement);
        Task UpdateAsync(T updatedElement);
        Task<bool> SoftDeleteAsync(int id, string requesterId);
    }
}