using AutoMapper;
using CEventService.API.DAO;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public EventService(IEventRepository eventRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Event>> GetAllAsync(int page, int pageSize)
        {
            return await _eventRepository.GetAllAsync((page - 1) * page, pageSize);
        }

        public async Task<Event?> GetByIdAsync(int id)
        {
            return await _eventRepository.GetByIdAsync(id);
        }

        public async Task<EventOutputDto> CreateEventAsync(EventInputDto newEventDto)
        {
            var eventEntity = _mapper.Map<Event>(newEventDto);
            var createdEvent = await _eventRepository.CreateEventAsync(eventEntity);
            return _mapper.Map<EventOutputDto>(createdEvent);
        }  

        public async Task<IEnumerable<EventHomePageDto>> GetEventsForHomePageAsync(int page, int pageSize)
        {
            return await _eventRepository.GetEventsForHomePageAsync(page, pageSize);
            
        }
    }
}