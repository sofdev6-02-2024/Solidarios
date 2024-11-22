using Microsoft.EntityFrameworkCore;

namespace NotificationService.Data;
public class NotificationDbContext : DbContext
{
    public NotificationDbContext(DbContextOptions<NotificationDbContext> options)
        : base(options)
    {
    }

    public DbSet<ScheduledNotification> ScheduledNotifications { get; set; }
}