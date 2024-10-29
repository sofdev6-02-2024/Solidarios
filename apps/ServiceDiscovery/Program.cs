using Consul;
using ServiceDiscovery.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var consulAddress = builder.Configuration["Consul:Address"] ?? "http://localhost:8500";
builder.Services.AddSingleton<IConsulClient, ConsulClient>(p => new ConsulClient(config =>
{
    config.Address = new Uri(consulAddress);
}));

// Register IServiceRegistrar and its implementation
builder.Services.AddSingleton<IServiceRegister, ConsulServiceRegister>();
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Service Discovery API",
        Description = "API for managing service registration and discovery",
        Contact = new OpenApiContact
        {
            Name = "Your Name",
            Email = "your-email@example.com",
            Url = new Uri("https://yourwebsite.com")
        }
    });
});

var app = builder.Build();

// Enable Swagger in the application
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Service Discovery API V1");
        c.RoutePrefix = string.Empty; // Makes Swagger available at the root URL
    });
}

// Map Controllers
app.MapControllers();

app.Run();