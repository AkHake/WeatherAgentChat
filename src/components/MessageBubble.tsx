type MessageBubbleProps = {
  role: 'user' | 'agent'
  content: string
  variant?: 'error'
}

const MessageBubble = ({ role, content, variant }: MessageBubbleProps) => {
  return (
    <div className={`message ${role} ${variant ?? ''}`}>
      <p>{content}</p>
    </div>
  )
}

export default MessageBubble
