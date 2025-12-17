import type { Message } from '../App'

const API_URL = import.meta.env.VITE_WEATHER_AGENT_URL

type StreamParams = {
  messages: Message[]
  onToken: (token: string) => void
}

export async function streamWeatherAgent({
  messages,
  onToken,
}: StreamParams) {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Accept': '*/*',
//       'Content-Type': 'application/json',
//       'x-mastra-dev-playground': 'true',
//     },
//     body: JSON.stringify({
//       messages,
//       runId: 'weatherAgent',
//       maxRetries: 2,
//       maxSteps: 5,
//       temperature: 0.5,
//       topP: 1,
//       runtimeContext: {},
//       threadId: '2024510019',
//       resourceId: 'weatherAgent',
//     }),
//   })
// const response = await fetch(API_URL, {
//   method: 'POST',
//   headers: {
//     'Accept': 'text/event-stream',
//     'Content-Type': 'application/json',
//     'x-mastra-dev-playground': 'true',
//   },
//   body: JSON.stringify({
//     messages: messages.map(m => ({
//       role: m.role,
//       content: m.content,
//     })),
//     runId: 'weatherAgent',
//     threadId: '2024510019',
//     resourceId: 'weatherAgent',
//   }),
// })
const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Accept': 'text/event-stream',
    'Content-Type': 'application/json',
    'x-mastra-dev-playground': 'true',
  },
  body: JSON.stringify({
    messages: messages.map(m => ({
      role: m.role,
      content: m.content,
    })),
    runId: 'weatherAgent',
    threadId: '2024510019',
    resourceId: 'weatherAgent',
  }),
})

if (!response.ok) {
  throw new Error(`Agent request failed: ${response.status}`)
}

  if (!response.body) {
    throw new Error('No response stream')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    onToken(chunk)
  }
}
