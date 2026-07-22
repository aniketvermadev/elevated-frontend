import { createServerFn } from '@tanstack/react-start'
import { answerFromKnowledgeBase } from './ai.server'
import { getEnvVar } from './env.server'
import { notifyEscalation } from './notify.server'
import {
  addMessage,
  createConversation,
  getConversation,
  listConversations,
  messagesSince,
  setStatus,
  setVisitorContact,
} from './store.server'

function requireAdmin(secret: string) {
  const expected = getEnvVar('ADMIN_SECRET')
  if (!expected) {
    throw new Error('ADMIN_SECRET is not set on the server — check your .dev.vars / env vars.')
  }
  if (secret !== expected) {
    throw new Error('Incorrect passcode.')
  }
}

// ---- Visitor-facing ----

export const startConversation = createServerFn({ method: 'POST' }).handler(async () => {
  const conversation = createConversation()
  addMessage(
    conversation.id,
    'system',
    "Hi! Ask me anything about Aniket's work — if I can't answer, I'll bring him in.",
  )
  return { conversationId: conversation.id }
})

export const sendVisitorMessage = createServerFn({ method: 'POST' })
  .inputValidator((data: { conversationId: string; message: string }) => data)
  .handler(async ({ data }) => {
    const conversation = getConversation(data.conversationId)
    if (!conversation) throw new Error('Conversation not found')

    addMessage(conversation.id, 'visitor', data.message)

    // Only stop the AI once a human has actually replied — a prior
    // escalation (e.g. one question the AI couldn't answer) shouldn't
    // silence it for the rest of the conversation.
    const humanHasJoined = conversation.messages.some((m) => m.role === 'human')
    if (humanHasJoined || conversation.status === 'resolved') {
      return { escalated: true }
    }

    const { answer, shouldEscalate } = await answerFromKnowledgeBase(data.message)

    if (answer && !shouldEscalate) {
      addMessage(conversation.id, 'ai', answer)
      return { escalated: false }
    }

    setStatus(conversation.id, 'escalated')
    addMessage(conversation.id, 'system', "I'll notify Aniket directly. Please wait — usually just a few minutes.")
    await notifyEscalation(conversation, data.message)
    return { escalated: true }
  })

export const pollConversation = createServerFn({ method: 'GET' })
  .inputValidator((data: { conversationId: string; afterMessageId?: string }) => data)
  .handler(async ({ data }) => {
    const conversation = getConversation(data.conversationId)
    if (!conversation) throw new Error('Conversation not found')
    return {
      status: conversation.status,
      messages: messagesSince(conversation.id, data.afterMessageId),
    }
  })

export const leaveContact = createServerFn({ method: 'POST' })
  .inputValidator((data: { conversationId: string; contact: string }) => data)
  .handler(async ({ data }) => {
    setVisitorContact(data.conversationId, data.contact)
    addMessage(data.conversationId, 'system', `Thanks — noted ${data.contact}.`)
    return { ok: true }
  })

// ---- Admin-facing (protected by ADMIN_SECRET) ----

export const adminListConversations = createServerFn({ method: 'POST' })
  .inputValidator((data: { secret: string }) => data)
  .handler(async ({ data }) => {
    requireAdmin(data.secret)
    return listConversations()
  })

export const adminReply = createServerFn({ method: 'POST' })
  .inputValidator((data: { secret: string; conversationId: string; message: string }) => data)
  .handler(async ({ data }) => {
    requireAdmin(data.secret)
    addMessage(data.conversationId, 'human', data.message)
    setStatus(data.conversationId, 'escalated')
    return { ok: true }
  })

export const adminResolve = createServerFn({ method: 'POST' })
  .inputValidator((data: { secret: string; conversationId: string }) => data)
  .handler(async ({ data }) => {
    requireAdmin(data.secret)
    setStatus(data.conversationId, 'resolved')
    return { ok: true }
  })
