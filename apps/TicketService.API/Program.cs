using dotenv.net;
using dotenv.net.Utilities;
using Microsoft.EntityFrameworkCore;
using TicketService.API.Database;
using TicketService.API.Repositories;
using TicketService.API.Services;
using TicketService.API.Utilities;

DotEnv.Load(new DotEnvOptions(
    envFilePaths: new[] { ".env" },
    ignoreExceptions: false,
    probeForEnv: true,
    probeLevelsToSearch: 6
));

var builder = WebApplication.CreateBuilder(args);
var connectionString = EnvReader.GetStringValue("CONNECTION_STRING");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<QrCodeGeneratorUtility>();
builder.Services.AddScoped<ITicketService, TicketService.API.Services.TicketService>();
builder.Services.AddScoped<ITicketRepository, TicketRepository>();

builder.Services.AddControllers();
builder.Services.AddDbContext<TicketDbContext>(options => { options.UseSqlServer(connectionString); });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<TicketDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.MapControllers();

app.Run();
