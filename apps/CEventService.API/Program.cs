using Microsoft.OpenApi.Models;
using CEventService.API.Data;
using Microsoft.EntityFrameworkCore;
using CEventService.API.DAO;
using CEventService.API.Services;
using dotenv.net;
using dotenv.net.Utilities;

DotEnv.Load(options: new DotEnvOptions(
            envFilePaths: new[] { ".env" },
            ignoreExceptions: false,
            probeForEnv: true,
            probeLevelsToSearch: 6
        ));

var connectionString = EnvReader.GetStringValue("CONNECTION_STRING");
var serviceDiscoveryUrl = EnvReader.GetStringValue("SERVICE_DISCOVERY_URL");
var serviceName = EnvReader.GetStringValue("SERVICE_NAME");
var serviceAddress = EnvReader.GetStringValue("SERVICE_ADRESS");
var servicePort = EnvReader.GetIntValue("SERVICE_PORT");
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null
        );
        sqlOptions.CommandTimeout(30);
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CEvent.API", Version = "v1" });
});

var app = builder.Build();
using(var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();

    await DataSeeder.SeedData(dbContext);
}

using (var httpClient = new HttpClient())
{
    var serviceDiscoveryClient = new ServiceDiscoveryClient(httpClient,serviceDiscoveryUrl, serviceName, serviceAddress, servicePort);
    await serviceDiscoveryClient.RegisterServiceAsync();
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CEvent API");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowAllOrigins");

app.UseAuthorization();
app.MapControllers();

app.Run();