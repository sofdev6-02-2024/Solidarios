import { NextResponse } from 'next/server';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ErrorResponse, SuccessResponse } from '@/utils/interfaces/EventInterfaces';
import axios from 'axios';

export async function POST(
  req: Request,
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = `${BASE_URL}/events/api/Event`;
    const postBody = await req.json();
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token not found' },
        { status: 401 },
      );
    }

    const response = await axios.post(url, postBody, {
      headers: {
        'accept': 'text/plain',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json({ data: response.data }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data || error.message;
      return NextResponse.json(
        { error: errorMessage },
        { status: error.response?.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}