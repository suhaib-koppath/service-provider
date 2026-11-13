function GearLoader() {
  return (
    <div
      aria-hidden="true"
      className="relative mb-9 grid size-[100px] place-items-center sm:mb-[42px] sm:size-[124px]"
    >
      <div className="absolute inset-0 rounded-full border border-[var(--color-brand)]/15 shadow-[0_0_0_11px_rgb(var(--rgb-white)_/_48%),0_12px_40px_rgb(var(--rgb-shadow-light)_/_8%)] dark:border-[var(--color-brand-light)]/20 dark:shadow-[0_0_0_11px_rgb(var(--rgb-shadow-dark)_/_48%),0_12px_40px_rgb(var(--rgb-black)_/_25%)]" />
      <svg
        className="size-[58px] animate-[gear-turn_7s_linear_infinite] text-[var(--color-brand)] drop-shadow-[0_5px_8px_rgb(var(--rgb-brand-shadow)_/_18%)] motion-reduce:animate-none sm:size-16 dark:text-[var(--color-brand-light)]"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.1 7.1 0 0 0-1.63-.95l-.36-2.54a.49.49 0 0 0-.49-.42h-3.84a.49.49 0 0 0-.49.42l-.36 2.54c-.59.23-1.14.55-1.63.95l-2.39-.96a.49.49 0 0 0-.61.22L2.64 8.84a.5.5 0 0 0 .12.64l2.03 1.58a6.1 6.1 0 0 0 0 1.88l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.12.21.37.29.61.22l2.39-.96c.49.4 1.04.72 1.63.95l.36 2.54c.04.24.24.42.49.42h3.84c.25 0 .45-.18.49-.42l.36-2.54a7.1 7.1 0 0 0 1.63-.95l2.39.96c.23.08.49-.01.61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.02-1.58ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
      </svg>
      <span className="absolute inset-[3px] animate-[orbit-turn_2.8s_linear_infinite] rounded-full border-2 border-transparent border-r-[var(--color-brand)]/25 border-t-[var(--color-brand)] motion-reduce:animate-none dark:border-r-[var(--color-brand-light)]/25 dark:border-t-[var(--color-brand-light)]" />
    </div>
  )
}

export default GearLoader
