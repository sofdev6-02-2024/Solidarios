using Microsoft.AspNetCore.Mvc;
using NotificationService.Dtos;
using NotificationService.Services;

namespace NotificationService.Controllers;

[ApiController]
[Route("[controller]")]
public class MailController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public MailController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost("schedule")]
    public async Task<ActionResult<ScheduledNotification>> CreateScheduledNotification(ScheduleNotificationRequest request)
    {
        var notification = new ScheduledNotification
        {
            ScheduledTime = new DateTimeOffset(request.Date.ToDateTime(request.Hour)),
            NotificationBody = request.NotificationBody,
            Recipients = string.Join(",", request.Emails)
        };

        await _notificationService.CreateScheduledNotificationAsync(notification);
        return Ok(notification);
    }

    [HttpPatch("schedule/{id}")]
    public async Task<ActionResult<ScheduledNotification>> UpdateScheduledNotification(Guid id, UpdateNotificationRequest request)
    {
        var updatedNotification = new ScheduledNotification
        {
            ScheduledTime = DateTimeOffset.Now,
            NotificationBody = request.NotificationBody ?? "",
            Recipients = string.Join(",", request.Emails)
        };

        await _notificationService.UpdateScheduledNotificationAsync(id, updatedNotification);
        return Ok(updatedNotification);
    }

    [HttpDelete("schedule/{id}")]
    public async Task<IActionResult> DeleteScheduledNotification(Guid id)
    {
        await _notificationService.DeleteScheduledNotificationAsync(id);
        return Ok("Notification deleted successfully.");
    }
}