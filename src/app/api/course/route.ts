import { NextResponse } from 'next/server';
import { z } from 'zod';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');

    const querySchema = z.string().min(1);
    const zod = querySchema.safeParse(keyword);

    if (!zod.success) {
      return NextResponse.json('Not implemented', { status: 200 });
    }

    return NextResponse.json('Not implemented', { status: 200 });
  } catch (e: any) {
    console.error('Unhandled Error:', { e });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as { name: string };

  try {
    const bodySchema = z.object({
      name: z.string().min(1).trim().toLowerCase(),
    });

    const zod = bodySchema.safeParse(body);

    if (!zod.success) {
      return NextResponse.json({ error: zod.error }, { status: 400 });
    }

    return NextResponse.json('Not implemented', { status });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
      return NextResponse.json(
        { error: error.response?.data || 'Unknown error' },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error('Unhandled Error:', error);
      return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
    }
  }
}
