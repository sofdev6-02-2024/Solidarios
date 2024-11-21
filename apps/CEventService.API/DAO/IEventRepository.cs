using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.DAO;
public interface IEventRepository : IBaseRepository<Event, int>
{
    
}