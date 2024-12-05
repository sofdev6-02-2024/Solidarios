import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { registerRegistration } from '@/services/RegistrationService';
import { validateTicket } from '@/services/TicketService';
import {
  validateTicketRedeemForm,
  ValidationErrors,
} from '@/utils/validators/RedeemValidators';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { TicketValidatedDto } from '@/utils/interfaces/TicketInterfaces';
import eventDetailsHtml from '@/utils/EmailBody';
import { NotificationScheduleRequestDto } from '@/utils/interfaces/NotificationInterfaces';
import { scheduleEmail } from '@/services/NotificationService';
import { RegistrationInputDto } from '@/utils/interfaces/Registration';

export const useTicketRedemption = (
  ticketId: string,
  event: EventDetailDto | null,
  ticket: TicketValidatedDto | null,
) => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationInputDto>({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    ticketId: ticketId,
    eventId: event?.id || -1,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const { isValid, errors } = validateTicketRedeemForm(formData);

    if (!isValid) {
      setErrors(errors);
      return false;
    }

    setIsSubmitting(true);
    try {
      if (ticket) {
        await validateTicket(ticket.qrContent);
        formData.ticketId = ticket.ticketId;
      }
      if (event) {
        formData.eventId = event.id;
        const now = new Date();

        now.setMinutes(now.getMinutes() + 1);
        now.setHours(now.getHours() + 4);

        const date = now.toISOString().split('T')[0];
        const hour = now.toTimeString().split(' ')[0];
        if (ticket) {
          const eventHtml = eventDetailsHtml
            .replace(/{venue}/g, event.venue)
            .replace(/{address}/g, event.address)
            .replace(/{category}/g, event.category.keyWord)
            .replace(/{description}/g, event.description)
            .replace(/{qrCode}/g, ticket.qrContent);
          const notificationBody: NotificationScheduleRequestDto = {
            emails: [formData.email],
            notificationBody: eventHtml,
            date: date,
            hour: hour,
          };
          await registerRegistration(formData); 
          await scheduleEmail(notificationBody);

          router.push('/');
        }
        return true;
      }
    } catch (error) {
      console.error('Ticket redemption failed', error);
      setErrors({ email: 'Submission failed. Please try again.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, ticket, router]);

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    setFormData,
  };
};
