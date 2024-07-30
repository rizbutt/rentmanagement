import { NextRequest, NextResponse } from 'next/server';
import ProfileService from '../../services/ProfileService';
import dbConnect from '../../utils/dbConnect';

export async function GET(req: NextRequest) {
  await dbConnect();
  const profileService = new ProfileService();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      const profile = await profileService.getProfile(id);
      return NextResponse.json(profile);
    } else {
      const profiles = await profileService.getProfiles();
      return NextResponse.json(profiles);
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const profileService = new ProfileService();

  try {
    const createProfileDTO = await req.json();
    const newProfile = await profileService.createProfile(createProfileDTO);
    return NextResponse.json(newProfile);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const profileService = new ProfileService();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const updateProfileDTO = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing profile ID' }, { status: 400 });
    }
    const updatedProfile = await profileService.updateProfile(id, updateProfileDTO);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const profileService = new ProfileService();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing profile ID' }, { status: 400 });
    }
    const deletedProfile = await profileService.deleteProfile(id);
    return NextResponse.json(deletedProfile);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}
