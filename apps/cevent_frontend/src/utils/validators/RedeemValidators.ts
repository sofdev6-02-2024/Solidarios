import { RegistrationInputDto } from '@/utils/interfaces/Registration';

export interface TicketRedeemFormData extends RegistrationInputDto {
  code?: string;
}

export interface ValidationErrors {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export const validateTicketRedeemForm = (
  formData: TicketRedeemFormData,
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last Name is required';
  }

  if (!formData.phoneNumber?.trim()) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = 'Phone number must be 10 digits';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
  ) {
    errors.email = 'Please enter a valid email address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
