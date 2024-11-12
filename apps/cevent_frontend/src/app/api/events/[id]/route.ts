import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches a single event by id
 *
 * @param request  The request object
 * @param context  The context object containing route parameters
 * @returns The response object
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }, // Aquí extraemos el parámetro `id`
) {
  const { id } = params; // Extraemos el `id` de los parámetros
  console.log('id peticion:', id);
  try {
    const response = await axios.get(
      `${BASE_URL}/events/api/event/${id}`, // Usamos el `id` en la URL
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 },
    );
  }
}
