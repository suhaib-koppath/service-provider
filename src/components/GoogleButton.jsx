function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Continue with Google"
      title="Continue with Google"
      className="grid size-11 place-items-center rounded-full bg-[var(--color-button-light)] transition hover:-translate-y-0.5 hover:bg-[var(--color-button-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] dark:bg-[var(--color-button-dark)] dark:hover:bg-[var(--color-border-strong)] dark:focus-visible:outline-[var(--color-brand-focus)]"
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="size-[16px]">
        <path fill="var(--color-google-red)" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 5)" />
        <path fill="var(--color-google-blue)" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.24l7.73 5.99c4.52-4.18 7.11-10.34 7.11-17.7Z" />
        <path fill="var(--color-google-yellow)" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.95 23.95 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 1)" />
        <path fill="var(--color-google-green)" d="M24 48c6.48 0 11.93-2.13 15.9-5.75l-7.73-5.99c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
      </svg>
    </button>
  )
}

export default GoogleButton
