import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function PUT(
    request: Request,
    { params }: { params: { id: string; userId: string } },
) {
    const { id, userId } = params;
    const updatedData = await request.json();

    try {
        const response = await axios.put(
            `${BASE_URL}/events/api/event/${id}`,
            updatedData,
            {
                headers: { 'userId': userId },
            },
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json(
            { error: 'Failed to update event' },
            { status: 500 },
        );
    }
}
