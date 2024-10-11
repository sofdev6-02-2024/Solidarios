namespace email_poc
{
    public class Program
    {
        static void Main(string[] args)
        {
            var emailService = new EmailService("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");
            var email = emailService.CreateEmailContent();
            emailService.SendEmail(email);
        }
    }
}
