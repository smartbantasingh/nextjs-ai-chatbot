import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import type { Chat } from '@/lib/db/schema'
import { cn } from '@/lib/utils'

export function ChatItem({ chat }: { chat: Chat }) {
  return (
    <div className="group relative flex items-center">
      <Link
        href={`/chat/${chat.id}`}
        className={cn(
          'flex w-full items-center space-x-2 rounded-lg p-2 hover:bg-accent',
          'truncate text-sm transition-all'
        )}
      >
        <MessageSquare className="h-4 w-4" />
        <span className="truncate">{chat.title}</span>
      </Link>
    </div>
  )
} 