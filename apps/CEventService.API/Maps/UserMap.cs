using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public class UserMap : BaseMap<User, Guid>
{
    protected override void ConfigureRelationships(EntityTypeBuilder<User> builder)
    {
        builder.HasMany(u => u.EventsCreated)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.OrganizerUserId)
            .IsRequired();

        builder.HasMany(u => u.Registrations)
            .WithOne(r => r.User)
            .HasForeignKey(r => r.UserId)
            .IsRequired();
        
        builder.HasMany(u => u.CoOrganizedEvents)
            .WithMany(e => e.CoOrganizers)
            .UsingEntity<Dictionary<string, object>>(
                "EventCoOrganizer",
                u => u.HasOne<Event>().WithMany().HasForeignKey("EventId"),
                e => e.HasOne<User>().WithMany().HasForeignKey("UserId"));

        builder.HasMany(u => u.Attendances)
            .WithOne(a => a.User)
            .HasForeignKey(a => a.UserId)
            .IsRequired();
    }
}