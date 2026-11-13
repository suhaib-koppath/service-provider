function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-[var(--color-border)]/70 bg-[var(--color-white)]/70 text-[var(--color-secondary)] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-[var(--color-white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-focus)] dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-dark)]/80 dark:text-[var(--color-theme-icon)] dark:hover:bg-[var(--color-surface-hover-dark)] sm:right-[6vw] sm:top-8"
    >
      {isDark ? (
        <svg
          aria-hidden="true"
          className="size-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="size-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
