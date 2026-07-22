import type { ChatMessage, ChatRole, Conversation, ConversationStatus } from './types'

const conversations = new Map<string, Conversation>()

function id() {
  return crypto.randomUUID()
}

export function createConversation(): Conversation {
  const now = Date.now()
  const conversation: Conversation = {
    id: id(),
    status: 'open',
    createdAt: now,
    updatedAt: now,
    messages: [],
  }
  conversations.set(conversation.id, conversation)
  return conversation
}

export function getConversation(conversationId: string): Conversation | undefined {
  return conversations.get(conversationId)
}

export function addMessage(
  conversationId: string,
  role: ChatRole,
  content: string,
): ChatMessage {
  const conversation = conversations.get(conversationId)
  if (!conversation) {
    throw new Error('Conversation not found')
  }
  const message: ChatMessage = {
    id: id(),
    role,
    content,
    createdAt: Date.now(),
  }
  conversation.messages.push(message)
  conversation.updatedAt = message.createdAt
  return message
}

export function setStatus(conversationId: string, status: ConversationStatus) {
  const conversation = conversations.get(conversationId)
  if (!conversation) return
  conversation.status = status
  conversation.updatedAt = Date.now()
}

export function setVisitorContact(conversationId: string, contact: string) {
  const conversation = conversations.get(conversationId)
  if (!conversation) return
  conversation.visitorContact = contact
}

export function listConversations(): Conversation[] {
  return Array.from(conversations.values()).sort((a, b) => b.updatedAt - a.updatedAt)
}

export function messagesSince(conversationId: string, afterMessageId?: string): ChatMessage[] {
  const conversation = conversations.get(conversationId)
  if (!conversation) return []
  if (!afterMessageId) return conversation.messages
  const index = conversation.messages.findIndex((m) => m.id === afterMessageId)
  if (index === -1) return conversation.messages
  return conversation.messages.slice(index + 1)
}
