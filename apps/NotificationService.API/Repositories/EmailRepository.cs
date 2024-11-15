using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace NotificationService.Repositories;
public class EmailRepository : IEmailRepository
{
    public void SendEmail(string email, string subject, string body)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Cevent App", "solidariossolidarios62@gmail.com"));
        message.To.Add(new MailboxAddress("", email));
        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = body };

        using (var client = new SmtpClient())
        {
            client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            client.Authenticate("solidariossolidarios62@gmail.com", "");
            client.Send(message);
            client.Disconnect(true);
        }
    }
}