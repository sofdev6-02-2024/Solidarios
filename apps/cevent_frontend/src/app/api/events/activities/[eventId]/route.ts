import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches event activities by eventId and status
 *
 * @param request  The request object
 * @param context  The context object containing route parameters
 * @returns The response object
 */
export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  const { eventId } = params; 
  const url = new URL(request.url); 
  const status = url.searchParams.get('status'); 

  if (!status) {
    return NextResponse.json(
      { error: 'Status parameter is required' },
      { status: 400 },
    );
  }

  try {
    const apiUrl = `${BASE_URL}/events/api/EventActivities/${eventId}/activities/status?status=${status}`;
    console.log("Fetching from:", apiUrl); 
    const response = await axios.get(apiUrl);
    console.log(response);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event activities' },
      { status: 500 },
    );
  }
}
