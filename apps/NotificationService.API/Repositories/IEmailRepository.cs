namespace NotificationService.Repositories;
public interface IEmailRepository
{
    void SendEmail(string email, string subject, string body);
}