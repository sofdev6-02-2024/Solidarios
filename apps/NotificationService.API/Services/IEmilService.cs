namespace NotificationService.Services;
public interface IEmailService
{
    void SendEmail(string email, string subject, string body);
}