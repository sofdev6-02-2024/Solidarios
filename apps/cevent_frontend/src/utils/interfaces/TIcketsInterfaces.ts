export interface TicketPostInterface {
  eventId: number;
  userId: string;
}

export interface TicketViewInterface {
  ticketId: number;
  qrContent: string;
}

export interface TicketQrContentInterface {
  ticketId: number;
  qrContent: string;
  userId: string;
  eventId: string;
  isUsed: boolean;
}


export interface TicketFilter {
  eventId?: number;
  isUsed?: boolean;
}

export interface Ticket extends TicketViewInterface, TicketPostInterface {
  isUsed: boolean;
}
