using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SubscriberTest;

var builder = WebApplication.CreateBuilder(args);

// Register SubscriptionService
builder.Services.AddSingleton<SubscriptionService>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:5233")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});


var app = builder.Build();

// Subscribe to Event Bus on startup
var subscriptionService = app.Services.GetRequiredService<SubscriptionService>();
await subscriptionService.SubscribeToEventBusAsync();

app.UseCors("AllowSpecificOrigin");
app.MapControllers();
app.Run();