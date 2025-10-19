import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const copro = await prisma.copropriete.findMany({ include: { lots: true } });
  return NextResponse.json(copro);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, address } = data;
    if (!name || !address) {
      return NextResponse.json({ error: "Nom et adresse requis" }, { status: 400 });
    }
    const copropriete = await prisma.copropriete.create({ data: { name, address } });
    return NextResponse.json(copropriete, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}