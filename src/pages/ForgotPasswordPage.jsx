import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthField from '../components/AuthField.jsx'
import AuthLayout from '../components/AuthLayout.jsx'

function ForgotPasswordPage() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setNotice('Password reset is ready to connect to your authentication service.')
  }

  return (
    <AuthLayout
      title="Forgot password?"
      description="Enter your email and we’ll help you get back in."
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-[var(--color-brand)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] shadow-md shadow-[var(--color-brand)]/20 transition hover:-translate-y-0.5 hover:bg-[var(--color-brand-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
        >
          Send reset link
        </button>
      </form>

      {notice && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-[var(--color-notice-light)] px-3 py-2 text-center text-xs text-[var(--color-brand-hover)] dark:bg-[var(--color-notice-dark)] dark:text-[var(--color-notice-text-dark)]"
        >
          {notice}
        </p>
      )}

      <p className="mt-5 text-center text-xs text-[var(--color-secondary)] dark:text-[var(--color-muted)]">
        Remember your password?{' '}
        <Link
          to="/login"
          className="font-semibold text-[var(--color-text-light)] hover:text-[var(--color-brand)] dark:text-[var(--color-text-dark)] dark:hover:text-[var(--color-brand-light)]"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
