INSERT INTO Events (
    Name, Description, Category, EventDate, 
    Location_Latitude, Location_Longitude, Venue, TicketPrice, 
    CoverPhotoUrl, AttendanceTrackingEnabled, Status, Capacity, 
    OrganizerUserId, CreatedAt, Address, AttendeeCount, IsDeleted, DeletedAt
)
VALUES 
('Tech Conference 2024', 'A conference about emerging technologies and their impact on society.', 
 'Technology', '2024-09-15 09:00:00', 37.7749, -122.4194, 'City Convention Center', 299.99, 
 'https://example.com/conference-cover.jpg', 1, 'Pending', 500, '1001', GETUTCDATE(), 
 '123 Tech St, San Francisco, CA', 0z, 1, GETUTCDATE()),

('Art Expo 2024', 'A display of modern art from emerging artists.', 
 'Art', '2024-10-05 10:00:00', 40.7128, -74.0060, 'National Art Gallery', 150.50, 
 'https://example.com/art-expo-cover.jpg', 0, 'Confirmed', 200, '1002', GETUTCDATE(), 
 '123 Art St, New York, NY', 0z, 0, NULL),

('Music Festival 2024', 'A 3-day music festival featuring international artists.', 
 'Music', '2024-11-20 12:00:00', 34.0522, -118.2437, 'City Park', 499.99, 
 'https://example.com/music-festival-cover.jpg', 1, 'Pending', 1000, '1003', GETUTCDATE(), 
 '123 Park St, Los Angeles, CA', 0z, 0, NULL),

('Business Summit 2024', 'A summit for business leaders and entrepreneurs.', 
 'Business', '2024-12-01 08:00:00', 51.5074, -0.1278, 'Downtown Convention Center', 399.99, 
 'https://example.com/business-summit-cover.jpg', 1, 'Confirmed', 300, '1004', GETUTCDATE(), 
 '123 Business St, London, UK', 0z, 0, NULL),

('Food and Wine Expo 2024', 'An event showcasing food and wine from around the world.', 
 'Food', '2024-10-25 14:00:00', 48.8566, 2.3522, 'Expo Center', 199.99, 
 'https://example.com/food-wine-expo-cover.jpg', 0, 'Pending', 800, '1005', GETUTCDATE(), 
 '123 Food St, Paris, France', 0z, 0, NULL),

('Marathon 2024', 'A city-wide marathon open to participants of all levels.', 
 'Sports', '2024-10-10 07:00:00', 34.0522, -118.2437, 'Downtown LA', 50.00, 
 'https://example.com/marathon-cover.jpg', 1, 'Confirmed', 5000, '1006', GETUTCDATE(), 
 '123 Marathon St, Los Angeles, CA', 0z, 0, NULL),

('Startup Pitch Night', 'Pitch your startup idea to top investors.', 
 'Business', '2024-09-30 18:00:00', 40.7306, -73.9352, 'NYC Tech Hub', 0.00, 
 'https://example.com/startup-pitch-cover.jpg', 1, 'Confirmed', 100, '1007', GETUTCDATE(), 
 '456 Innovation Ave, New York, NY', 0z, 0, NULL),

('Film Festival 2024', 'A week-long film festival showcasing independent films.', 
 'Film', '2024-11-01 10:00:00', 34.0522, -118.2437, 'Hollywood Theater', 100.00, 
 'https://example.com/film-festival-cover.jpg', 1, 'Pending', 300, '1008', GETUTCDATE(), 
 '789 Cinema Blvd, Los Angeles, CA', 0z, 0, NULL),

('Yoga Retreat 2024', 'A weekend retreat to relax and reconnect.', 
 'Health', '2024-09-22 08:00:00', 32.7157, -117.1611, 'Seaside Resort', 250.00, 
 'https://example.com/yoga-retreat-cover.jpg', 0, 'Confirmed', 50, '1009', GETUTCDATE(), 
 '101 Beach Rd, San Diego, CA', 0z, 0, NULL),

('Gaming Convention 2024', 'A convention for gamers and developers alike.', 
 'Technology', '2024-08-15 09:00:00', 36.1699, -115.1398, 'Vegas Convention Center', 350.00, 
 'https://example.com/gaming-convention-cover.jpg', 1, 'Pending', 10000, '1010', GETUTCDATE(), 
 '123 Game St, Las Vegas, NV', 0z, 0, NULL),

('Comic Book Expo 2024', 'An event for comic book fans and artists.', 
 'Art', '2024-07-20 10:00:00', 41.8781, -87.6298, 'Chicago Convention Center', 200.00, 
 'https://example.com/comic-expo-cover.jpg', 1, 'Confirmed', 500, '1011', GETUTCDATE(), 
 '456 Comic Rd, Chicago, IL', 0z, 0, NULL),

('Cooking Masterclass', 'A cooking class with a world-renowned chef.', 
 'Food', '2024-10-18 15:00:00', 52.5200, 13.4050, 'Berlin Culinary School', 300.00, 
 'https://example.com/cooking-class-cover.jpg', 0, 'Pending', 30, '1012', GETUTCDATE(), 
 '789 Gourmet Ln, Berlin, Germany', 0z, 0, NULL),

('Photography Workshop', 'Learn photography techniques from professionals.', 
 'Art', '2024-09-10 10:00:00', 40.4168, -3.7038, 'Madrid Art Center', 150.00, 
 'https://example.com/photography-workshop-cover.jpg', 0, 'Confirmed', 20, '1013', GETUTCDATE(), 
 '101 Picture St, Madrid, Spain', 0z, 0, NULL),

('Fitness Bootcamp', 'An intensive fitness training program.', 
 'Health', '2024-09-05 06:00:00', 34.0522, -118.2437, 'City Gym', 75.00, 
 'https://example.com/fitness-bootcamp-cover.jpg', 1, 'Pending', 100, '1014', GETUTCDATE(), 
 '123 Fit St, Los Angeles, CA', 0z, 0, NULL),

('Jazz Night 2024', 'A night of live jazz music.', 
 'Music', '2024-12-05 19:00:00', 51.5074, -0.1278, 'London Jazz Club', 80.00, 
 'https://example.com/jazz-night-cover.jpg', 0, 'Confirmed', 150, '1015', GETUTCDATE(), 
 '456 Jazz Rd, London, UK', 0z, 0, NULL),

('Science Fair 2024', 'A fair to explore science projects by students.', 
 'Science', '2024-10-20 09:00:00', 37.7749, -122.4194, 'SF Science Center', 0.00, 
 'https://example.com/science-fair-cover.jpg', 1, 'Pending', 200, '1016', GETUTCDATE(), 
 '789 Science Blvd, San Francisco, CA', 0z, 1, GETUTCDATE()),

('History Symposium', 'A symposium to discuss historical events and their impact.', 
 'History', '2024-11-10 08:00:00', 41.9028, 12.4964, 'Rome Historical Center', 100.00, 
 'https://example.com/history-symposium-cover.jpg', 1, 'Confirmed', 50, '1017', GETUTCDATE(), 
 '123 History St, Rome, Italy', 0z, 1, GETUTCDATE()),

('Startup Bootcamp', 'A bootcamp for aspiring entrepreneurs.', 
 'Business', '2024-12-10 08:00:00', 1.3521, 103.8198, 'Singapore Tech Hub', 500.00, 
 'https://example.com/startup-bootcamp-cover.jpg', 0, 'Pending', 100, '1018', GETUTCDATE(), 
 '456 Startup Rd, Singapore', 0z, 1, GETUTCDATE());
