using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public class AttendanceMap : BaseMap<Attendance, int>
{
    public override void Configure(EntityTypeBuilder<Attendance> builder)
    {
        base.Configure(builder);
        ConfigureEnumConversion(builder);
    }

    protected override void ConfigureRelationships(EntityTypeBuilder<Attendance> builder)
    {
        builder.HasOne(a => a.User)
            .WithMany(u => u.Attendances)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired();
    }

    private static void ConfigureEnumConversion(EntityTypeBuilder<Attendance> builder)
    {
        builder.Property(a => a.Status).HasConversion<string>();
    }
}