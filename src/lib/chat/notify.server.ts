import { getEnvVar } from './env.server'
import type { Conversation } from './types'

async function adminUrl(conversationId: string) {
  const base = (await getEnvVar('SITE_URL')) ?? ''
  return `${base}/admin/chat?conversation=${conversationId}`
}

export async function notifyEscalation(conversation: Conversation, latestMessage: string) {
  const link = await adminUrl(conversation.id)
  const text = `New chat needs you.\n\n"${latestMessage}"\n\nReply here: ${link}`

  const [webhookUrl, resendKey, emailTo, emailFrom] = await Promise.all([
    getEnvVar('NOTIFY_WEBHOOK_URL'),
    getEnvVar('RESEND_API_KEY'),
    getEnvVar('NOTIFY_EMAIL_TO'),
    getEnvVar('NOTIFY_EMAIL_FROM'),
  ])

  // TEMPORARY DEBUG — remove once notifications are confirmed working.
  console.log('[chat debug] env check:', {
    hasWebhookUrl: !!webhookUrl,
    hasResendKey: !!resendKey,
    hasEmailTo: !!emailTo,
  })

  const tasks: Promise<unknown>[] = []

  if (webhookUrl) {
    tasks.push(
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text,
          conversationId: conversation.id,
          adminUrl: link,
        }),
      }),
    )
  }

  if (resendKey && emailTo) {
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${resendKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: emailFrom ?? 'Portfolio Chat <onboarding@resend.dev>',
          to: [emailTo],
          subject: 'New portfolio chat needs a reply',
          text,
        }),
      }),
    )
  }

  if (tasks.length === 0) {
    console.log('[chat] escalation (no NOTIFY_WEBHOOK_URL / RESEND_API_KEY set):', text)
    return
  }

  const results = await Promise.allSettled(tasks)
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('[chat] failed to send escalation notification', result.reason)
    } else {
      const response = result.value as Response
      if (!response.ok) {
        console.error('[chat] notification request failed', response.status, await response.text())
      }
    }
  }
}