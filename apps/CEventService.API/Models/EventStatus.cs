namespace CEventService.API.Models;

public enum EventStatus
{
    Draft = 0,
    Pending = 1,
    Approved = 2,
    Scheduled = 3,
    Cancelled = 4,
    Postponed = 5,
    InProgress = 6,
    Completed = 7,
    OnHold = 8,
    Closed = 9
}