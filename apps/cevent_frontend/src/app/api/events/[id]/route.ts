import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches a single event by id
 *
 * @param request  The request object
 * @param param1 The parameters object
 * @returns The response object
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const response = await axios.get(`${BASE_URL}/api/event?id=${params.id}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 },
    );
  }
}
