import { useEffect } from "react";
import GearLoader from "../components/GearLoader.jsx";
import LoadingFooter from "../components/LoadingFooter.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import RotatingCircleFrame from "../components/RotatingCircleFrame.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import useTheme from "../utils/useTheme.js";
import { useNavigate } from "react-router-dom";

function LoadingPage() {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    delay(4);
  }, []);
  const delay = async (s) => {
    await new Promise((resolve) => setTimeout(resolve, s * 1000));
    
    navigate("/home");
    return 0;
  };

  return (
    <main className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-gradient-to-br from-[var(--color-page-tint)] via-[var(--color-page-tint-strong)] to-white px-6 py-16 text-[var(--color-text)] transition-colors duration-500 dark:from-[var(--color-page-dark)] dark:via-[var(--color-surface-dark)] dark:to-[var(--color-page-dark)] dark:text-[var(--color-text-dark)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 hidden aspect-square w-[min(72vw,680px)] scale-[1.18] rounded-full border border-[var(--color-brand)]/[0.1] sm:block dark:border-[var(--color-brand-light)]/[0.12]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 hidden aspect-square w-[min(72vw,680px)] scale-[1.48] rounded-full border border-[var(--color-brand)]/[0.06] sm:block dark:border-[var(--color-brand-light)]/[0.07]"
      />

      {/* <header className="absolute left-6 top-6 animate-[rise-in_700ms_ease-out_both] sm:left-[6vw] sm:top-[34px]">
        <BrandHeader />
      </header> */}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <RotatingCircleFrame className="min-h-[460px] max-w-[460px] animate-[rise-in_900ms_120ms_both] motion-reduce:animate-none">
        <section
          role="status"
          aria-live="polite"
          className="flex w-full max-w-[360px] flex-col items-center text-center"
        >
          <GearLoader />
          <p className="mb-[13px] text-[10px] font-bold tracking-[0.22em] text-[var(--color-muted)] dark:text-[var(--color-muted)]">
            JUST A MOMENT
          </p>
          <h1 className="m-0 text-[clamp(35px,8vw,45px)] font-semibold leading-[1.12] tracking-[-0.055em] text-[var(--color-text)] dark:text-[var(--color-white)]">
            Getting things
            <br />
            ready<span className="text-[var(--color-brand)] dark:text-[var(--color-brand-light)]">.</span>
          </h1>
          <LoadingIndicator />
          <LoadingFooter />
        </section>
      </RotatingCircleFrame>
    </main>
  );
}

export default LoadingPage;
