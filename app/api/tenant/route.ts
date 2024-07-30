import { NextRequest, NextResponse } from 'next/server';
import TenantService from '../../services/TenantService';
import dbConnect from '../../utils/dbConnect';

// Function to handle POST requests for creating a tenant
export async function POST(req: NextRequest) {
  await dbConnect();
  const tenantService = new TenantService();

  try {
    const createTenantDTO = await req.json();
    const newTenant = await tenantService.createTenant(createTenantDTO);
    return NextResponse.json(newTenant, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Function to handle PUT requests for updating a tenant
export async function PUT(req: NextRequest) {
  await dbConnect();
  const tenantService = new TenantService();

  try {
    const tenantIdToUpdate = req.nextUrl.searchParams.get('tenantId') as string;
    const updateTenantDTO = await req.json();
    const updatedTenant = await tenantService.updateTenant(tenantIdToUpdate, updateTenantDTO);
    return NextResponse.json(updatedTenant, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Function to handle GET requests for fetching tenants
export async function GET(req: NextRequest) {
  await dbConnect();
  const tenantService = new TenantService();

  try {
    const tenantIdToGet = req.nextUrl.searchParams.get('tenantId') as string;
    if (tenantIdToGet) {
      const tenant = await tenantService.getTenant(tenantIdToGet);
      return NextResponse.json(tenant, { status: 200 });
    } else {
      const tenants = await tenantService.getTenants();
      return NextResponse.json(tenants, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Function to handle DELETE requests for deleting a tenant
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const tenantService = new TenantService();

  try {
    const tenantIdToDelete = req.nextUrl.searchParams.get('tenantId') as string;
    await tenantService.deleteTenant(tenantIdToDelete);
    return NextResponse.json({ message: 'Tenant deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
