using CEventService.API.Data;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public class ActivityRepository : BaseRepository<Activity, int>, IActivityRepository
{
    public ActivityRepository(AppDbContext context) : base(context)
    {
    }
}