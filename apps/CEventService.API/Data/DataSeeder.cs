using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.Data
{
    public static class DataSeeder
    {
        public static async Task SeedData(AppDbContext context)
        {
            if (!await context.Events.AnyAsync())
            {
                await context.Events.AddRangeAsync(
                    new Event
                    {
                        Name = "Tech Conference 2024",
                        Description = "A conference about emerging technologies and their impact on society.",
                        Category = "Technology",
                        EventDate = new DateTime(2024, 9, 15, 9, 0, 0),
                        Venue = "City Convention Center",
                        TicketPrice = 299.99m,
                        CoverPhotoUrl = "https://example.com/conference-cover.jpg",
                        AttendanceTrackingEnabled = true,
                        Status = "Pending",
                        Capacity = 500,
                        OrganizerUserId = "1001",
                        CreatedAt = DateTime.UtcNow,
                        Location = new Location 
                        { 
                            Latitude = 37.7749m, 
                            Longitude = -122.4194m 
                        },
                        Address = "123 Tech St, San Francisco, CA",
                        AttendeeCount = 0
                    },
                    new Event
                    {
                        Name = "Art Expo 2024",
                        Description = "A display of modern art from emerging artists.",
                        Category = "Art",
                        EventDate = new DateTime(2024, 10, 5, 10, 0, 0),
                        Venue = "National Art Gallery",
                        TicketPrice = 150.50m,
                        CoverPhotoUrl = "https://example.com/art-expo-cover.jpg",
                        AttendanceTrackingEnabled = false,
                        Status = "Confirmed",
                        Capacity = 200,
                        OrganizerUserId = "1002",
                        CreatedAt = DateTime.UtcNow,
                        Location = new Location 
                        { 
                            Latitude = 40.7128m, 
                            Longitude = -74.0060m 
                        },
                        Address = "123 Tech St, San Francisco, CA",
                        AttendeeCount = 0
                    },
                    new Event
                    {
                        Name = "Music Festival 2024",
                        Description = "A 3-day music festival featuring international artists.",
                        Category = "Music",
                        EventDate = new DateTime(2024, 11, 20, 12, 0, 0),
                        Venue = "City Park",
                        TicketPrice = 499.99m,
                        CoverPhotoUrl = "https://example.com/music-festival-cover.jpg",
                        AttendanceTrackingEnabled = true,
                        Status = "Pending",
                        Capacity = 1000,
                        OrganizerUserId = "1003",
                        CreatedAt = DateTime.UtcNow,
                        Location = new Location 
                        { 
                            Latitude = 34.0522m, 
                            Longitude = -118.2437m 
                        },
                        Address = "123 Tech St, San Francisco, CA",
                        AttendeeCount = 0
                    },
                    new Event
                    {
                        Name = "Business Summit 2024",
                        Description = "A summit for business leaders and entrepreneurs.",
                        Category = "Business",
                        EventDate = new DateTime(2024, 12, 1, 8, 0, 0),
                        Venue = "Downtown Convention Center",
                        TicketPrice = 399.99m,
                        CoverPhotoUrl = "https://example.com/business-summit-cover.jpg",
                        AttendanceTrackingEnabled = true,
                        Status = "Confirmed",
                        Capacity = 300,
                        OrganizerUserId = "1004",
                        CreatedAt = DateTime.UtcNow,
                        Location = new Location 
                        { 
                            Latitude = 51.5074m, 
                            Longitude = -0.1278m 
                        },
                        Address = "123 Tech St, San Francisco, CA",
                        AttendeeCount = 0
                    },
                    new Event
                    {
                        Name = "Food and Wine Expo 2024",
                        Description = "An event showcasing food and wine from around the world.",
                        Category = "Food",
                        EventDate = new DateTime(2024, 10, 25, 14, 0, 0),
                        Venue = "Expo Center",
                        TicketPrice = 199.99m,
                        CoverPhotoUrl = "https://example.com/food-wine-expo-cover.jpg",
                        AttendanceTrackingEnabled = false,
                        Status = "Pending",
                        Capacity = 800,
                        OrganizerUserId = "1005",
                        CreatedAt = DateTime.UtcNow,
                        Location = new Location 
                        { 
                            Latitude = 48.8566m, 
                            Longitude = 2.3522m 
                        },
                        Address = "123 Tech St, San Francisco, CA",
                        AttendeeCount = 0
                    }
                );

                await context.SaveChangesAsync();
            }
        }
    }
}
