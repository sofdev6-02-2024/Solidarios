using Microsoft.AspNetCore.Mvc;
using NotificationService.Models;
using NotificationService.Services;

namespace NotificationService.Controllers;
[ApiController]
[Route("[controller]")]
public class MailController : ControllerBase
{
    private readonly IEmailService _emailService;

    public MailController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost]
    public IActionResult SendEmail(EmailRequest request)
    {
        _emailService.SendEmail(request.Email, request.Subject, request.Body);
        return Ok("Email sent successfully.");
    }
}