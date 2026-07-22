interface FaqEntry {
  keywords: string[]
  answer: string
}

const FAQ: FaqEntry[] = [
  {
    keywords: ['tech stack', 'technologies', 'stack', 'tools', 'framework'],
    answer:
      "I primarily work with React, TypeScript, TanStack Start/Router, and Tailwind. On the backend I reach for Node.js and Cloudflare Workers, with Postgres or D1 for storage.",
  },
  {
    keywords: ['experience', 'years', 'background', 'about you', 'who are you'],
    answer:
      "I'm a full-stack developer focused on React and TypeScript, building product UI, APIs, and deployment pipelines end to end. Feel free to check the projects section above for specifics.",
  },
  {
    keywords: ['contact', 'email', 'reach', 'linkedin', 'github'],
    answer:
      "You can find contact links in the footer of this site. If you'd rather, leave your email here and Aniket will follow up directly.",
  },
  {
    keywords: ['available', 'freelance', 'hire', 'open to work', 'opportunities'],
    answer:
      "Aniket is currently open to new opportunities. Let me connect you so you can share more details.",
  },
]

const ESCALATION_KEYWORDS = [
  'interview',
  'schedule',
  'meeting',
  'call',
  'hire',
  'job offer',
  'price',
  'pricing',
  'quote',
  'contract',
  'resume',
  'cv',
  'salary',
  'rate',
  'availability for',
  'talk to aniket',
  'speak to aniket',
  'human',
]

export interface AiResult {
  answer: string | null
  shouldEscalate: boolean
}

const GREETING_PATTERN = /^(hi|hii+|hello|hey+|yo|sup|hola|good (morning|afternoon|evening))\b|^(hi|hey|hello)[!. ]*$/

export async function answerFromKnowledgeBase(question: string): Promise<AiResult> {
  const normalized = question.toLowerCase().trim()

  if (GREETING_PATTERN.test(normalized)) {
    return {
      answer: "Hey! Ask me about Aniket's tech stack, experience, or availability — or anything else about his work.",
      shouldEscalate: false,
    }
  }

  if (ESCALATION_KEYWORDS.some((kw) => normalized.includes(kw))) {
    return { answer: null, shouldEscalate: true }
  }

  for (const entry of FAQ) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return { answer: entry.answer, shouldEscalate: false }
    }
  }

  // No confident match — escalate rather than guessing.
  return { answer: null, shouldEscalate: true }
}
