function LoadingFooter() {
  return (
    <footer className="mt-8 flex items-center gap-2 text-[11px] tracking-[0.025em] text-[var(--color-muted)] dark:text-[var(--color-muted)]">
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-[var(--color-status-dot)] shadow-[0_0_0_3px_rgb(var(--rgb-status-dot)_/_12%)]"
      />
      <span>Preparing your experience</span>
    </footer>
  )
}

export default LoadingFooter
