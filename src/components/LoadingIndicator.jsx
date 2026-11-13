function LoadingIndicator() {
  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="mb-[18px] flex items-baseline text-sm font-medium tracking-[0.015em] text-[var(--color-muted)] dark:text-[var(--color-muted)]">
        Loading
        <span aria-hidden="true" className="ml-[5px] inline-flex gap-1">
          {[0, 1, 2].map((dot) => (
            <i
              key={dot}
              className="size-[3px] animate-[dot-pulse_1.1s_ease-in-out_infinite] rounded-full bg-[var(--color-brand)] motion-reduce:animate-none dark:bg-[var(--color-brand-light)]"
              style={{ animationDelay: `${dot * 150}ms` }}
            />
          ))}
        </span>
      </p>
      <div
        aria-hidden="true"
        className="h-[3px] w-32 overflow-hidden rounded-full bg-[var(--color-brand)]/15 dark:bg-[var(--color-white)]/10"
      >
        <span className="block h-full w-[42%] animate-[progress-sweep_2.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[var(--color-art-8caf98)] to-[var(--color-brand)] motion-reduce:animate-none dark:from-[var(--color-brand-lighter)] dark:to-[var(--color-art-5c9670)]" />
      </div>
    </div>
  )
}

export default LoadingIndicator
