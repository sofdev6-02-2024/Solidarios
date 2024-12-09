import {
  RegistrationInputDto,
  RegistrationOutputDto,
  UpdateStatusRegistration,
} from '@/utils/interfaces/Registration';
import axios from 'axios';

export const registerRegistration = async (
  registration: RegistrationInputDto,
): Promise<RegistrationOutputDto | null> => {
  try {
    const response = await axios.post('/api/registrations', registration);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateStatusRegistrationUser = async (
  ticketId: string,
  updateRegistration: UpdateStatusRegistration,
): Promise<UpdateStatusRegistration | null> => {
  console.log('datos a actualizar: ', updateRegistration);
  console.log('Ticket Id: ', ticketId);
  try {
    console.log('entro al servicio');
    const response = await axios.post<UpdateStatusRegistration>(
      `/api/registrations/updateStatus/${ticketId}`,
      updateRegistration,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating status:', error);
    return null;
  }
};
