import { useMemo, useState } from 'react'
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addActivity, getAdminDemoData, makeDemoId, resetAdminDemoData, saveAdminDemoData, useAdminDemoData } from '../data/adminDemoStore.js'
import { DEMO_ADMIN_ACCOUNT, getAdminSession, signInDemoAdmin, signOutDemoAdmin } from '../utils/adminDemoAuth.js'
import '../admin.css'

const navigation = [
  { path: '', label: 'Dashboard', icon: '▦' },
  { path: 'services', label: 'Services', icon: '⌂' },
  { path: 'employees', label: 'Employees', icon: '♙' },
  { path: 'providers', label: 'Service Providers', icon: '♧' },
  { path: 'bookings', label: 'Bookings', icon: '▤' },
  { path: 'customers', label: 'Customers', icon: '♧' },
  { path: 'reviews', label: 'Reviews & Ratings', icon: '☆' },
  { path: 'locations', label: 'Locations', icon: '⌖' },
  { path: 'website-content', label: 'Website Content', icon: '▧' },
  { path: 'admin-management', label: 'Admin Management', icon: '♙' },
  { path: 'settings', label: 'Settings', icon: '⚙' },
  { path: 'activity-logs', label: 'Activity Logs', icon: '◷' },
]

const EMPTY_RECORDS = []

const selectFields = {
  providerId: { label: 'Service provider', options: 'providers', value: 'id', text: 'fullName' },
  employeeId: { label: 'Employee', options: 'employees', value: 'id', text: 'fullName' },
  serviceId: { label: 'Service', options: 'services', value: 'id', text: 'title' },
}

const statusOptions = ['Active', 'Inactive', 'Pending', 'Approved', 'Rejected', 'Suspended', 'Published', 'Hidden', 'Pending review', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled']

const modules = {
  services: {
    key: 'services', title: 'Services', singular: 'service', description: 'Manage the services customers can browse directly on the marketplace.',
    columns: [['title', 'Service'], ['startingPrice', 'Starting price'], ['providerId', 'Provider'], ['enabled', 'Status']],
    fields: [
      { name: 'title', label: 'Service title', required: true },
      { name: 'description', label: 'Detailed description', type: 'textarea', required: true },
      { name: 'images', label: 'Image URL', type: 'image' },
      { name: 'startingPrice', label: 'Starting price (₹)', type: 'number', required: true },
      { name: 'priceRange', label: 'Price range' },
      { name: 'duration', label: 'Service duration' },
      { name: 'locations', label: 'Coverage locations' },
      { name: 'requirements', label: 'Requirements', type: 'textarea' },
      { name: 'providerId', type: 'select', required: true },
      { name: 'enabled', label: 'Visible on website', type: 'checkbox' },
    ],
  },
  employees: {
    key: 'employees', title: 'Employees', singular: 'employee', description: 'Manage in-house team profiles, skills, and availability.',
    columns: [['profileImage', ''], ['fullName', 'Employee'], ['employeeId', 'Employee ID'], ['phone', 'Phone'], ['location', 'Location'], ['availability', 'Availability'], ['status', 'Status']],
    fields: [
      { name: 'fullName', label: 'Full name', required: true }, { name: 'employeeId', label: 'Employee ID', required: true },
      { name: 'profileImage', label: 'Profile image', type: 'image' }, { name: 'phone', label: 'Phone number', type: 'tel', required: true },
      { name: 'email', label: 'Email address', type: 'email' }, { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'gender', label: 'Gender (optional)' }, { name: 'experience', label: 'Experience' },
      { name: 'skills', label: 'Skills and specialization', type: 'textarea' }, { name: 'location', label: 'Working locations' },
      { name: 'availability', label: 'Availability' }, { name: 'joiningDate', label: 'Joining date', type: 'date' },
      { name: 'status', label: 'Account status', type: 'select', options: statusOptions },
    ],
  },
  providers: {
    key: 'providers', title: 'Service Providers', singular: 'provider', description: 'Review independent provider applications and manage their marketplace profiles.',
    columns: [['profileImage', ''], ['fullName', 'Provider'], ['phone', 'Phone'], ['location', 'Location'], ['rating', 'Rating'], ['status', 'Status']],
    fields: [
      { name: 'fullName', label: 'Full name', required: true }, { name: 'profileImage', label: 'Profile image', type: 'image' },
      { name: 'phone', label: 'Phone number', type: 'tel', required: true }, { name: 'email', label: 'Email address', type: 'email' },
      { name: 'skills', label: 'Services offered and skills', type: 'textarea' },
      { name: 'experience', label: 'Experience' }, { name: 'location', label: 'Service location' },
      { name: 'availability', label: 'Availability' }, { name: 'status', label: 'Application status', type: 'select', options: statusOptions },
      { name: 'verified', label: 'Provider details verified', type: 'checkbox' },
      { name: 'rating', label: 'Rating', type: 'number' }, { name: 'reviewCount', label: 'Review count', type: 'number' },
    ],
  },
  bookings: {
    key: 'bookings', title: 'Bookings', singular: 'booking', description: 'Review bookings, assign providers, and update progress.',
    columns: [['id', 'Booking'], ['customerName', 'Customer'], ['serviceTitle', 'Service'], ['providerId', 'Provider'], ['employeeId', 'Employee'], ['date', 'Date'], ['location', 'Location'], ['amount', 'Amount'], ['status', 'Status'], ['paymentStatus', 'Payment']],
    fields: [
      { name: 'customerName', label: 'Customer name', required: true }, { name: 'customerPhone', label: 'Customer phone', type: 'tel' },
      { name: 'serviceId', type: 'select', required: true },
      { name: 'providerId', type: 'select' }, { name: 'employeeId', type: 'select' },
      { name: 'date', label: 'Booking date', type: 'date' }, { name: 'time', label: 'Time' }, { name: 'location', label: 'Location' },
      { name: 'status', label: 'Booking status', type: 'select', options: ['Pending', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled', 'Rejected'] },
      { name: 'amount', label: 'Amount (₹)', type: 'number' }, { name: 'paymentStatus', label: 'Payment status', type: 'select', options: ['Unpaid', 'Paid', 'Refunded'] },
    ],
  },
  customers: {
    key: 'customers', title: 'Customers', singular: 'customer', description: 'View customer contact details and booking history.',
    columns: [['fullName', 'Customer'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['bookings', 'Bookings'], ['status', 'Status']],
    fields: [
      { name: 'fullName', label: 'Full name', required: true }, { name: 'email', label: 'Email address', type: 'email' },
      { name: 'phone', label: 'Phone number', type: 'tel' }, { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'location', label: 'Location' }, { name: 'joined', label: 'Joined date', type: 'date' },
      { name: 'bookings', label: 'Booking count', type: 'number' }, { name: 'status', label: 'Account status', type: 'select', options: ['Active', 'Inactive', 'Suspended'] },
    ],
  },
  reviews: {
    key: 'reviews', title: 'Reviews & Ratings', singular: 'review', description: 'Moderate customer feedback and service ratings.',
    columns: [['customerName', 'Customer'], ['serviceTitle', 'Service'], ['providerName', 'Provider'], ['rating', 'Rating'], ['comment', 'Review'], ['date', 'Date'], ['status', 'Status']],
    fields: [
      { name: 'customerName', label: 'Customer', required: true }, { name: 'serviceTitle', label: 'Service' },
      { name: 'providerName', label: 'Provider' }, { name: 'rating', label: 'Rating (1–5)', type: 'number', required: true },
      { name: 'comment', label: 'Review', type: 'textarea', required: true }, { name: 'date', label: 'Date', type: 'date' },
      { name: 'status', label: 'Visibility', type: 'select', options: ['Published', 'Pending review', 'Hidden'] },
    ],
  },
  locations: {
    key: 'locations', title: 'Locations', singular: 'location', description: 'Maintain the areas where providers and services are available.',
    columns: [['state', 'State'], ['district', 'District'], ['town', 'Town'], ['areas', 'Local areas'], ['enabled', 'Status']],
    fields: [
      { name: 'state', label: 'State', required: true }, { name: 'district', label: 'District', required: true },
      { name: 'town', label: 'Town / city', required: true }, { name: 'areas', label: 'Local areas', type: 'textarea' },
      { name: 'enabled', label: 'Available for selection', type: 'checkbox' },
    ],
  },
  'website-content': {
    key: 'content', title: 'Website Content', singular: 'content item', description: 'Manage homepage and public website copy in this local demo.',
    columns: [['section', 'Section'], ['title', 'Title'], ['body', 'Content'], ['enabled', 'Published']],
    fields: [
      { name: 'section', label: 'Page section', required: true }, { name: 'title', label: 'Title', required: true },
      { name: 'body', label: 'Content', type: 'textarea', required: true }, { name: 'image', label: 'Image', type: 'image' },
      { name: 'enabled', label: 'Published', type: 'checkbox' },
    ],
  },
  'admin-management': {
    key: 'admins', title: 'Admin Management', singular: 'admin account', description: 'Admin account provisioning requires a server-side admin-management API.',
    columns: [['fullName', 'Administrator'], ['email', 'Email'], ['role', 'Role'], ['status', 'Status'], ['lastLogin', 'Last login']],
    fields: [], readOnly: true, serverOnly: true,
  },
  settings: {
    key: 'settings', title: 'Settings', singular: 'settings record', description: 'Update the marketplace contact and notification preferences for this demo.',
    columns: [['businessName', 'Marketplace'], ['supportEmail', 'Support email'], ['supportPhone', 'Phone'], ['currency', 'Currency'], ['notifications', 'Notifications']],
    fields: [
      { name: 'businessName', label: 'Marketplace name', required: true }, { name: 'supportEmail', label: 'Support email', type: 'email' },
      { name: 'supportPhone', label: 'Support phone', type: 'tel' }, { name: 'officeAddress', label: 'Office address', type: 'textarea' },
      { name: 'currency', label: 'Currency' }, { name: 'timezone', label: 'Timezone' },
      { name: 'notifications', label: 'Demo notifications enabled', type: 'checkbox' }, { name: 'twoFactorEnabled', label: 'Two-factor auth (backend required)', type: 'checkbox' },
    ], singleRecord: true,
  },
  'activity-logs': {
    key: 'activityLogs', title: 'Activity Logs', singular: 'activity log', description: 'Recent actions performed in this browser demo.',
    columns: [['action', 'Activity'], ['actor', 'Administrator'], ['date', 'Time']],
    fields: [], readOnly: true,
  },
}

function AdminGuard() {
  const location = useLocation()
  const session = getAdminSession()
  if (!session || session.role !== 'Admin') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return <AdminLayout />
}

function AdminLoginPage() {
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  if (getAdminSession()?.role === 'Admin') return <Navigate to="/admin" replace />

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setNotice('')
    const form = new FormData(event.currentTarget)
    try {
      if (!signInDemoAdmin(String(form.get('email') || ''), String(form.get('password') || ''))) {
        setNotice('The email or password did not match the demo administrator account.')
        return
      }
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (error) {
      console.error('Could not start the local demo admin session.', error)
      setNotice('Demo sign-in could not be saved in this browser. Check local storage settings and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <Link className="admin-login-brand" to="/home"><span className="admin-brand-mark">t</span> Thumbly.in <span> / ADMIN</span></Link>
        <div className="admin-login-icon">▦</div>
        <p className="admin-eyebrow">MARKETPLACE CONTROL ROOM</p>
        <h1>Administrator sign in</h1>
        <p className="admin-login-intro">Sign in to explore the local admin dashboard demo.</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>Email address<input name="email" type="email" autoComplete="username" required placeholder="admin@namma.demo" /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" required placeholder="Your password" /></label>
          <button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'} <span>→</span></button>
        </form>
        {notice && <p role="alert" className="admin-login-error">{notice}</p>}
        <div className="admin-login-credentials"><strong>Demo administrator</strong><span>{DEMO_ADMIN_ACCOUNT.email}</span><span>{DEMO_ADMIN_ACCOUNT.password}</span></div>
        <p className="admin-security-note">Demo only: this client-side login is not secure authentication and must not be used for real admin access.</p>
        <Link className="admin-back-link" to="/home">← Back to the marketplace</Link>
      </div>
    </main>
  )
}

function AdminLayout() {
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const session = getAdminSession()
  const activeSection = location.pathname.split('/')[2] || ''
  const activeItem = navigation.find((item) => item.path === activeSection) || navigation[0]

  function handleLogout() {
    try {
      signOutDemoAdmin()
      navigate('/admin/login', { replace: true })
    } catch (error) {
      console.error('Could not end the local demo admin session.', error)
      window.alert('Could not sign out. Please check local browser storage settings.')
    }
  }

  return (
    <div className="admin-app">
      {mobileSidebar && <button className="admin-mobile-shade" type="button" aria-label="Close menu" onClick={() => setMobileSidebar(false)} />}
      <aside className={`admin-sidebar${mobileSidebar ? ' is-open' : ''}`}>
        <Link to="/admin" className="admin-brand"><span className="admin-brand-mark">t</span><span>Thumbly.in<small>ADMIN CONSOLE</small></span></Link>
        <p className="admin-nav-label">WORKSPACE</p>
        <nav aria-label="Admin navigation">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path ? `/admin/${item.path}` : '/admin'} end={!item.path} onClick={() => setMobileSidebar(false)}>
              <span className="admin-nav-icon" aria-hidden="true">{item.icon}</span>{item.label}
              {item.path === 'bookings' && <span className="admin-nav-count">{getAdminDemoData().bookings.filter((booking) => booking.status === 'Pending').length}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-bottom"><span className="admin-sidebar-status" /> Demo data stored in this browser</div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button type="button" className="admin-menu-button" onClick={() => setMobileSidebar(true)} aria-label="Open admin navigation">☰</button>
          <div className="admin-breadcrumb"><span>Workspace</span><b>/</b><strong>{activeItem.label}</strong></div>
          <div className="admin-topbar-right"><span className="admin-demo-chip">DEMO MODE</span><div className="admin-user"><span>{session?.name?.slice(0, 1) || 'A'}</span><div><strong>{session?.name || 'Admin'}</strong><small>Administrator</small></div></div><button className="admin-logout" type="button" onClick={handleLogout}>Log out</button></div>
        </header>
        <main className="admin-content">
          <div className="admin-demo-banner"><strong>Frontend demo only</strong><span>Changes are saved to this browser’s local storage. No API, database, or secure server-side authorization is connected.</span></div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const data = useAdminDemoData()
  const enabledServices = data.services.filter((service) => service.enabled)
  const pendingBookings = data.bookings.filter((booking) => booking.status === 'Pending')
  const completedBookings = data.bookings.filter((booking) => booking.status === 'Completed')
  const revenue = data.bookings.filter((booking) => booking.paymentStatus === 'Paid').reduce((total, booking) => total + Number(booking.amount || 0), 0)
  const stats = [
    { label: 'Total services', value: data.services.length, icon: '⌂', tone: 'sage', note: `${enabledServices.length} visible in marketplace` },
    { label: 'Total employees', value: data.employees.length, icon: '♙', tone: 'peach', note: 'In-house team' },
    { label: 'Total providers', value: data.providers.length, icon: '♧', tone: 'lavender', note: 'Independent professionals' },
    { label: 'Total customers', value: data.customers.length, icon: '♧', tone: 'blue', note: 'Demo accounts' },
    { label: 'Total bookings', value: data.bookings.length, icon: '▤', tone: 'sage', note: 'All booking statuses' },
    { label: 'Pending bookings', value: pendingBookings.length, icon: '◷', tone: 'peach', note: 'Need attention' },
    { label: 'Completed bookings', value: completedBookings.length, icon: '✓', tone: 'lavender', note: 'Marked completed' },
    { label: 'Total revenue', value: `₹${revenue.toLocaleString('en-IN')}`, icon: '₹', tone: 'sage', note: 'Paid demo bookings' },
    { label: 'Locations', value: data.locations.filter((item) => item.enabled).length, icon: '⌖', tone: 'peach', note: 'Service areas enabled' },
  ]

  return (
    <div className="admin-dashboard">
      <div className="admin-page-heading"><div><p className="admin-eyebrow">FRIDAY, {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</p><h1>Good morning, {getAdminSession()?.name?.split(' ')[0] || 'Admin'}.</h1><p>Here’s what’s happening across your local services marketplace.</p></div><Link className="admin-primary-button" to="/admin/bookings">Review bookings <span>→</span></Link></div>
      <div className="admin-stats-grid">{stats.map((item) => <article className="admin-stat-card" key={item.label}><div className={`admin-stat-icon ${item.tone}`}>{item.icon}</div><span className="admin-stat-label">{item.label}</span><strong>{item.value}</strong><small>{item.note}</small></article>)}</div>
      <div className="admin-chart-grid">
        <BookingChart bookings={data.bookings} />
        <RevenueChart bookings={data.bookings} />
      </div>
      <div className="admin-dashboard-lower">
        <section className="admin-panel admin-recent-panel"><div className="admin-panel-heading"><div><h2>Recent bookings</h2><p>The latest activity on the marketplace</p></div><Link to="/admin/bookings">View all →</Link></div><RecentBookings rows={[...data.bookings].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)} /></section>
        <section className="admin-panel admin-quick-panel"><div className="admin-panel-heading"><div><h2>Quick actions</h2><p>Common tasks, one click away</p></div></div><div className="admin-quick-actions"><Link to="/admin/services"><span>⌂</span><div><strong>Add a service</strong><small>Publish to the marketplace</small></div><b>→</b></Link><Link to="/admin/bookings"><span>▤</span><div><strong>Manage bookings</strong><small>Assign and update jobs</small></div><b>→</b></Link><Link to="/admin/providers"><span>♧</span><div><strong>Review providers</strong><small>Manage applications</small></div><b>→</b></Link></div></section>
      </div>
      <div className="admin-dashboard-lower admin-people-row">
        <SimplePeoplePanel title="Recently registered employees" emptyText="No employee profiles yet." rows={data.employees.slice(0, 4)} nameKey="fullName" metaKey="employeeId" imageKey="profileImage" />
        <SimplePeoplePanel title="Recently registered customers" emptyText="No customer profiles yet." rows={data.customers.slice(0, 4)} nameKey="fullName" metaKey="email" />
      </div>
    </div>
  )
}

function BookingChart({ bookings }) {
  const statuses = ['Pending', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled', 'Rejected']
  const maximum = Math.max(1, ...statuses.map((status) => bookings.filter((item) => item.status === status).length))
  return (
    <section className="admin-panel admin-booking-chart"><div className="admin-panel-heading"><div><h2>Booking overview</h2><p>Current bookings by status</p></div><span className="admin-chart-period">ALL TIME</span></div><div className="admin-bar-chart">{statuses.map((status) => { const count = bookings.filter((item) => item.status === status).length; return <div className="admin-bar-row" key={status}><span>{status}</span><div><i style={{ width: `${Math.max(count ? 5 : 0, (count / maximum) * 100)}%` }} /></div><strong>{count}</strong></div> })}</div></section>
  )
}

function RevenueChart({ bookings }) {
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - (5 - index))
    return { key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`, label: date.toLocaleDateString('en-IN', { month: 'short' }) }
  })
  const amounts = months.map((month) => bookings.filter((booking) => booking.date?.slice(0, 7) === month.key && booking.paymentStatus === 'Paid').reduce((total, booking) => total + Number(booking.amount || 0), 0))
  const peak = Math.max(1, ...amounts)
  const points = amounts.map((amount, index) => `${28 + index * 64},${142 - (amount / peak) * 110}`).join(' ')
  const total = amounts.reduce((sum, amount) => sum + amount, 0)
  return (
    <section className="admin-panel admin-revenue-chart"><div className="admin-panel-heading"><div><h2>Monthly revenue</h2><p>Paid demo bookings · last 6 months</p></div><strong className="admin-revenue-total">₹{total.toLocaleString('en-IN')}</strong></div><svg className="admin-line-chart" viewBox="0 0 360 180" role="img" aria-label="Monthly revenue chart"><path className="admin-chart-gridline" d="M20 32H345M20 87H345M20 142H345" /><polyline points={points} /><polygon points={`28,142 ${points} 348,142`} />{amounts.map((amount, index) => <circle key={months[index].key} cx={28 + index * 64} cy={142 - (amount / peak) * 110} r="4" />)}</svg><div className="admin-month-labels">{months.map((month) => <span key={month.key}>{month.label}</span>)}</div></section>
  )
}

function RecentBookings({ rows }) {
  return <div className="admin-recent-table-wrap"><table className="admin-table"><thead><tr><th>Booking</th><th>Customer / service</th><th>Date</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td><strong>{row.id}</strong></td><td><strong>{row.customerName}</strong><small>{row.serviceTitle}</small></td><td>{row.date}</td><td><StatusBadge value={row.status} /></td></tr>)}</tbody></table></div>
}

function SimplePeoplePanel({ title, emptyText, rows, nameKey, metaKey, imageKey }) {
  return <section className="admin-panel admin-people-panel"><div className="admin-panel-heading"><div><h2>{title}</h2><p>Recently added profiles</p></div></div>{rows.length ? rows.map((row) => <div className="admin-person-row" key={row.id}><span className="admin-person-avatar">{imageKey && row[imageKey] ? <img src={row[imageKey]} alt="" /> : row[nameKey]?.slice(0, 1)}</span><div><strong>{row[nameKey]}</strong><small>{row[metaKey]}</small></div><span className="admin-person-status">Active</span></div>) : <div className="admin-empty-small">{emptyText}</div>}</section>
}

function AdminSection() {
  const { section } = useParams()
  const config = modules[section]
  const database = useAdminDemoData()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [formRecord, setFormRecord] = useState(null)
  const [toast, setToast] = useState(null)
  const pageSize = 8
  const records = config ? database[config.key] || EMPTY_RECORDS : EMPTY_RECORDS

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return records.filter((record) => {
      const matchesSearch = !normalizedQuery || Object.values(record).some((value) => String(value ?? '').toLowerCase().includes(normalizedQuery))
      const status = record.status ?? (typeof record.enabled === 'boolean' ? (record.enabled ? 'Active' : 'Inactive') : '')
      const matchesDate = !dateFilter || record.date === dateFilter
      const matchesLocation = !locationFilter || String(record.location || '').toLowerCase().includes(locationFilter.toLowerCase())
      return matchesSearch && matchesDate && matchesLocation && (!statusFilter || status === statusFilter)
    })
  }, [records, query, statusFilter, dateFilter, locationFilter])

  if (!config) return <div className="admin-not-found"><h1>Page not found</h1><p>This admin section does not exist.</p></div>

  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize))
  const visibleRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const hasStatus = records.some((record) => record.status || typeof record.enabled === 'boolean')
  const statuses = [...new Set(records.map((record) => record.status ?? (typeof record.enabled === 'boolean' ? (record.enabled ? 'Active' : 'Inactive') : '')).filter(Boolean))]

  function showToast(type, message) {
    setToast({ type, message })
  }

  function handleSave(values) {
    const isEditing = Boolean(formRecord?.id)
    const record = { ...values }
    if (!isEditing) {
      record.id = makeDemoId(config.key.slice(0, 3).toUpperCase(), values.name || values.title || values.fullName || values.section || config.singular)
    } else {
      record.id = formRecord.id
    }

    if (config.key === 'services') {
      record.rating = record.rating || 'New'
      record.reviewCount = Number(record.reviewCount || 0)
    }
    if (config.key === 'bookings') {
      const service = database.services.find((item) => item.id === record.serviceId)
      const provider = database.providers.find((item) => item.id === record.providerId)
      const employee = database.employees.find((item) => item.id === record.employeeId)
      if (service) {
        record.serviceTitle = service.title
      }
      record.providerName = provider?.fullName || ''
      record.employeeName = employee?.fullName || ''
    }
    if (config.key === 'providers') {
      record.rating = String(record.rating || 'New')
      record.reviewCount = Number(record.reviewCount || 0)
    }
    if (config.key === 'settings') record.id = records[0]?.id || 'SETTINGS-01'

    try {
      const nextRecords = config.singleRecord
        ? [record]
        : isEditing
          ? records.map((item) => item.id === record.id ? record : item)
          : [record, ...records]
      const action = `${isEditing ? 'Updated' : 'Created'} ${config.singular}: ${values.name || values.title || values.fullName || values.section || ''}`.trim()
      saveAdminDemoData(addActivity({ ...database, [config.key]: nextRecords }, action))
      setFormRecord(null)
      setCurrentPage(1)
      showToast('success', `${config.singular[0].toUpperCase()}${config.singular.slice(1)} ${isEditing ? 'updated' : 'created'} in this browser demo.`)
    } catch (error) {
      console.error(`Could not save demo ${config.singular}.`, error)
      showToast('error', 'Could not save this change to browser storage. Check available storage and try again.')
    }
  }

  function handleDelete(record) {
    if (config.key === 'admins' || config.key === 'settings') return
    if (!window.confirm(`Delete “${record.name || record.title || record.fullName || record.id}” from this browser demo?`)) return

    try {
      const next = records.filter((item) => item.id !== record.id)
      saveAdminDemoData(addActivity({ ...database, [config.key]: next }, `Deleted ${config.singular}: ${record.name || record.title || record.fullName || record.id}`))
      setCurrentPage((page) => Math.min(page, Math.max(1, Math.ceil(next.length / pageSize))))
      showToast('success', `${config.singular[0].toUpperCase()}${config.singular.slice(1)} removed from this demo.`)
    } catch (error) {
      console.error(`Could not delete demo ${config.singular}.`, error)
      showToast('error', 'Could not save this change to browser storage.')
    }
  }

  function handleReset() {
    if (!window.confirm('Reset all admin demo records in this browser to the original sample data?')) return
    try {
      resetAdminDemoData()
      setCurrentPage(1)
      setQuery('')
      setStatusFilter('')
      setDateFilter('')
      setLocationFilter('')
      showToast('success', 'Demo data has been restored to its original sample state.')
    } catch (error) {
      console.error('Could not reset the local admin demo data.', error)
      showToast('error', 'Could not reset browser storage. Check available storage and try again.')
    }
  }

  const canCreate = !config.readOnly && !config.singleRecord

  return (
    <div className="admin-section-page">
      <div className="admin-page-heading admin-section-heading"><div><p className="admin-eyebrow">MARKETPLACE OPERATIONS</p><h1>{config.title}</h1><p>{config.description}</p></div><div className="admin-section-actions">{section === 'settings' && <button className="admin-secondary-button" type="button" onClick={handleReset}>Reset demo data</button>}{canCreate && <button className="admin-primary-button" type="button" onClick={() => setFormRecord({})}><span>＋</span> Add {config.singular}</button>}{config.singleRecord && records[0] && <button className="admin-primary-button" type="button" onClick={() => setFormRecord(records[0])}>Edit settings <span>→</span></button>}</div></div>
      {config.serverOnly && <div className="admin-feature-notice"><strong>Server-side setup required</strong><span>Public admin creation, role assignment, and permission enforcement are intentionally unavailable in this client-only demo.</span></div>}
      {toast && <div className={`admin-toast ${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'}><span>{toast.message}</span><button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}>×</button></div>}
      <section className="admin-panel admin-data-panel">
        <div className="admin-data-toolbar"><div className="admin-data-count"><strong>{filteredRecords.length}</strong><span>{config.title.toLowerCase()} in this demo</span></div><div className="admin-data-filters"><label className="admin-search"><span aria-hidden="true">⌕</span><input aria-label={`Search ${config.title}`} value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1) }} placeholder={`Search ${config.title.toLowerCase()}...`} /></label>{section === 'bookings' && <><input className="admin-filter-date" aria-label="Filter by booking date" type="date" value={dateFilter} onChange={(event) => { setDateFilter(event.target.value); setCurrentPage(1) }} /><input className="admin-filter-location" aria-label="Filter by location" value={locationFilter} onChange={(event) => { setLocationFilter(event.target.value); setCurrentPage(1) }} placeholder="Location" /></>}{hasStatus && <select aria-label="Filter by status" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setCurrentPage(1) }}><option value="">All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select>}</div></div>
        {visibleRecords.length ? (
          <>
            <div className="admin-table-scroll"><table className="admin-table admin-data-table"><thead><tr>{config.columns.map(([key, label]) => <th key={key}>{label || (key.toLowerCase().includes('image') ? 'Photo' : key)}</th>)}{!config.readOnly && !config.serverOnly && <th>Actions</th>}</tr></thead><tbody>{visibleRecords.map((record) => <tr key={record.id}>{config.columns.map(([key]) => <td key={key}>{renderCell(key, record[key], record, database)}</td>)}{!config.readOnly && !config.serverOnly && <td><div className="admin-row-actions"><button type="button" onClick={() => setFormRecord(record)}>Edit</button>{!config.singleRecord && <button type="button" className="danger" onClick={() => handleDelete(record)}>Delete</button>}</div></td>}</tr>)}</tbody></table></div>
            <div className="admin-pagination"><span>Showing {Math.min((currentPage - 1) * pageSize + 1, filteredRecords.length)}–{Math.min(currentPage * pageSize, filteredRecords.length)} of {filteredRecords.length}</span><div><button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>←</button><span>Page {currentPage} of {pageCount}</span><button type="button" aria-label="Next page" disabled={currentPage >= pageCount} onClick={() => setCurrentPage(currentPage + 1)}>→</button></div></div>
          </>
        ) : <div className="admin-empty-state"><span>⌕</span><h2>{query ? 'No matching records' : `No ${config.title.toLowerCase()} yet`}</h2><p>{query ? 'Try another search or clear the current filter.' : 'Add a record to get started in this demo.'}</p>{query && <button className="admin-secondary-button" type="button" onClick={() => { setQuery(''); setStatusFilter('') }}>Clear filters</button>}</div>}
      </section>
      {formRecord && <RecordForm config={config} record={formRecord.id ? formRecord : null} database={database} onClose={() => setFormRecord(null)} onSave={handleSave} />}
    </div>
  )
}

function renderCell(key, value, record, database) {
  if (key === 'profileImage' || key === 'image') return value ? <img className="admin-table-avatar" src={value} alt="" /> : <span className="admin-table-avatar admin-avatar-placeholder">{(record.fullName || record.name || '•').slice(0, 1)}</span>
  if (key === 'enabled' || key === 'verified') return <StatusBadge value={value ? (key === 'verified' ? 'Verified' : 'Active') : 'Inactive'} />
  if (key === 'status' || key === 'paymentStatus') return <StatusBadge value={value} />
  if (key === 'providerId') return database.providers.find((provider) => provider.id === value)?.fullName || value || '—'
  if (key === 'employeeId') return database.employees.find((employee) => employee.id === value)?.fullName || value || '—'
  if (key === 'serviceId') return database.services.find((service) => service.id === value)?.title || value || '—'
  if (key === 'startingPrice' || key === 'amount') return value === undefined || value === '' ? '—' : `₹${Number(value).toLocaleString('en-IN')}`
  if (key === 'rating') return value ? <span className="admin-rating">★ {value}</span> : '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  const text = value === undefined || value === null || value === '' ? '—' : String(value)
  return text.length > 72 ? `${text.slice(0, 69)}…` : text
}

function StatusBadge({ value }) {
  const status = String(value || 'Unknown')
  const tone = ['Active', 'Approved', 'Published', 'Completed', 'Paid', 'Verified'].includes(status)
    ? 'positive'
    : ['Pending', 'Pending review', 'Confirmed', 'Assigned', 'In Progress'].includes(status)
      ? 'waiting'
      : ['Inactive', 'Hidden', 'Cancelled', 'Rejected', 'Suspended', 'Unpaid', 'Refunded'].includes(status)
        ? 'negative'
        : 'neutral'
  return <span className={`admin-status-badge ${tone}`}>{status}</span>
}

function RecordForm({ config, record, database, onClose, onSave }) {
  const initial = Object.fromEntries(config.fields.map((field) => [
    field.name,
    record?.[field.name] ?? (field.type === 'checkbox' ? field.name === 'enabled' : ''),
  ]))
  const [draft, setDraft] = useState(initial)
  const [error, setError] = useState('')

  function updateField(name, value) {
    setDraft((current) => ({ ...current, [name]: value }))
  }

  function uploadImage(fieldName, event) {
    const file = event.currentTarget.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }
    if (file.size > 700 * 1024) {
      setError('Demo uploads are limited to 700 KB per image so browser storage stays manageable.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => updateField(fieldName, String(reader.result || ''))
    reader.onerror = () => setError('Could not read the selected image.')
    reader.readAsDataURL(file)
  }

  function submit(event) {
    event.preventDefault()
    const requiredField = config.fields.find((field) => field.required && !String(draft[field.name] ?? '').trim())
    if (requiredField) {
      setError(`${requiredField.label || requiredField.name} is required.`)
      return
    }
    onSave(draft)
  }

  function fieldOptions(field) {
    if (field.options) return field.options.map((option) => ({ value: option, label: option }))
    const source = selectFields[field.name]?.options
    if (!source) return []
    const rows = database[source] || []
    return rows.map((item) => ({ value: item[selectFields[field.name].value], label: item[selectFields[field.name].text] }))
  }

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="admin-form-modal" role="dialog" aria-modal="true" aria-labelledby="admin-form-title">
        <div className="admin-modal-header"><div><p className="admin-eyebrow">{record ? 'EDIT RECORD' : 'NEW RECORD'}</p><h2 id="admin-form-title">{record ? 'Update' : 'Add'} {config.singular}</h2></div><button type="button" aria-label="Close form" onClick={onClose}>×</button></div>
        <form onSubmit={submit}>
          <div className="admin-form-grid">{config.fields.map((field) => <label className={`admin-form-field${field.type === 'textarea' ? ' wide' : ''}${field.type === 'checkbox' ? ' checkbox-field' : ''}`} key={field.name}>{field.type === 'checkbox' ? <><input type="checkbox" checked={Boolean(draft[field.name])} onChange={(event) => updateField(field.name, event.target.checked)} /><span>{field.label}</span></> : <>{field.label || selectFields[field.name]?.label || field.name}{field.type === 'select' ? <select required={field.required} value={draft[field.name] ?? ''} onChange={(event) => updateField(field.name, event.target.value)}><option value="">Select…</option>{fieldOptions(field).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.type === 'textarea' ? <textarea required={field.required} rows="3" value={draft[field.name] ?? ''} onChange={(event) => updateField(field.name, event.target.value)} /> : field.type === 'image' ? <><input type="url" value={typeof draft[field.name] === 'string' && !draft[field.name].startsWith('data:') ? draft[field.name] : ''} onChange={(event) => updateField(field.name, event.target.value)} placeholder="Paste an image URL or upload a small image" /><input className="admin-file-input" type="file" accept="image/*" onChange={(event) => uploadImage(field.name, event)} />{draft[field.name] && <img className="admin-upload-preview" src={draft[field.name]} alt="Selected preview" />}</> : <input required={field.required} type={field.type || 'text'} value={draft[field.name] ?? ''} onChange={(event) => updateField(field.name, field.type === 'number' ? event.target.value : event.target.value)} />}</>}</label>)}</div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <div className="admin-form-actions"><button type="button" className="admin-secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="admin-primary-button">{record ? 'Save changes' : 'Create'} <span>→</span></button></div>
          <p className="admin-form-demo-note">Demo only: this change is saved to local browser storage, not a server.</p>
        </form>
      </section>
    </div>
  )
}

function AdminNotFound() {
  return <section className="admin-panel admin-not-found"><h1>Admin section not found</h1><p>Choose an item from the dashboard navigation.</p><Link className="admin-primary-button" to="/admin">Go to dashboard →</Link></section>
}

export { AdminDashboard, AdminGuard, AdminLayout, AdminLoginPage, AdminNotFound, AdminSection }
