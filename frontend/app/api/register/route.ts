import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const { email, username, password } = body;

      // Basic validation
      if (!email || !username || !password) {
         return NextResponse.json({ error: 'Missing fields' }, { status: 422 });
      }

      // Check if user already exists
      const existingUser = await prismadb.user.findUnique({
         where: { email }
      });

      if (existingUser) {
         return NextResponse.json({ error: 'Email already taken' }, { status: 422 });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const user = await prismadb.user.create({
         data: {
            name: username,
            email,
            hashedPassword,
            image: '',
            emailVerified: new Date(),
         }
      });

      return NextResponse.json(user, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
   }
}