type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

export default ThemeToggle
