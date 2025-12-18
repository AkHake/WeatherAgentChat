import './index.css'
import { useEffect, useState } from 'react'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
// import { streamWeatherAgent } from './api/weatherAgent'
import { fetchWeatherAgent } from './api/weatherAgent'
import Navbar from './components/Navbar'

export type Message = {
  role: 'user' | 'agent'
  content: string
  variant?: 'error'
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // const sendMessage = async (text: string) => {
  //   if (!text.trim() || isLoading) return

  //   const userMessage: Message = { role: 'user', content: text }

  //   setMessages(prev => [...prev, userMessage])
  //   setIsLoading(true)

  //   // Add empty agent message
  //   setMessages(prev => [...prev, { role: 'agent', content: '' }])

  //   let agentResponse = ''

  //   try {
  //     await streamWeatherAgent({
  //       messages: [...messages, userMessage],
  //       onToken: (token: string) => {
  //         agentResponse += token

  //         setMessages(prev => {
  //           const updated = [...prev]
  //           updated[updated.length - 1] = {
  //             role: 'agent',
  //             content: agentResponse,
  //           }
  //           return updated
  //         })
  //       },
  //     })
  //   } catch (error) {
  //     setMessages(prev => {
  //       const updated = [...prev]
  //       updated[updated.length - 1] = {
  //         role: 'agent',
  //         content:
  //           '⚠️ The weather agent is currently unavailable. Please try again later.',
  //         variant: 'error',
  //       }
  //       return updated
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const agentReply = await fetchWeatherAgent(text)

      setMessages(prev => [
        ...prev,
        {
          role: 'agent',
          content: agentReply,
        },
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'agent',
          content:
            '⚠️ The weather agent is currently unavailable. Please try again later.',
          variant: 'error',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }


  const exportChat = () => {
    if (messages.length === 0) return

    const content = messages
      .map(msg => {
        const sender = msg.role === 'user' ? 'You' : 'Agent'
        return `${sender}: ${msg.content}`
      })
      .join('\n\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'chat-history.txt'
    link.click()

    URL.revokeObjectURL(url)
  }


  return (
    <div className="app">
      {/* <div className="chat-container">
        <ThemeToggle
          theme={theme}
          onToggle={() =>
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
          }
        />

        <ChatWindow messages={messages} onSend={sendMessage} />
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div> */}
      <div className="chat-container">
        {/* <Navbar title="Weather Agent" /> */}
        {/* <Navbar
          title="Weather Agent"
          onExport={exportChat}
          disableExport={messages.length === 0}
        /> */}
        <Navbar
          title="Weather Agent"
          onExport={exportChat}
          disableExport={messages.length === 0}
          theme={theme}
          onToggleTheme={() =>
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
          }
        />



        {/* <ThemeToggle
          theme={theme}
          onToggle={() =>
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
          }
        /> */}

        <ChatWindow messages={messages} onSend={sendMessage} isLoading={isLoading} />
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}

export default App
