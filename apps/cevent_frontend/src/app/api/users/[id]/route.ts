import { NextResponse } from 'next/server';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    console.log('id :: ', id);
    const fullUrl = `${BASE_URL}/events/api/user/${id}`;
    console.log('fullUrl :: ', fullUrl);
    const response = await axios.get<UserInterface>(
      `${BASE_URL}/events/api/user/${id}`,
    );
    console.log('response :: ', response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to fetch user';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
