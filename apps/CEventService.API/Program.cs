using Microsoft.OpenApi.Models;
using CEventService.API.Data;
using Microsoft.EntityFrameworkCore;
using CEventService.API.DAO;
using CEventService.API.Models;
using CEventService.API.Services;
using CEventService.API.DTOs.Event;
using dotenv.net;
using dotenv.net.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

DotEnv.Load(options: new DotEnvOptions(
            envFilePaths: new[] { ".env" },
            ignoreExceptions: false,
            probeForEnv: true,
            probeLevelsToSearch: 6
        ));

var connectionString = EnvReader.GetStringValue("CONNECTION_STRING");
var authIssuer  = EnvReader.GetStringValue("AUTH_ISSUER");
var authAudience  = EnvReader.GetStringValue("AUTH_AUDIENCE");
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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = authIssuer;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = authIssuer,
            ValidAudience = authAudience,
        };

        options.MetadataAddress = $"{authIssuer}/.well-known/openid-configuration";
        options.SaveToken = true;
    });

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CEvent.API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
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

var app = builder.Build();
using(var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();

    await DataSeeder.SeedData(dbContext);
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