import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import axios from 'axios';

export const getUserById = async (
  id: number,
): Promise<UserInterface | null> => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
