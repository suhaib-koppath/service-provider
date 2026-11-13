function AuthField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  required = true,
  minLength,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="sr-only"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full rounded-2xl border border-black/40 dark:border-white/40 bg-[var(--color-input-light)] px-4 py-3 text-sm text-[var(--color-text-light)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/10 dark:border-[var(--color-border-strong)] dark:bg-[var(--color-input-dark)] dark:text-[var(--color-text-dark)] dark:placeholder:text-[var(--color-muted)] dark:focus:border-[var(--color-brand-focus)] dark:focus:ring-[var(--color-brand-focus)]/15"
      />
    </div>
  )
}

export default AuthField
