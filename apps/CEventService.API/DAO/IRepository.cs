namespace CEventService.API.DAO
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> GetAllEventsAsync(int skip, int take);
        Task<T?> GetEventByIdAsync(int id);
        Task<IEnumerable<T>> GetEventsForHomePageAsync();
    }
}