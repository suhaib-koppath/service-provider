import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getDemoUser, signOutDemoUser } from '../utils/demoAuth.js'
import useTheme from '../utils/useTheme.js'
import { useAdminDemoData } from '../data/adminDemoStore.js'

const links = [
  ['/home', 'Home'],
  ['/services', 'Services'],
  ['/about', 'About us'],
  ['/contact', 'Contact'],
  ['/faq', 'FAQ'],
  ['/reviews', 'Reviews'],
]

function MarketplaceLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(() => getDemoUser())
  const [authNotice, setAuthNotice] = useState('')
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const database = useAdminDemoData()
  const siteSettings = database.settings[0] || {}
  const supportEmail = siteSettings.supportEmail || 'hello@namma.example'
  const supportPhone = siteSettings.supportPhone || '+91 422 400 0123'
  const supportPhoneLink = supportPhone.replace(/[^\d+]/g, '')
  const officeAddress = siteSettings.officeAddress || 'Coimbatore, Tamil Nadu, India'

  function handleSignOut() {
    try {
      signOutDemoUser()
      setUser(null)
      setAuthNotice('')
      setMenuOpen(false)
      navigate('/home')
    } catch (error) {
      console.error('Could not end the local demo session.', error)
      setAuthNotice('Could not sign out in this browser. Please enable local storage and try again.')
    }
  }

  return (
    <div className="marketplace">
      <header className="market-header">
        <div className="market-header-inner">
          <Link className="market-brand" to="/home" aria-label="Thumbly.in home">
            <span className="brand-mark">t</span>
            <span>Thumbly.in</span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
          <nav className={`market-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
            <Link className="mobile-provider-link" to="/become-provider" onClick={() => setMenuOpen(false)}>
              Become a provider
            </Link>
          </nav>
          <div className="market-header-actions">
            <Link className="provider-link" to="/become-provider">Become a provider</Link>
            <button
              className="market-theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
                </svg>
              )}
            </button>
            {user ? (
              <details className="account-menu">
                <summary>
                  <span className="account-avatar">{user.name.slice(0, 1).toUpperCase()}</span>
                  <span className="account-name">{user.name}</span>
                  <span aria-hidden="true">⌄</span>
                </summary>
                <div className="account-dropdown">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                  <small className="demo-account-label">Local demo account</small>
                  <button type="button" onClick={handleSignOut}>Log out</button>
                </div>
              </details>
            ) : (
              <>
                <Link className="button button-outline button-small" to="/login">Log in</Link>
                <Link className="button button-primary button-small" to="/register">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>
      {authNotice && <p className="auth-notice" role="alert">{authNotice}</p>}
      <main>{children}</main>
      <footer className="market-footer">
        <div className="footer-main">
          <div className="footer-about">
            <Link className="market-brand footer-brand" to="/home">
              <span className="brand-mark">t</span><span>Thumbly.in</span>
            </Link>
            <p>Your neighborhood, a little more helpful. Find trusted local people to get life’s everyday jobs done.</p>
            <div className="footer-socials" aria-label="Social media">
              <a href="https://instagram.com" aria-label="Instagram">ig</a>
              <a href="https://facebook.com" aria-label="Facebook">f</a>
              <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/services">All services</Link>
            <Link to="/about">About us</Link>
            <Link to="/reviews">Customer stories</Link>
            <Link to="/become-provider">Join as a provider</Link>
          </div>
          <div className="footer-column">
            <h3>We're here</h3>
            <Link to="/contact">Contact us</Link>
            <Link to="/faq">Frequently asked questions</Link>
            <a href={`tel:${supportPhoneLink}`}>{supportPhone}</a>
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            <span className="footer-address">{officeAddress}</span>
          </div>
          <div className="footer-column">
            <h3>The fine print</h3>
            <Link to="/terms">Terms & conditions</Link>
            <Link to="/privacy">Privacy policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Thumbly.in. Made for the neighborhood.</span>
          <span>Thoughtfully connecting local communities.</span>
        </div>
      </footer>
    </div>
  )
}

export default MarketplaceLayout
