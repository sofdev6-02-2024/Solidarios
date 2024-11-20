import { NextResponse } from 'next/server';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    //TODO: fetch user by id when the API for fetching user by id is ready
    const data: UserInterface = {
      userId: 1,
      fullName: 'John Doe',
      email: 'jhondoe@hgon.com',
      phoneNumber: '123456789',
      profilePhotoUrl: 'https://i.postimg.cc/fW189xD9/2148859448.jpg',
      role: 'Admin',
      createdAt: new Date(),
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 },
    );
  }
}
