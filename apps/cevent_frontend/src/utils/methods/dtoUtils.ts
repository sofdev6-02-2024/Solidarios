import { EventDetailDto, EventInputDto } from "../interfaces/EventInterfaces";

export const detailEventDtoToInputEventDto = (eventDetail: EventDetailDto) : EventInputDto => {
    const eventInput : EventInputDto = {
        name: eventDetail.name,
        shortDescription: eventDetail.shortDescription,
        description: eventDetail.description,
        categoryId: eventDetail.categoryId,
        eventDate: eventDetail.eventDate,
        location: eventDetail.location,
        venue: eventDetail.venue,
        ticketPrice: eventDetail.ticketPrice,
        coverPhotoUrl: eventDetail.coverPhotoUrl,
        attendanceTrackingEnabled: eventDetail.attendanceTrackingEnabled,
        status: eventDetail.status,
        capacity: eventDetail.capacity,
        organizerUserId: eventDetail.organizerUserId,
        createdAt: eventDetail.createdAt,
        address: eventDetail.address,
        attendeeCount: eventDetail.attendeeCount,
        activities: eventDetail.activities,
    }

    return eventInput;
}