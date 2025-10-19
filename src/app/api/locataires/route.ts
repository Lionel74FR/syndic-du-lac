import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const locs = await prisma.locataire.findMany({ include: { lot: true } });
  return NextResponse.json(locs);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, lotId } = data;
    if (!name || !lotId) {
      return NextResponse.json({ error: "Nom et lot requis" }, { status: 400 });
    }
    const locataire = await prisma.locataire.create({
      data: {
        name,
        email,
        phone,
        lot: { connect: { id: lotId } },
      },
    });
    return NextResponse.json(locataire, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}