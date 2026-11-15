import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import MarketplaceLayout from '../components/MarketplaceLayout.jsx'
import { getPublicCatalog, useAdminDemoData } from '../data/adminDemoStore.js'
import '../marketplace.css'

const testimonials = [
  { quote: 'Finding a reliable electrician used to take half a day of asking around. Thumbly.in made it three clicks.', name: 'Priya S.', place: 'Coimbatore', initials: 'PS' },
  { quote: 'Our coconut harvest was sorted in an afternoon. Such a relief to find skilled local people nearby.', name: 'Ramesh K.', place: 'Pollachi', initials: 'RK' },
  { quote: 'A genuinely lovely home-cooked lunch for our family gathering. I’ve already recommended the caterer.', name: 'Divya M.', place: 'Tiruppur', initials: 'DM' },
]

function SectionHeading({ eyebrow, title, description, link, linkLabel = 'Explore all services' }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {link && <Link className="text-link" to={link}>{linkLabel} <span aria-hidden="true">↗</span></Link>}
    </div>
  )
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <Link to={`/services/${service.slug}`} className="service-card-image">
        <img src={service.image} alt="" loading="lazy" />
        <span className="card-save" aria-hidden="true">♡</span>
      </Link>
      <div className="service-card-body">
        <div className="service-card-title-row">
          <Link to={`/services/${service.slug}`}><h3>{service.name}</h3></Link>
          <span className="rating"><span aria-hidden="true">★</span> {service.rating}</span>
        </div>
        <p className="service-provider-line">
          <img src={service.provider.image} alt="" loading="lazy" />
          {service.provider.name} <span className="verified-mark" title="Local provider">✓</span>
        </p>
        <div className="service-card-bottom">
          <span>From <strong>₹{service.price.toLocaleString('en-IN')}</strong></span>
          <span>{service.provider.area}</span>
        </div>
      </div>
    </article>
  )
}

function HomePage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()
  const database = useAdminDemoData()
  const { services } = useMemo(() => getPublicCatalog(database), [database])
  const popularServices = [...services].sort((a, b) => b.reviews - a.reviews)
  const heroContent = database.content.find((item) => item.section === 'Homepage banner' && item.enabled)
  const testimonialContent = database.content
    .filter((item) => item.section === 'Testimonial' && item.enabled)
    .map((item) => {
      const [name, place] = item.title.split('|').map((part) => part.trim())
      return { quote: item.body, name, place: place || 'Local neighbor', initials: name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2) }
    })
  const homeTestimonials = testimonialContent.length ? testimonialContent : testimonials

  function searchServices(event) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (location.trim()) params.set('location', location.trim())
    navigate(`/services${params.size ? `?${params}` : ''}`)
  }

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> YOUR NEIGHBOURHOOD, HANDY.</span>
            <h1>{heroContent?.title || 'Find the right service for every need.'}</h1>
            <p>{heroContent?.body || 'Need a tap fixed, a tree climbed, or lunch for the whole family? Find someone nearby who knows exactly what to do.'}</p>
            <form className="hero-search" onSubmit={searchServices}>
              <label className="search-field">
                <span aria-hidden="true">⌕</span>
                <span className="sr-only">What do you need help with?</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What do you need help with?" />
              </label>
              <span className="search-divider" />
              <label className="search-field location-field">
                <span aria-hidden="true">⌖</span>
                <span className="sr-only">Your location</span>
                <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Your location" />
              </label>
              <button type="submit" className="button button-primary search-button">Find a pro <span aria-hidden="true">↗</span></button>
            </form>
            <div className="hero-social-proof">
              <div className="avatar-stack" aria-hidden="true"><span>R</span><span>P</span><span>A</span><span>+</span></div>
              <span>From a leaky tap to <strong>Sunday lunch.</strong></span>
            </div>
          </div>
          <div className="hero-art">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85" alt="A welcoming home, ready for the little jobs that make it yours" fetchPriority="high" />
            <div className="hero-art-note"><span className="eyebrow">GOOD WORK, CLOSE BY</span><strong>Someone local<br />can help.</strong><span>Home · Garden · Everyday</span></div>
            <div className="hero-art-stamp" aria-hidden="true">near<br />& dear</div>
            <span className="hero-caption"><span className="caption-dot" /> Made for the neighborhood</span>
          </div>
        </div>
      </section>

      <section className="section popular-section">
        <SectionHeading eyebrow="POPULAR LOCAL SERVICES" title="Good help, all in one place." description="Browse every service our local professionals offer." link="/services" />
        <div className="service-grid">{popularServices.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
      </section>

      <section className="trust-band">
        <div className="trust-band-inner">
          <div><span className="eyebrow">LOCAL, BY NATURE</span><h2>It's better when<br /><em>we help each other.</em></h2><p>We bring the skill and care already in your community a little closer to the people who need it.</p><Link className="button button-light" to="/about">Get to know us <span aria-hidden="true">↗</span></Link></div>
          <div className="trust-points">
            <article><span>01</span><div><h3>People, not listings</h3><p>Real local professionals with a face, a name, and a reputation in your neighborhood.</p></div></article>
            <article><span>02</span><div><h3>Your choice, always</h3><p>Compare services, check reviews, and contact a provider directly. No pressure.</p></div></article>
            <article><span>03</span><div><h3>Everyday help, all in one place</h3><p>From home repairs and harvests to homemade food and getting around.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section how-section">
        <SectionHeading eyebrow="NOTHING COMPLICATED" title="A helping hand in three steps." description="Finding the right person should be the easy part." />
        <div className="steps-grid">
          {[['01', 'Tell us what you need', 'Search for a service and add your area to see who is nearby.'], ['02', 'Meet your local options', 'Compare profiles, experience, prices, and what neighbors say.'], ['03', 'Talk it through', 'Call or WhatsApp your chosen provider and work out the details.']].map(([number, title, text]) => (
            <article className="step-card" key={number}><span className="step-number">{number}</span><div className="step-illustration" aria-hidden="true">{['⌕', '♧', '↗'][Number(number) - 1]}</div><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="section providers-section">
        <div className="provider-photo"><img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&q=85" alt="Local professional working on a home improvement project" loading="lazy" /></div>
        <div className="provider-copy"><span className="eyebrow">FOR THE PEOPLE WHO MAKE IT HAPPEN</span><h2>Your skills deserve<br />a <em>local spotlight.</em></h2><p>Meet more customers in your area. Share what you do, set your own prices, and let your good work speak for itself.</p><Link className="button button-primary" to="/become-provider">Join as a provider <span aria-hidden="true">↗</span></Link><small>It starts with a simple introduction. No application fee.</small></div>
      </section>

      <section className="section testimonials-section">
        <SectionHeading eyebrow="KIND WORDS FROM CLOSE BY" title="A little help goes a long way." link="/reviews" linkLabel="Read more stories" />
        <div className="testimonial-grid">{homeTestimonials.map((item) => <article className="testimonial-card" key={item.name}><div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{item.quote}”</blockquote><div className="reviewer"><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.place}</small></div></div></article>)}</div>
      </section>

      <Newsletter />
    </>
  )
}

function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const database = useAdminDemoData()
  const { services } = useMemo(() => getPublicCatalog(database), [database])
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('popular')
  const filtered = useMemo(() => {
    let result = services.filter((service) => {
      const matchesQuery = `${service.name} ${service.provider.name}`.toLowerCase().includes(query.trim().toLowerCase())
      const matchesLocation = !location || service.provider.area.toLowerCase().includes(location.trim().toLowerCase())
      const matchesPrice = !maxPrice || service.price <= Number(maxPrice)
      return matchesQuery && matchesLocation && matchesPrice
    })
    if (sort === 'rating') result = [...result].sort((a, b) => Number(b.rating) - Number(a.rating))
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'popular') result = [...result].sort((a, b) => b.reviews - a.reviews)
    return result
  }, [location, maxPrice, query, services, sort])

  function updateFilters(event) {
    event.preventDefault()
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (location.trim()) next.set('location', location.trim())
    setSearchParams(next)
  }

  function clearFilters() {
    setQuery('')
    setLocation('')
    setMaxPrice('')
    setSearchParams({})
  }

  return (
    <div className="listing-page">
      <div className="page-hero listing-hero"><div><span className="eyebrow">GOOD HELP IS CLOSER THAN YOU THINK</span><h1>Services around you.</h1><p>Find the right local person for the job, and get on with your day.</p></div><div className="listing-hero-art" aria-hidden="true">⌂</div></div>
      <div className="listing-content">
        <div className="breadcrumbs"><Link to="/home">Home</Link><span>/</span><span>Services</span></div>
        <form className="filter-bar" onSubmit={updateFilters}>
          <label className="filter-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search services</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “plumber” or “catering”" /></label>
          <label className="location-filter"><span aria-hidden="true">⌖</span><span className="sr-only">Filter by location</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City or area" /></label>
          <label><span className="sr-only">Maximum price</span><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="">Any price</option><option value="500">Under ₹500</option><option value="1000">Under ₹1,000</option><option value="1500">Under ₹1,500</option><option value="2000">Under ₹2,000</option></select></label>
          <button type="submit" className="button button-primary filter-submit">Search</button>
        </form>
        <div className="listing-toolbar"><div><h2>All local services</h2><p>{filtered.length} services to explore</p></div><label className="sort-select">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Most popular</option><option value="rating">Highest rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
        {filtered.length ? <div className="service-grid listing-grid">{filtered.map((service) => <ServiceCard key={service.slug} service={service} />)}</div> : <div className="empty-state"><span aria-hidden="true">⌕</span><h3>No matching services just yet</h3><p>Try a different search or clear the filters to see all available services.</p><button className="button button-outline" onClick={clearFilters} type="button">Clear filters</button></div>}
      </div>
    </div>
  )
}

function DetailPage() {
  const { slug } = useParams()
  const database = useAdminDemoData()
  const { services } = useMemo(() => getPublicCatalog(database), [database])
  const service = services.find((item) => item.slug === slug)
  if (!service) return <NotFoundPage />
  const phoneDigits = service.provider.phone.replace(/\D/g, '')
  const whatsappMessage = encodeURIComponent(`Hi ${service.provider.name}, I found your ${service.name} service on Thumbly.in. Are you available?`)

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="breadcrumbs"><Link to="/home">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span>{service.name}</span></div>
        <div className="detail-heading"><div><span className="eyebrow">LOCAL SERVICE</span><h1>{service.name}</h1><div className="detail-rating"><span>★ {service.rating}</span><span>({service.reviews} neighbor reviews)</span><span>·</span><span>{service.provider.area}</span></div></div><span className="detail-price">From <strong>₹{service.price.toLocaleString('en-IN')}</strong></span></div>
        <div className="detail-photo"><img src={service.image} alt={`${service.name} service`} /><span className="photo-caption">Local know-how, right around the corner.</span></div>
        <div className="detail-columns">
          <section className="detail-main">
            <span className="eyebrow">THE SERVICE</span><h2>Good work, done with care.</h2><p>{service.description} Every job is a little different, so reach out to the provider to talk through your needs and get a quote.</p>
            <div className="detail-facts"><div><span aria-hidden="true">◷</span><div><strong>Working hours</strong><small>Mon – Sat, 8:00 am – 7:00 pm</small></div></div><div><span aria-hidden="true">⌖</span><div><strong>Service area</strong><small>{service.provider.area} and nearby areas</small></div></div><div><span aria-hidden="true">✓</span><div><strong>Experience</strong><small>{service.provider.experience} of hands-on experience</small></div></div></div>
            <div className="provider-profile"><div className="provider-profile-heading"><span className="eyebrow">YOUR LOCAL PROFESSIONAL</span><span className="verified-pill">✓ Local provider</span></div><div className="provider-profile-body"><img src={service.provider.image} alt={service.provider.name} /><div className="provider-profile-info"><h3>{service.provider.name}</h3><p>{service.name} · {service.provider.experience}</p><span>Serving {service.provider.area} and nearby neighborhoods</span></div><span className="rating"><span aria-hidden="true">★</span> {service.rating}</span></div><p className="provider-description">Friendly, experienced, and committed to doing the job right. Contact directly to discuss availability and get a quote for your specific requirements.</p><div className="provider-actions"><a className="button button-primary" href={`tel:${service.provider.phone}`}>Call provider <span aria-hidden="true">↗</span></a><a className="button button-whatsapp" href={`https://wa.me/${phoneDigits}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div></div>
            <section className="reviews-block"><span className="eyebrow">FROM THE NEIGHBORHOOD</span><h2>Neighbors say</h2><div className="review-row"><span className="review-avatar">PS</span><div><div className="testimonial-stars">★★★★★</div><p>“Friendly, punctual, and did a great job. Would definitely call again.”</p><small>Priya S. · Verified neighbor</small></div></div></section>
          </section>
          <aside className="booking-card"><span className="eyebrow">NEED A HAND?</span><h3>Talk to a local pro.</h3><p>Get in touch to check availability, ask a question, or request a quote.</p><a className="button button-primary button-full" href={`tel:${service.provider.phone}`}>Call {service.provider.name.split(' ')[0]}</a><a className="button button-whatsapp button-full" href={`https://wa.me/${phoneDigits}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">Message on WhatsApp</a><small>No booking fees. Discuss the job directly with your provider.</small></aside>
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  const database = useAdminDemoData()
  const { services } = useMemo(() => getPublicCatalog(database), [database])
  const aboutContent = database.content.find((item) => item.section === 'About us' && item.enabled)
  const providerCount = database.providers.filter((provider) => ['Active', 'Approved'].includes(provider.status)).length
  return <div className="standard-page"><div className="page-hero"><div><span className="eyebrow">A LITTLE MORE ABOUT US</span><h1>{aboutContent?.title || 'Good things grow close to home.'}</h1><p>{aboutContent?.body || 'We’re here to make it easier for neighbors to find the people who know how to help.'}</p></div></div><section className="standard-content about-content"><div className="about-intro"><span className="eyebrow">OUR STORY</span><h2>Local help has always been there.<br /><em>We just brought it closer.</em></h2><p>Finding a dependable electrician, a talented home cook, or someone to help with the harvest has traditionally meant asking around. Thumbly.in makes those neighborhood connections easier to find, while helping skilled local people meet the customers who need them.</p></div><div className="mission-grid"><article><span>01 / OUR MISSION</span><h3>Make everyday help easy to find.</h3><p>Connect people with local professionals who bring skill, care, and a personal touch to the work they do.</p></article><article><span>02 / OUR VISION</span><h3>Stronger neighborhoods, together.</h3><p>A world where local expertise is easier to discover, and independent providers have room to grow.</p></article></div><div className="stats-row"><div><strong>{services.length}</strong><span>local services</span></div><div><strong>{providerCount}</strong><span>demo service providers</span></div><div><strong>{database.locations.filter((location) => location.enabled).length}</strong><span>service areas</span></div></div><div className="team-callout"><span className="eyebrow">BUILT WITH THE NEIGHBORHOOD IN MIND</span><h2>Good work is personal.<br /><em>Finding it can be, too.</em></h2><Link className="button button-primary" to="/contact">Say hello to our team <span aria-hidden="true">↗</span></Link></div></section></div>
}

function ContactPage() {
  const [notice, setNotice] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    setNotice('Thanks for reaching out. This demo has no messaging backend, so your message was not sent. Please contact us by phone or email.')
  }
  return <div className="standard-page"><div className="page-hero"><div><span className="eyebrow">WE’RE EASY TO REACH</span><h1>Let’s talk.</h1><p>A question, a suggestion, or just a hello. We’d love to hear from you.</p></div></div><div className="standard-content contact-layout"><section className="contact-info"><span className="eyebrow">GET IN TOUCH</span><h2>Here when you need us.</h2><p>We’re a small team that cares about connecting our community. Drop us a line and we’ll be glad to help.</p><a href="tel:+914224000123" className="contact-method"><span>↗</span><div><small>Give us a call</small><strong>+91 422 400 0123</strong></div></a><a href="mailto:hello@namma.example" className="contact-method"><span>@</span><div><small>Send us an email</small><strong>hello@namma.example</strong></div></a><a href="https://wa.me/914224000123" target="_blank" rel="noreferrer" className="contact-method"><span>◉</span><div><small>WhatsApp us</small><strong>+91 422 400 0123</strong></div></a><div className="contact-method"><span>⌖</span><div><small>Come say hello</small><strong>Coimbatore, Tamil Nadu, India</strong></div></div><div className="map-frame"><iframe title="Map showing Coimbatore, Tamil Nadu" loading="lazy" src="https://maps.google.com/maps?q=Coimbatore%2C%20Tamil%20Nadu&t=&z=12&ie=UTF8&iwloc=&output=embed" /></div></section><form className="form-card" onSubmit={handleSubmit}><span className="eyebrow">SEND A NOTE</span><h2>What’s on your mind?</h2><label>Full name<input name="name" autoComplete="name" required placeholder="Your name" /></label><div className="form-two-col"><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="+91" /></label></div><label>Subject<input name="subject" required placeholder="How can we help?" /></label><label>Your message<textarea name="message" rows="5" required minLength="10" placeholder="Tell us a little more..." /></label><button className="button button-primary" type="submit">Send message <span aria-hidden="true">↗</span></button>{notice && <p role="status" className="form-notice">{notice}</p>}</form></div></div>
}

function ProviderPage() {
  const [notice, setNotice] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    setNotice('Thanks for introducing yourself! This demo has no provider application backend, so your details were not saved or sent. Please contact our team to apply.')
  }
  return <div className="standard-page"><div className="page-hero provider-page-hero"><div><span className="eyebrow">GOOD WORK DESERVES TO BE FOUND</span><h1>Let your local<br />skills <em>shine.</em></h1><p>Meet more customers around the corner. You bring the know-how—we’ll help people find you.</p><Link className="button button-primary" to="#provider-form">Introduce yourself <span aria-hidden="true">↓</span></Link></div></div><div className="standard-content provider-content"><div className="benefit-row"><article><span>01</span><h3>Find more customers</h3><p>Put your services in front of people nearby who are looking for exactly what you do.</p></article><article><span>02</span><h3>Make it your own</h3><p>Share your skills, your coverage area, your availability, and your starting price.</p></article><article><span>03</span><h3>Build your reputation</h3><p>Let your great work and happy customers help the next neighbor find you.</p></article></div><form id="provider-form" className="form-card provider-form" onSubmit={handleSubmit}><span className="eyebrow">YOUR FIRST STEP</span><h2>Tell us about your work.</h2><p className="form-intro">Share a few details and our team can follow up about getting your profile started. Fields marked * are required.</p><div className="form-two-col"><label>Full name *<input name="name" autoComplete="name" required placeholder="Your full name" /></label><label>Phone number *<input name="phone" type="tel" autoComplete="tel" required placeholder="+91" /></label></div><label>Email address *<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Profile photo<input name="profile" type="file" accept="image/*" /></label><label>Services you offer and your experience *<textarea name="skills" rows="3" required placeholder="e.g. AC repair, electrician services, 6 years experience" /></label><label>Service location *<input name="location" required placeholder="City, area, neighborhoods you cover" /></label><div className="form-two-col"><label>Starting price (₹)<input name="price" type="number" min="0" placeholder="e.g. 500" /></label><label>Availability<select name="availability" defaultValue="Weekdays and weekends"><option>Weekdays and weekends</option><option>Weekdays</option><option>Weekends</option><option>Flexible, please ask</option></select></label></div><label>Tell us about your service *<textarea name="description" rows="5" required minLength="15" placeholder="What do you do, and what makes your service special?" /></label><button className="button button-primary" type="submit">Send an introduction <span aria-hidden="true">↗</span></button>{notice && <p role="status" className="form-notice">{notice}</p>}</form></div></div>
}

function FAQPage() {
  const database = useAdminDemoData()
  const managedQuestions = database.content.filter((item) => item.section === 'FAQ' && item.enabled).map((item) => [item.title, item.body])
  const questions = managedQuestions.length ? managedQuestions : [['How do I find a service provider?', 'Search the directory for local help.'], ['How do I book a service?', 'Contact a provider directly to discuss availability and pricing.']]
  return <InfoPage eyebrow="A FEW HELPFUL ANSWERS" title="Good to know." intro="A few quick answers to help you get started." ><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></InfoPage>
}

function ReviewsPage() {
  const database = useAdminDemoData()
  const reviews = database.reviews.filter((review) => review.status === 'Published')
  return <InfoPage eyebrow="KIND WORDS FROM CLOSE BY" title="Stories from the neighborhood." intro="A few ways a local helping hand can make the day a little easier."><div className="testimonial-grid review-page-grid">{reviews.map((item) => <article className="testimonial-card" key={item.id}><div className="testimonial-stars" aria-label={`${item.rating} out of 5 stars`}>{'★'.repeat(Math.min(5, Math.max(0, Number(item.rating) || 0)))}</div><blockquote>“{item.comment}”</blockquote><div className="reviewer"><span>{item.customerName.slice(0, 1)}</span><div><strong>{item.customerName}</strong><small>{item.serviceTitle} · {item.date}</small></div></div></article>)}</div><p className="sample-disclaimer">These are illustrative sample stories for this demo, not collected customer reviews.</p></InfoPage>
}

function InfoPage({ eyebrow, title, intro, children }) {
  return <div className="standard-page"><div className="page-hero"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div></div><div className="standard-content info-content">{children}</div></div>
}

function LegalPage({ privacy = false }) {
  const title = privacy ? 'Privacy policy' : 'Terms & conditions'
  return <InfoPage eyebrow="THE IMPORTANT DETAILS" title={title} intro="Clear, simple information about this marketplace preview."><div className="legal-copy"><div className="sample-disclaimer"><strong>Demo notice:</strong> Thumbly.in is a front-end demonstration. Forms do not submit or store data, provider profiles and reviews are sample content, and no booking or payment service is provided.</div><h2>{privacy ? 'Information and this demo' : 'Using this marketplace'}</h2><p>{privacy ? 'This front-end demo does not transmit or persist information entered into its forms. Form values remain in your browser and are not submitted to a server. Please do not enter sensitive personal information.' : 'You may explore the sample listings and contact links in this demo. Listing details are illustrative only; confirm a provider’s identity, qualifications, availability, and terms independently before arranging work.'}</p><h2>{privacy ? 'External links' : 'Services and providers'}</h2><p>{privacy ? 'Links to external sites such as WhatsApp, phone, email, and map services are provided for convenience. Those services have their own privacy policies and terms.' : 'Thumbly.in does not currently verify sample providers, arrange bookings, collect payments, or guarantee a particular outcome. Any real-world service arrangement would be directly between the customer and provider.'}</p><h2>{privacy ? 'Questions' : 'Contact'}</h2><p>For questions about this demo, reach us at <a href="mailto:hello@namma.example">hello@namma.example</a> or visit the <Link to="/contact">Contact page</Link>.</p><p className="legal-updated">Last updated: November 2026</p></div></InfoPage>
}

function NotFoundPage() {
  return <div className="not-found"><span className="eyebrow">WE COULDN’T FIND THAT CORNER</span><h1>Well, this is<br /><em>a little awkward.</em></h1><p>This page doesn’t seem to be here. Let’s get you back to the neighborhood.</p><Link className="button button-primary" to="/home">Back to home <span aria-hidden="true">↗</span></Link></div>
}

function Newsletter() {
  const [notice, setNotice] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    setNotice('Thanks for your interest! Newsletter sign-up is not connected in this demo.')
  }
  return <section className="newsletter"><div><span className="eyebrow">A NOTE FROM THE NEIGHBORHOOD</span><h2>Good things, once in a while.</h2><p>Occasional local stories and helpful tips. No noise, promise.</p></div><form onSubmit={handleSubmit}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" name="email" type="email" required placeholder="Your email address" /><button className="button button-primary" type="submit">Count me in <span aria-hidden="true">↗</span></button>{notice && <span className="newsletter-notice" role="status">{notice}</span>}</form></section>
}

export default function MarketplacePage({ page }) {
  let content
  if (page === 'home') content = <HomePage />
  else if (page === 'services') content = <ServicesPage />
  else if (page === 'detail') content = <DetailPage />
  else if (page === 'about') content = <AboutPage />
  else if (page === 'contact') content = <ContactPage />
  else if (page === 'provider') content = <ProviderPage />
  else if (page === 'faq') content = <FAQPage />
  else if (page === 'reviews') content = <ReviewsPage />
  else if (page === 'terms') content = <LegalPage />
  else if (page === 'privacy') content = <LegalPage privacy />
  else content = <NotFoundPage />
  return <MarketplaceLayout>{content}</MarketplaceLayout>
}
