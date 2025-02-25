import { auth } from '@/app/(auth)/auth'
import { toggleMessageBookmark } from '@/lib/db/queries'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { messageId, isBookmarked } = await req.json()

  try {
    await toggleMessageBookmark(messageId, isBookmarked)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update bookmark status' }, { status: 500 })
  }
} 