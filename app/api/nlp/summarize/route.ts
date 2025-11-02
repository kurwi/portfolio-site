// Simple extractive summarization API
// POST { text: string, sentences?: number } -> { summary: string[], scored: Array<{sentence:string, score:number}> }

const stopwords = new Set([
  'a','an','and','are','as','at','be','but','by','for','if','in','into','is','it','no','not','of','on','or','such','that','the','their','then','there','these','they','this','to','was','will','with','from','we','you','your','i','our'
])

function splitSentences(text: string) {
  return (text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean)
}

function wordFreqs(text: string) {
  const freq: Record<string, number> = {}
  for (const w of text.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/)) {
    if (!w || stopwords.has(w)) continue
    freq[w] = (freq[w] || 0) + 1
  }
  return freq
}

function summarize(text: string, k = 3) {
  const sents = splitSentences(text)
  if (sents.length === 0) return { summary: [], scored: [] }
  const freqs = wordFreqs(text)
  const scored = sents.map((s) => ({
    sentence: s,
    score: s.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).reduce((sum, w) => sum + (freqs[w] || 0), 0)
  }))
  scored.sort((a, b) => b.score - a.score)
  const top = scored.slice(0, Math.min(k, scored.length)).map(s => s.sentence)
  return { summary: top, scored }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as { text?: string, sentences?: number }
    const text = body?.text?.slice(0, 10000) || ''
    if (!text.trim()) {
      return Response.json({ error: 'Missing text' }, { status: 400 })
    }
    const k = Math.max(1, Math.min(8, Number(body?.sentences ?? 3)))
    const result = summarize(text, k)
    return Response.json(result)
  } catch (err) {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
