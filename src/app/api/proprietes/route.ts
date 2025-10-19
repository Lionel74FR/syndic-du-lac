import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const props = await prisma.property.findMany({ include: { owners: true, lots: true } });
  return NextResponse.json(props);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, address, ownerIds } = data;
    if (!name || !address) {
      return NextResponse.json({ error: "Nom et adresse requis" }, { status: 400 });
    }
    // Determine the current user from the session and set as owner if not provided explicitly
    let ownersConnect;
    if (ownerIds && Array.isArray(ownerIds) && ownerIds.length > 0) {
      ownersConnect = { connect: ownerIds.map((id: string) => ({ id })) };
    } else {
      const session = await getServerSession(authOptions);
      const sessionUserId = session?.user && (session.user as any).id;
      if (sessionUserId) {
        ownersConnect = { connect: { id: sessionUserId } };
      }
    }
    const property = await prisma.property.create({
      data: {
        name,
        address,
        owners: ownersConnect,
      },
    });
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}