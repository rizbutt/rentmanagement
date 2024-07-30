// app/api/rent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import RentService from '../../services/RentService';
import dbConnect from '../../utils/dbConnect';

export async function GET(req: NextRequest) {
  await dbConnect();
  const rentService = new RentService();

  try {
    const leases = await rentService.getLeases();
    return NextResponse.json(leases, { status: 200 });
  } catch (error) {
    console.error('Error fetching leases:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const rentService = new RentService();

  try {
    const createLeaseDTO = await req.json();
    console.log('Creating lease with data:', createLeaseDTO); // Log the incoming data
    const lease = await rentService.createLease(createLeaseDTO);
    return NextResponse.json(lease, { status: 201 });
  } catch (error) {
    console.error('Error creating lease:', error); // Log the error
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const rentService = new RentService();

  try {
    const id = req.nextUrl.searchParams.get('id') as string;
    const updateLeaseDTO = await req.json();
    console.log('Updating lease with ID:', id, 'and data:', updateLeaseDTO); // Log the incoming data and ID
    const updatedLease = await rentService.updateLease(id, updateLeaseDTO);
    return NextResponse.json(updatedLease, { status: 200 });
  } catch (error) {
    console.error('Error updating lease:', error); // Log the error
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const rentService = new RentService();

  try {
    const id = req.nextUrl.searchParams.get('id') as string;
    console.log('Deleting lease with ID:', id); // Log the ID
    const deletedLease = await rentService.deleteLease(id);
    return NextResponse.json(deletedLease, { status: 200 });
  } catch (error) {
    console.error('Error deleting lease:', error); // Log the error
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}
