import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "../components/AuthField.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import GoogleButton from "../components/GoogleButton.jsx";
import { DEMO_ACCOUNT, signInDemoUser } from "../utils/demoAuth.js";

function LoginPage() {
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const signedIn = signInDemoUser(
        String(formData.get("email") || ""),
        String(formData.get("password") || ""),
      );

      if (!signedIn) {
        setNotice("Those details don't match the demo account below.");
        return;
      }

      navigate("/home");
    } catch (error) {
      console.error("Could not start the local demo session.", error);
      setNotice("Demo sign-in is unavailable in this browser. Please enable local storage and try again.");
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to continue your journey."
    >
      <div className="mb-5 flex justify-center">
        <GoogleButton
          onClick={() =>
            setNotice(
              "Google sign-in is ready to connect to your OAuth provider.",
            )
          }
        />
      </div>

      <div className="mb-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-[var(--color-divider)] dark:bg-[var(--color-surface-hover-dark)]" />
        <span className="text-[11px] font-medium text-[var(--color-muted)]">
          OR
        </span>
        <span className="h-px flex-1 bg-[var(--color-divider)] dark:bg-[var(--color-surface-hover-dark)]" />
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          minLength={8}
        />
        <div>
          <div className="mt-3 flex items-center justify-between gap-3 text-xs">
            <label
              htmlFor="remember"
              className="flex cursor-pointer items-center gap-2 text-[var(--color-muted)] dark:text-[var(--color-muted)]"
            >
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="size-3.5 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-deep)] dark:text-[var(--color-brand-light)] dark:hover:text-[var(--color-brand-lighter)]"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-[var(--color-brand)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] shadow-md shadow-[var(--color-brand)]/20 transition hover:-translate-y-0.5 hover:bg-[var(--color-brand-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
        >
          Sign in
        </button>
      </form>

      <div className="mt-4 rounded-lg border border-[var(--color-divider)] bg-[var(--color-page-tint)] px-3 py-3 text-xs text-[var(--color-secondary)] dark:border-[var(--color-divider-dark)] dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-muted)]">
        <p className="mb-1 font-semibold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
          Demo account
        </p>
        <p className="mb-0">Email: {DEMO_ACCOUNT.email}</p>
        <p className="mb-0">Password: {DEMO_ACCOUNT.password}</p>
        <p className="mb-0 mt-2 text-[10px]">
          Local demo only. This is not a secure or production authentication service.
        </p>
      </div>

      {notice && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-[var(--color-notice-light)] px-3 py-2 text-center text-xs text-[var(--color-brand-hover)] dark:bg-[var(--color-notice-dark)] dark:text-[var(--color-notice-text-dark)]"
        >
          {notice}
        </p>
      )}

      <p className="mt-5 text-center text-xs text-[var(--color-secondary)] dark:text-[var(--color-muted)]">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[var(--color-text-light)] hover:text-[var(--color-brand)] dark:text-[var(--color-text-dark)] dark:hover:text-[var(--color-brand-light)]"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
