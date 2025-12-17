import { useEffect, useRef, useState } from 'react'

type ChatInputProps = {
    onSend: (text: string) => void
    disabled: boolean
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
    const [input, setInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!disabled) {
            inputRef.current?.focus()
        }
    }, [disabled])

    const handleSend = () => {
        if (!input.trim() || disabled) return
        onSend(input)
        setInput('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div className="chat-input">
            {/* <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        value={input}
        disabled={disabled}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend} disabled={disabled}>
        {disabled ? '...' : 'Send'}
      </button> */}
            <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={input}
                disabled={disabled}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Chat message input"
                aria-disabled={disabled}
            />

            <button
                onClick={handleSend}
                disabled={disabled}
                aria-label="Send message"
            >
                {disabled ? '...' : 'Send'}
            </button>
        </div>
    )
}

export default ChatInput
