import { NextRequest, NextResponse } from 'next/server';
import PropertyService from '../../services/PropertyService';
import dbConnect from '../../utils/dbConnect';

// Handle GET requests to fetch properties or a specific property by ID
export async function GET(req: NextRequest) {
  await dbConnect();
  const propertyService = new PropertyService();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      const property = await propertyService.getProperty(id);
      return NextResponse.json(property, { status: 200 });
    } else {
      const properties = await propertyService.getProperties();
      return NextResponse.json(properties, { status: 200 });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Handle POST requests to add a new property
export async function POST(req: NextRequest) {
  await dbConnect();
  const propertyService = new PropertyService();

  try {
    const addPropertyDTO = await req.json();
    const property = await propertyService.addProperty(addPropertyDTO);
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Handle PUT requests to update an existing property
export async function PUT(req: NextRequest) {
  await dbConnect();
  const propertyService = new PropertyService();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const updatePropertyDTO = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing property ID' }, { status: 400 });
    }
    const updatedProperty = await propertyService.updateProperty(id, updatePropertyDTO);
    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Handle DELETE requests to remove a property
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const propertyService = new PropertyService();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing property ID' }, { status: 400 });
    }
    const deletedProperty = await propertyService.deleteProperty(id);
    return NextResponse.json(deletedProperty, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
