namespace CEventService.API.Services
{
    public interface IService<T,T_DTO>
    {
        Task<IEnumerable<T>> GetAllEventsAsync(int skip, int take);
        Task<T?> GetEventByIdAsync(int id);
        Task<IEnumerable<T_DTO>> GetEventsForHomePageAsync();
    }
}