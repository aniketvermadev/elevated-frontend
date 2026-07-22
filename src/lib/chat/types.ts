export type ChatRole = 'visitor' | 'ai' | 'human' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

export type ConversationStatus = 'open' | 'escalated' | 'resolved'

export interface Conversation {
  id: string
  status: ConversationStatus
  visitorContact?: string
  createdAt: number
  updatedAt: number
  messages: ChatMessage[]
}
