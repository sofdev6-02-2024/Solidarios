export function validateName(title: string): string | null {
  if (!title) return 'Event name is required.';
  if (title.length < 10) return 'Title must be at least 10 characters long.';
  if (title.length > 100) return 'Event Title must not exceed 100 characters.';
  return null;
}

export function validateShortDescription(shortDescription: string): string | null {
  if (!shortDescription) return 'Short description is required.';
  if (shortDescription.length < 10) return 'Description must be at least 10 characters long.';
  if (shortDescription.length > 250) return 'Short description must not exceed 250 characters.';
  return null;
}

export function validateDescription(description: string): string | null {
  if (!description) return 'Description is required.';
  if (description.length < 20) return 'Description must be at least 20 characters long.';
  return null;
}

export function validateEventDate(eventDate: Date): string | null {
  if (!eventDate) return 'Enter the date of the event.';
  if (eventDate < new Date()) return 'Event date must be in the future.';
  return null;
}

export function validateEventHour(eventDate: string): string | null {
  if (!eventDate) return 'Enter the time of the event.';
  return null;
}

export function validateLocation(location: any): string | null {
  if (!location) return 'Choose a place on the map for the location of the event.';
  return null;
}

export function validateVenue(venue: string): string | null {
  if (!venue) return 'Venue is required.';
  if (venue.length > 150) return 'Venue must not exceed 150 characters.';
  return null;
}

export function validateCapacity(capacity: number): string | null {
  if (capacity === undefined || capacity === null) return 'Enter the capacity of the event.';
  if (capacity === 0) return 'Capacity cannot be zero';
  if (capacity < 0) return 'Capacity must be zero or positive.';
  return null;
}

export function validateTicketPrice(ticketPrice: number): string | null {
  if (ticketPrice === undefined || ticketPrice === null) return 'Ticket price is required.';
  if (ticketPrice === 0) return 'Ticket price cannot be zero';
  if (ticketPrice < 0) return 'Ticket price must be zero or positive.';
  return null;
}

export function validateOrganizerUserId(organizerUserId: string): string | null {
  if (!organizerUserId) return 'OrganizerUserId is required.';
  return null;
}

export function validateCreatedAt(createdAt: Date): string | null {
  if (!createdAt) return 'CreatedAt is required.';
  if (createdAt > new Date()) return 'CreatedAt cannot be a future date.';
  return null;
}

export function validateAttendeeCount(attendeeCount: number): string | null {
  if (attendeeCount === undefined || attendeeCount === null) return 'AttendeeCount is required.';
  if (attendeeCount < 0) return 'AttendeeCount must be zero or positive.';
  return null;
}

export function validateActivities(activities: any[]): string | null {
  if (!activities || !Array.isArray(activities)) return 'Activities must be an array.';
  // Agregar validaciones específicas para cada actividad si es necesario
  return null;
}

export function validateCoOrganizers(coOrganizers: string[]): string | null {
  if (!coOrganizers || !Array.isArray(coOrganizers)) return 'Co-organizers must be an array.';
  for (const coOrganizerId of coOrganizers) {
    if (!coOrganizerId) return 'Co-organizer IDs must not be empty.';
    if (!isValidGuid(coOrganizerId)) return 'Each Co-organizer ID must be a valid Guid.';
  }
  return null;
}

// Función auxiliar para validar GUIDs
function isValidGuid(value: string): boolean {
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return guidRegex.test(value);
}
