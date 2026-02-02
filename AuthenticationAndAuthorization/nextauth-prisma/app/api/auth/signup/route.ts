import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: email.split('@')[0],
        email,
        password: await hash(password, 10),
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
