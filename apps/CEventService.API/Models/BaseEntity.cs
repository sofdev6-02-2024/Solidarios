namespace CEventService.API.Models;

public class BaseEntity<TId>
{
    public TId Id { get; set; }
    public bool IsDeleted { get; set; }
}