type SuggestedPromptsProps = {
    onSelect: (text: string) => void
}

const prompts = [
    "What's the weather in London?",
    "Will it rain tomorrow in Mumbai?",
    "Weather forecast for New York",
]

const SuggestedPrompts = ({ onSelect }: SuggestedPromptsProps) => {
    return (
        <div className="suggested-prompts">
            {prompts.map((prompt, index) => (
                // <button
                //   key={index}
                //   onClick={() => onSelect(prompt)}
                // >
                //   {prompt}
                // </button>
                <button
                    key={prompt}
                    onClick={() => onSelect(prompt)}
                    aria-label={`Suggested prompt: ${prompt}`}
                >
                    {prompt}
                </button>
            ))}
        </div>
    )
}

export default SuggestedPrompts
