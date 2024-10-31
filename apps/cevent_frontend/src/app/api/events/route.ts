import { NextResponse } from "next/server";
import { getAccessToken } from "@/utils/sessionTokenAccessor";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

interface Location {
  latitude: number;
  longitude: number;
}

interface Event {
  name: string;
  description: string;
  category: string;
  eventDate: string;
  location: Location;
  venue: string;
  address: string;
  ticketPrice: number;
  coverPhotoUrl: string;
  attendanceTrackingEnabled: boolean;
  capacity: number;
}

interface EventResponse extends Event {
  eventId: number;
}

interface PaginatedResponse {
  items: EventResponse[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
}

interface SuccessResponse {
  data: EventResponse | PaginatedResponse;
}

interface ErrorResponse {
  error: string;
}

export async function POST(
  req: Request
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!process.env.BACKEND_URL) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const url = `${process.env.BACKEND_URL}/api/Event`;
    const postBody: Event = await req.json();
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token not found" },
        { status: 401 }
      );
    }
    console.log(accessToken)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    if (!process.env.BACKEND_URL) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const { searchParams, pathname } = new URL(req.url);
  
    const eventId = searchParams.get('id') || '1';
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';

    let url: string;
    console.log(eventId)
    if (eventId && !isNaN(Number(eventId))) {
      url = `${process.env.BACKEND_URL}/api/Event/${eventId}`;
    }
    else if (searchParams.has('homepage')) {
      url = `${process.env.BACKEND_URL}/api/Event/homepage?page=${page}&pageSize=${pageSize}`;
    }
    else {
      url = `${process.env.BACKEND_URL}/api/Event?page=${page}&pageSize=${pageSize}`;
    }
    console.log(url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}