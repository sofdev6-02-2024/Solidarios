export interface TicketPostInterface {
  eventId: number;
  userId: string;
}

export interface TicketViewInterface {
  ticketId: number;
  qrContent: string;
}

export interface TicketFilter {
  eventId?: number;
  isUsed?: boolean;
}

export interface Ticket extends TicketViewInterface, TicketPostInterface {
  isUsed: boolean;
}
