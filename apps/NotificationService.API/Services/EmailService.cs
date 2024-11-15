using NotificationService.Repositories;

namespace NotificationService.Services;
public class EmailService : IEmailService
{
    private readonly IEmailRepository _emailRepository;

    public EmailService(IEmailRepository emailRepository)
    {
        _emailRepository = emailRepository;
    }

    public void SendEmail(string email, string subject, string body)
    {
        _emailRepository.SendEmail(email, subject, body);
    }
}