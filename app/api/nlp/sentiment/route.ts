// Simple lexicon-based sentiment API
// POST { text: string } -> { score: number, magnitude: number, label: 'positive'|'negative'|'neutral', details: { pos: number, neg: number } }

const positiveWords = new Set([
  'good','great','excellent','amazing','awesome','love','like','enjoy','happy','positive','success','win','fast','reliable','clean','robust','smart','efficient','beautiful','impressive','solid'
])
const negativeWords = new Set([
  'bad','terrible','awful','hate','dislike','angry','sad','negative','fail','loss','slow','bug','dirty','fragile','stupid','inefficient','ugly','broken','weak'
])

function tokenize(text: string) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function analyze(text: string) {
  const tokens = tokenize(text)
  let pos = 0, neg = 0
  for (const t of tokens) {
    if (positiveWords.has(t)) pos += 1
    if (negativeWords.has(t)) neg += 1
  }
  const score = pos - neg
  const magnitude = pos + neg
  const label = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'
  return { score, magnitude, label, details: { pos, neg } }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as { text?: string }
    const text = body?.text?.slice(0, 5000) || ''
    if (!text.trim()) {
      return Response.json({ error: 'Missing text' }, { status: 400 })
    }
    const result = analyze(text)
    return Response.json(result)
  } catch (err) {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
