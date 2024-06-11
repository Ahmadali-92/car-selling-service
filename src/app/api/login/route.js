import {  NextResponse } from 'next/server';
import { db } from '@/dataBase/db';
import userModel from '@/model/userModel';

export async function POST(request) {
      try {
            const { email, password } = await request.json();

            if (!email || !password)
                  return NextResponse.json({ status: false, data: "Some Field Missing" });

            await db();
            const createData = await userModel.findOne({ email });
            
            if (password !== createData?.password) {
                  return NextResponse.json({ status: 401, data: "Enter correct password" });
            }

            return NextResponse.json({ status: 200, data: createData });
      } catch (error) {
            console.error('Error processing request:', error.message);
            return NextResponse.json({ status: 500, error: 'Internal Server Error' });
      }
}
