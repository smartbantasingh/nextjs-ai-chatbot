'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { BookmarkIcon } from 'lucide-react'
import { fetcher } from '@/lib/utils'
import type { Message } from '@/lib/types'

export function BookmarkedMessages() {
  const { data: bookmarks, isLoading } = useSWR<Message[]>('/api/bookmark', fetcher)
  const router = useRouter()

  const renderContent = (content: string | { text: string } | Array<{text: string, type: string}>) => {
    if (typeof content === 'string') return content
    if(Array.isArray(content)) return content[0].text
    return content.text
  }

  if (isLoading) {
    return (
      <div className="w-64 border-l border-border p-4">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <BookmarkIcon size={16} />
          Bookmarked Messages
        </h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-md bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  if (!bookmarks?.length) {
    return (
      <div className="w-64 border-l border-border p-4">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <BookmarkIcon size={16} />
          Bookmarked Messages
        </h2>
        <p className="text-sm text-muted-foreground">No bookmarked messages yet</p>
      </div>
    )
  }

  return (
    <div className="w-64 border-l border-border p-4">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <BookmarkIcon size={16} />
        Bookmarked Messages
      </h2>
      <div className="space-y-4">
        {bookmarks?.map((message) => (
          <button
            key={message.id}
            onClick={() => router.push(`/chat/${message.chatId}?messageId=${message.id}`)}
            className="w-full rounded-md border p-3 text-left text-sm hover:bg-accent"
          >
            <p className="line-clamp-3">
              {renderContent(message.content)}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
} 