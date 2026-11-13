import { Link } from 'react-router-dom'
import BrandHeader from './BrandHeader.jsx'
// import ThemeToggle from './ThemeToggle.jsx'
import useTheme from '../utils/useTheme.js'

function AuthLayout({ title, description, children }) {
  // const { theme, toggleTheme } = useTheme()

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-page-light)] px-4  transition-colors dark:bg-[var(--color-page-dark)] sm:px-6">
      <div aria-hidden="true" className="absolute inset-0 " />
      {/* <ThemeToggle theme={theme} onToggle={toggleTheme} /> */}

      <div className="relative grid w-full //max-w-[1120px] overflow-hidden rounded-[30px]  shadow-[0_32px_100px_rgba(0,0,0,.22)] transition-colors dark:shadow-[0_32px_100px_rgba(0,0,0,.55)] md:min-h-[620px] md:grid-cols-[0.82fr_1.18fr]">
        <section className="flex items-center justify-center px-7 py-10 sm:px-12 md:px-11 lg:px-[68px]">
          <div className="w-full max-w-[360px]">
            <Link to="/" aria-label="Nishin Ideas home" className="mb-6 flex justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
              <BrandHeader />
            </Link>
            <h1 className="text-center text-3xl font-extrabold leading-tight tracking-[-0.045em] text-[var(--color-heading-light)] dark:text-[var(--color-text-dark)] sm:text-[38px]">{title}</h1>
            <p className="mt-2 mb-6 text-center text-sm leading-6 text-[var(--color-muted)] dark:text-[var(--color-muted)]">{description}</p>
            {children}
          </div>
        </section>

        <aside className="relative isolate hidden min-h-[570px] overflow-hidden rounded-[24px] bg-[var(--color-art-315c48)] md:block">
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,var(--color-art-263f3a)_0%,var(--color-art-56785d)_34%,var(--color-art-9aae7e)_62%,var(--color-art-294a37)_100%)]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-75 [background-image:radial-gradient(ellipse_at_14%_18%,rgba(12,38,34,.82)_0,transparent_39%),radial-gradient(ellipse_at_88%_24%,rgba(11,39,34,.72)_0,transparent_36%),radial-gradient(ellipse_at_30%_78%,rgba(10,36,28,.9)_0,transparent_40%),radial-gradient(ellipse_at_78%_84%,rgba(12,35,27,.8)_0,transparent_42%)]" />
          <svg aria-hidden="true" className="absolute inset-0 -z-[1] h-full w-full" viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--color-art-a9b995)"/><stop offset="1" stopColor="var(--color-art-42634b)"/></linearGradient>
              <linearGradient id="hillFront" x1="0" y1="0" x2=".4" y2="1"><stop stopColor="var(--color-art-789064)"/><stop offset="1" stopColor="var(--color-art-183a2d)"/></linearGradient>
              <linearGradient id="trail" x1="0" y1="0" x2="1" y2=".5"><stop stopColor="var(--color-art-b5a68d)"/><stop offset=".55" stopColor="var(--color-art-e7d8bd)"/><stop offset="1" stopColor="var(--color-art-a18e72)"/></linearGradient>
              <pattern id="forestTexture" width="56" height="48" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="12" r="10" fill="var(--color-art-15392f)" opacity=".42"/>
                <circle cx="32" cy="8" r="13" fill="var(--color-art-234a38)" opacity=".44"/>
                <circle cx="49" cy="29" r="15" fill="var(--color-art-183d30)" opacity=".5"/>
                <circle cx="18" cy="38" r="14" fill="var(--color-art-2d563d)" opacity=".46"/>
              </pattern>
              <filter id="soft"><feGaussianBlur stdDeviation="18"/></filter>
            </defs>
            <path d="M0 240 140 155l100 54 110-119 110 86 100-104 130 112 110-62v420H0Z" fill="url(#hillBack)" opacity=".8"/>
            <path d="M0 340 130 275l135 65 126-102 126 84 130-89 153 87v310H0Z" fill="var(--color-art-496b4e)" opacity=".78"/>
            <path d="M0 455q140-122 280-75t250-12q145-91 270-11v543H0Z" fill="url(#hillFront)"/>
            <path d="M0 240 140 155l100 54 110-119 110 86 100-104 130 112 110-62v420H0Z" fill="url(#forestTexture)" opacity=".74"/>
            <path d="M0 340 130 275l135 65 126-102 126 84 130-89 153 87v310H0Z" fill="url(#forestTexture)" opacity=".8"/>
            <path d="M0 455q140-122 280-75t250-12q145-91 270-11v543H0Z" fill="url(#forestTexture)" opacity=".76"/>
            <g fill="var(--color-art-183c30)" opacity=".5" filter="url(#soft)"><ellipse cx="105" cy="490" rx="175" ry="95"/><ellipse cx="700" cy="550" rx="185" ry="116"/><ellipse cx="422" cy="750" rx="325" ry="130"/></g>
            <path d="M418 153c-36 91 46 139 13 212-29 63-121 97-96 161 29 73 134 84 111 155-17 54-124 95-126 219h139c4-117 99-167 91-252-9-96-115-111-105-178 11-73 103-108 76-193-21-64-86-80-76-145Z" fill="url(#trail)" opacity=".96"/>
            <path d="M458 177c-19 74 36 119 9 182-24 54-112 93-91 151 26 72 113 86 91 156-15 48-93 94-98 200" fill="none" stroke="var(--color-art-f6eddb)" strokeOpacity=".68" strokeWidth="5"/>
            <g fill="var(--color-art-274b36)" opacity=".88"><path d="m73 433 34-104 35 104h-19v35H92v-35Z"/><path d="m654 420 43-128 42 128h-24v42h-38v-42Z"/><path d="m567 565 28-84 29 84h-16v31h-26v-31Z"/><path d="m186 640 37-111 37 111h-21v38h-33v-38Z"/><path d="m690 685 35-104 35 104h-20v39h-31v-39Z"/></g>
          </svg>
          <div className="absolute left-7 top-7 rounded-full border border-[var(--color-white)]/35 bg-[var(--color-white)]/15 px-3 py-2 text-xs font-semibold tracking-wide text-[var(--color-white)] shadow-lg backdrop-blur-md">NISHIN IDEAS <span className="ml-1 text-emerald-100">· FIND YOUR WAY</span></div>
          <div className="absolute left-[13%] top-[31%] flex items-center gap-3 rounded-2xl border border-[var(--color-white)]/25 bg-[var(--color-white)]/20 px-4 py-3 text-xs text-[var(--color-white)] shadow-xl backdrop-blur-md">
            <span className="grid size-9 place-items-center rounded-full bg-[var(--color-white)]/25 text-lg">⌂</span><span><b className="block">A place to begin</b><span className="text-[var(--color-white)]/75">Your next idea awaits</span></span>
          </div>
          <div className="absolute right-[9%] top-[46%] rounded-2xl border border-[var(--color-white)]/25 bg-[var(--color-white)]/20 px-4 py-3 text-xs text-[var(--color-white)] shadow-xl backdrop-blur-md"><b className="block">Keep exploring</b><span className="text-[var(--color-white)]/75">Take the scenic route</span></div>
          <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-white)]/90 px-5 py-2 text-xs font-semibold text-[var(--color-art-315c48)] shadow-lg">Discover · Create · Grow</div>
        </aside>
      </div>
    </main>
  )
}

export default AuthLayout
