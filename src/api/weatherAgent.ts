// import type { Message } from '../App'

// const API_URL = import.meta.env.VITE_WEATHER_AGENT_URL

// type StreamParams = {
//   messages: Message[]
//   onToken: (token: string) => void
// }

// export async function streamWeatherAgent({
//   messages,
//   onToken,
// }: StreamParams) {
// //   const response = await fetch(API_URL, {
// //     method: 'POST',
// //     headers: {
// //       'Accept': '*/*',
// //       'Content-Type': 'application/json',
// //       'x-mastra-dev-playground': 'true',
// //     },
// //     body: JSON.stringify({
// //       messages,
// //       runId: 'weatherAgent',
// //       maxRetries: 2,
// //       maxSteps: 5,
// //       temperature: 0.5,
// //       topP: 1,
// //       runtimeContext: {},
// //       threadId: '2024510019',
// //       resourceId: 'weatherAgent',
// //     }),
// //   })
// // const response = await fetch(API_URL, {
// //   method: 'POST',
// //   headers: {
// //     'Accept': 'text/event-stream',
// //     'Content-Type': 'application/json',
// //     'x-mastra-dev-playground': 'true',
// //   },
// //   body: JSON.stringify({
// //     messages: messages.map(m => ({
// //       role: m.role,
// //       content: m.content,
// //     })),
// //     runId: 'weatherAgent',
// //     threadId: '2024510019',
// //     resourceId: 'weatherAgent',
// //   }),
// // })
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

// if (!response.ok) {
//   throw new Error(`Agent request failed: ${response.status}`)
// }

//   if (!response.body) {
//     throw new Error('No response stream')
//   }

//   const reader = response.body.getReader()
//   const decoder = new TextDecoder('utf-8')

//   while (true) {
//     const { value, done } = await reader.read()
//     if (done) break

//     const chunk = decoder.decode(value, { stream: true })
//     onToken(chunk)
//   }
// }

const API_URL = import.meta.env.VITE_WEATHER_AGENT_URL

export async function fetchWeatherAgent(prompt: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      stream: false,
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()

  // Handle flexible response formats safely
  if (typeof data === 'string') return data
  if (data?.response) return data.response
  if (data?.answer) return data.answer

  return JSON.stringify(data)
}
