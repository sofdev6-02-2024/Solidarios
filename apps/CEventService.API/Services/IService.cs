using CEventService.API.DTOs.Event;

namespace CEventService.API.Services
{
    public interface IService<T>
    {
        Task<IEnumerable<T>> GetAllAsync(int page, int pageSize);
        Task<T?> GetByIdAsync(int id);
        Task<EventOutputDto> CreateEventAsync(EventInputDto newEvent);
        Task<bool?> UpdateEventAsync(int id, EventInputDto updatedEventDto, string userId);
        Task<bool> SoftDeleteEventAsync(int eventId, string requesterId);
    }
}