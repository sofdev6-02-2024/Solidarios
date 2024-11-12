using DotNetEnv;
using Microsoft.Extensions.DependencyInjection;
using EventBus.Extensions;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

// Configure services using extension methods
builder.Services.ConfigureMongoDB(builder.Configuration);
builder.Services.ConfigureRepositories();
builder.Services.ConfigureServices();
builder.Services.ConfigureSwagger();

builder.Services.AddControllers();

var app = builder.Build();

// Enable Swagger in Development and Production
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "EventBus API v1");
        c.RoutePrefix = string.Empty;  // Sets Swagger UI at the app's root (e.g., http://localhost:5000/)
    });
}

app.MapControllers();
app.Run();