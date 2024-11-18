using Microsoft.EntityFrameworkCore;
using CEventService.API.Models;

namespace CEventService.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>().HasQueryFilter(e => !e.IsDeleted);
            
            modelBuilder.Entity<Event>()
                .Property(e => e.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Event>()
                .OwnsOne(e => e.Location);
        }
    }
}