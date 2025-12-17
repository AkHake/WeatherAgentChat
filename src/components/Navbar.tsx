type NavbarProps = {
  title: string
  onExport: () => void
  disableExport: boolean
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const Navbar = ({
  title,
  onExport,
  disableExport,
  theme,
  onToggleTheme,
}: NavbarProps) => {
  return (
    <header className="navbar">
      <h1 className="navbar-title">{title}</h1>

      <div className="navbar-actions">
        <button
          className="export-btn"
          onClick={onExport}
          disabled={disableExport}
          aria-label="Export chat history"
        >
          Export
        </button>

        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          // aria-label="Toggle theme"
          aria-label="Toggle light and dark theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  )
}

export default Navbar