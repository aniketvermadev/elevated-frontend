import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import {
  leaveContact,
  pollConversation,
  sendVisitorMessage,
  startConversation,
} from '@/lib/chat/functions'
import type { ChatMessage, ConversationStatus } from '@/lib/chat/types'

const STORAGE_KEY = 'portfolio-chat-conversation-id'
const POLL_INTERVAL_MS = 3000

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<ConversationStatus>('open')
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastMessageId = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!open || conversationId) return
    const existing = localStorage.getItem(STORAGE_KEY)

    async function bootstrapFresh() {
      const { conversationId: id } = await startConversation()
      localStorage.setItem(STORAGE_KEY, id)
      setConversationId(id)
    }

    if (existing) {
      pollConversation({ data: { conversationId: existing } })
        .then((result) => {
          setConversationId(existing)
          setMessages(result.messages)
          if (result.messages.length > 0) {
            lastMessageId.current = result.messages[result.messages.length - 1].id
          }
          setStatus(result.status)
        })
        .catch(() => {
          localStorage.removeItem(STORAGE_KEY)
          bootstrapFresh()
        })
      return
    }

    bootstrapFresh()
  }, [open, conversationId])

  // Poll for new messages (AI replies instantly, human replies land here).
  useEffect(() => {
    if (!open || !conversationId) return
    let cancelled = false

    async function tick() {
      try {
        const result = await pollConversation({
          data: { conversationId: conversationId!, afterMessageId: lastMessageId.current },
        })
        if (cancelled) return
        if (result.messages.length > 0) {
          const newOnes = result.messages.filter((m) => m.role !== 'visitor')
          setMessages((prev) => [...prev, ...newOnes])
          lastMessageId.current = result.messages[result.messages.length - 1].id
        }
        setStatus(result.status)
      } catch {
        // Conversation not found (e.g. server restarted in dev) — ignore, next send recreates it.
      }
    }

    tick()
    const interval = setInterval(tick, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [open, conversationId])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const hasHumanReplied = messages.some((m) => m.role === 'human')

  async function handleSend() {
    const text = input.trim()
    if (!text || !conversationId || sending) return
    setSending(true)
    setInput('')

    const optimistic: ChatMessage = {
      id: `local-${Date.now()}`,
      role: 'visitor',
      content: text,
      createdAt: Date.now(),
    }
    setMessages((prev) => [...prev, optimistic])

    try {
      const result = await sendVisitorMessage({ data: { conversationId, message: text } })
      if (result.escalated) setStatus('escalated')
      // Pull immediately so the reply (AI or "connecting you") shows without waiting for the next poll.
      const fresh = await pollConversation({
        data: { conversationId, afterMessageId: lastMessageId.current },
      })
      // Drop the server's echo of the message we just sent — it's already
      // shown via the optimistic bubble above, so re-adding it would duplicate it.
      const newOnes = fresh.messages.filter((m) => m.role !== 'visitor')
      setMessages((prev) => [...prev, ...newOnes])
      if (fresh.messages.length > 0) { 
        lastMessageId.current = fresh.messages[fresh.messages.length - 1].id
      }
      setStatus(fresh.status)
    } catch (err) {
      console.error('[chat] send failed', err)
      // Most likely the conversation no longer exists server-side (e.g. dev
      // server restarted). Reset so the next message starts a fresh one.
      localStorage.removeItem(STORAGE_KEY)
      lastMessageId.current = undefined
      setConversationId(null)
      setMessages((prev) => [
        ...prev,
        {
          id: `local-error-${Date.now()}`,
          role: 'system',
          content: 'Connection reset — please send that message again.',
          createdAt: Date.now(),
        },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex h-[26rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Ask about Aniket</p>
                <p className="text-xs text-muted-foreground">
                  {hasHumanReplied
                    ? 'Chatting with Aniket'
                    : status === 'escalated'
                      ? "Aniket's been notified"
                      : 'Usually replies instantly'}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((m) => (
                <ChatBubble key={m.id} message={m} />
              ))}
              {status === 'escalated' && !hasHumanReplied && (
                <p className="pt-1 text-center text-xs text-muted-foreground">
                  Waiting for Aniket to reply — feel free to leave the tab open.
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                disabled={!conversationId}
              />
              <button
                type="submit"
                disabled={!input.trim() || sending || !conversationId}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'system') {
    return (
      <p className="text-center text-xs text-muted-foreground">{message.content}</p>
    )
  }

  const isVisitor = message.role === 'visitor'
  return (
    <div className={`flex ${isVisitor ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
          isVisitor
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        {message.role === 'human' && (
          <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wide opacity-70">
            Aniket
          </p>
        )}
        {message.content}
      </div>
    </div>
  )
}

export async function submitContact(conversationId: string, contact: string) {
  await leaveContact({ data: { conversationId, contact } })
}
