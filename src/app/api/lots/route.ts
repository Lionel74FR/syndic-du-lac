import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  // Retrieve all lots with their related copropriétés, owners and tenants.
  const lots = await prisma.lot.findMany({
    include: { copropriete: true, proprietaires: true, locataires: true },
  });
  return NextResponse.json(lots);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, coproprieteId, ownerIds } = data;
    if (!name || !coproprieteId) {
      return NextResponse.json({ error: "Nom et copropriété requis" }, { status: 400 });
    }
    // Determine owners: use provided ownerIds or default to current session user
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

    const lot = await prisma.lot.create({
      data: {
        name,
        description,
        copropriete: { connect: { id: coproprieteId } },
        proprietaires: ownersConnect,
      },
    });
    return NextResponse.json(lot, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}