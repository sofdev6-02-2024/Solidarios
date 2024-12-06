import {
  RegistrationInputDto,
  RegistrationOutputDto,
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
