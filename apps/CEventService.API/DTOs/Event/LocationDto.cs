namespace CEventService.API.DTOs.Event;
using Models;

public class LocationDto : IMapFrom<Location>
{
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
}