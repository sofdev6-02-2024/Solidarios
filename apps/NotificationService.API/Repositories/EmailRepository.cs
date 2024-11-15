using System.IO;
using dotenv.net;
using dotenv.net.Utilities;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace NotificationService.Repositories
{
    public class EmailRepository : IEmailRepository
    {
        private readonly string _emailTemplate;
        public EmailRepository()
        {
            DotEnv.Load();
            _emailTemplate = File.ReadAllText("Templates/EmailTemplate.html");
        }

        public void SendEmail(string email, string subject, string body)
        {
            var appMailPassword = EnvReader.GetStringValue("APP_MAIL_PASSWORD");
            var appMailEmail = EnvReader.GetStringValue("APP_MAIL_EMAIL");
            var appMailName = EnvReader.GetStringValue("APP_MAIL_NAME");

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(appMailName, appMailEmail));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = _emailTemplate.Replace("{{MESSAGE_BODY}}", body);
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate(appMailEmail, appMailPassword);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}