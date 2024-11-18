using Microsoft.EntityFrameworkCore;
using NotificationService.BackgroundServices;
using NotificationService.Data;
using NotificationService.Middlewares;
using NotificationService.Repositories;
using NotificationService.Services;
using NotificationService.Validations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHostedService<NotificationBackgroundService>();
builder.Services.AddDbContext<NotificationDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("NotSqlConnectionString"))
);

builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IEmailRepository, EmailRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<INotificationService, NotififierService>();
builder.Services.AddScoped<INotifcationValidation, ScheduledNotificationValidation>();
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlingMiddleware>();
app.MapControllers();
app.UseHttpsRedirection();
app.Run();