import type { Message as AIMessage } from 'ai'

export interface Message extends AIMessage {
  isBookmarked?: boolean
  chatId?: string;
} 