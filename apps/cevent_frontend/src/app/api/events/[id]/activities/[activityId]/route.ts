import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';


/**
 * Handles the PUT request to update activity status
 */
export async function PUT(request: Request, { params }: { params: { id: string; activityId: string } }) {
    try {
      const { id, activityId } = params;
      const requestBody = await request.json();
  
      const apiUrl = `${BASE_URL}/api/EventActivities/${id}/activities/${activityId}`;
      console.log("Sending PUT request to:", apiUrl);
      const response = await axios.put(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
      console.error('Error in PUT request:', error);
      return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
    }
  }
  