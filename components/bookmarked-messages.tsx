'use client'

import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { BookmarkIcon, SearchIcon } from 'lucide-react'
import { fetcher } from '@/lib/utils'
import type { Message } from '@/lib/types'
import { useState } from 'react'
import { Input } from './ui/input'

export function BookmarkedMessages() {
  const { data: bookmarks, isLoading } = useSWR<Message[]>('/api/bookmark', fetcher)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const renderContent = (content: string | { text: string } | Array<{text: string, type: string}>) => {
    if (typeof content === 'string') return content
    if(Array.isArray(content)) return content[0].text
    return content.text
  }

  const filteredBookmarks = bookmarks?.filter(message => 
    renderContent(message.content).toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBookmarkClick = (messageId: string) => {
    // Find the message element by its ID
    const messageElement = document.getElementById(`message-${messageId}`);
    
    if (messageElement) {
      // Scroll the message into view with smooth animation
      messageElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' // Centers the message in the viewport
      });
      
      // Optionally, add a highlight effect
      messageElement.classList.add('highlight-message');
      setTimeout(() => {
        messageElement.classList.remove('highlight-message');
      }, 2000);
    }
  };

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
      
      <div className="relative mb-4">
        <SearchIcon 
          className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" 
        />
        <Input
          placeholder="Search bookmarks..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-md bg-muted" />
          ))}
        </div>
      ) : !filteredBookmarks?.length ? (
        <p className="text-sm text-muted-foreground">
          {bookmarks?.length ? 'No matching bookmarks' : 'No bookmarked messages yet'}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map((message) => (
            <button
              key={message.id}
              onClick={() => {
                router.push(`/chat/${message.chatId}?messageId=${message.id}`);
                handleBookmarkClick(message.id);
              }}
              className="w-full rounded-md border p-3 text-left text-sm hover:bg-accent"
            >
              <p className="line-clamp-3">
                {renderContent(message.content)}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 