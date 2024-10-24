using AutoMapper;
using CEventService.API.DAO;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.Services
{
    public class EventService : IService<Event, EventHomePageDto>
    {
        private readonly IRepository<Event> _eventRepository;
        private readonly IMapper _mapper;

        public EventService(IRepository<Event> eventRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync(int skip, int take)
        {
            return await _eventRepository.GetAllEventsAsync((skip - 1) * take, take);
        }

        public async Task<Event?> GetEventByIdAsync(int id)
        {
            return await _eventRepository.GetEventByIdAsync(id);
        }

        public async Task<IEnumerable<EventHomePageDto>> GetEventsForHomePageAsync()
        {
            var events = await _eventRepository.GetEventsForHomePageAsync();
            return _mapper.Map<IEnumerable<EventHomePageDto>>(events);
        }
    }
}