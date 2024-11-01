namespace CEventService.API.DAO
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> GetAllAsync(int page, int pageSize);
        Task<T?> GetByIdAsync(int id);
        Task<T> CreateAsync(T newElement);
        Task<T> UpdateAsync(T updatedElement);
    }
}