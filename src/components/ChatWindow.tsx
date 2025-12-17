import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import SuggestedPrompts from './SuggestedPrompts'
import type { Message } from '../App'
import TypingIndicator from './TypingIndicator'

type ChatWindowProps = {
    messages: Message[]
    onSend: (text: string) => void
    isLoading: boolean
}
const ChatWindow = ({ messages, onSend, isLoading }: ChatWindowProps) => {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        // <div className="chat-window">
        <div
            className="chat-window"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
        >

            {messages.length === 0 ? (
                <div className="empty-state">
                    <SuggestedPrompts onSelect={onSend} />
                </div>
            ) : (
                messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        role={msg.role}
                        content={msg.content}
                    />
                ))
            )}

            {isLoading && <TypingIndicator />}

            <div ref={bottomRef} />
        </div>
    )
}

export default ChatWindow
