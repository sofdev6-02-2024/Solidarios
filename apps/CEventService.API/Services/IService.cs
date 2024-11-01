using CEventService.API.DTOs.Event;

namespace CEventService.API.Services
{
    public interface IService<T>
    {
        Task<IEnumerable<T>> GetAllAsync(int page, int pageSize);
        Task<T?> GetByIdAsync(int id);
        Task<EventOutputDto> CreateEventAsync(EventInputDto newEvent);
    }
}