import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { adminListConversations, adminReply, adminResolve } from '@/lib/chat/functions'
import type { Conversation } from '@/lib/chat/types'

export const Route = createFileRoute('/admin/chat/')({
  validateSearch: (search: Record<string, unknown>) => ({
    conversation: typeof search.conversation === 'string' ? search.conversation : undefined,
  }),
  component: AdminChatPage,
})

const SECRET_STORAGE_KEY = 'portfolio-chat-admin-secret'

function AdminChatPage() {
  const search = Route.useSearch()
  const [secret, setSecret] = useState(() => sessionStorage.getItem(SECRET_STORAGE_KEY) ?? '')
  const [unlocked, setUnlocked] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(search.conversation ?? null)
  const [reply, setReply] = useState('')
  const [error, setError] = useState('')
  const replyInputRef = useRef<HTMLInputElement>(null)

  async function refresh(currentSecret: string) {
    try {
      const data = await adminListConversations({ data: { secret: currentSecret.trim() } })
      setConversations(data)
      setUnlocked(true)
      setError('')
    } catch (err) {
      setUnlocked(false)
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  useEffect(() => {
    if (secret) refresh(secret)
  }, [])

  useEffect(() => {
    if (!unlocked) return
    const interval = setInterval(() => refresh(secret), 4000)
    return () => clearInterval(interval)
  }, [unlocked, secret])

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0]

  useEffect(() => {
    if (active) replyInputRef.current?.focus()
  }, [active?.id])

  if (!unlocked) {
    return (
      <div className="mx-auto mt-24 max-w-sm px-4">
        <h1 className="mb-4 text-lg font-medium">Chat inbox</h1>
        <input
          type="password"
          placeholder="Admin passcode"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <button
          onClick={() => {
            sessionStorage.setItem(SECRET_STORAGE_KEY, secret)
            refresh(secret)
          }}
          className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
        >
          Unlock
        </button>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[16rem_1fr] gap-4 px-4 py-8">
      <aside className="space-y-1">
        <h1 className="mb-3 text-sm font-medium text-muted-foreground">
          Conversations ({conversations.length})
        </h1>
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
              active?.id === c.id ? 'bg-muted font-medium' : 'hover:bg-muted/50'
            }`}
          >
            <span className="mr-2 inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              {c.status}
            </span>
            {c.messages.at(-1)?.content.slice(0, 30) ?? 'New chat'}
          </button>
        ))}
      </aside>

      <main>
        {!active ? (
          <p className="text-sm text-muted-foreground">No conversations yet.</p>
        ) : (
          <div className="flex h-[32rem] flex-col rounded-2xl border">
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {active.messages.map((m) => (
                <div key={m.id} className={`text-sm ${m.role === 'human' ? 'text-right' : ''}`}>
                  <span className="mr-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {m.role}
                  </span>
                  <p className="inline">{m.content}</p>
                </div>
              ))}
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!reply.trim()) return
                await adminReply({ data: { secret, conversationId: active.id, message: reply } })
                setReply('')
                refresh(secret)
              }}
              className="flex gap-2 border-t p-3"
            >
              <input
                ref={replyInputRef}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply..."
                className="flex-1 rounded-lg border px-3 py-2 text-sm"
              />
              <button className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                Send
              </button>
              <button
                type="button"
                onClick={async () => {
                  await adminResolve({ data: { secret, conversationId: active.id } })
                  refresh(secret)
                }}
                className="rounded-lg border px-3 py-2 text-sm"
              >
                Resolve
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
