using CEventService.API.Data;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public class RegistrationRepository : BaseRepository<Registration, int>, IRegistrationRepository
{
    public RegistrationRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public override Task<Registration> CreateAsync(Registration entity)
    {
        entity.AttendanceStatus = AttendanceStatus.Absent;
        return base.CreateAsync(entity);
    }
}