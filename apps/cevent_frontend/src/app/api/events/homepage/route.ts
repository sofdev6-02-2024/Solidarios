import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches the events for the home page
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '10';

  try {
    const response = await axios.get(`${BASE_URL}/events/api/event/homepage`, {
      params: {
        page: Number(page),
        pageSize: Number(pageSize),
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 },
    );
  }
}
