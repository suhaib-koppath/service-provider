import { useSyncExternalStore } from 'react'
import { categories as seedCategories, services as seedServices } from './services.js'

const STORAGE_KEY = 'namma.admin.demo.database.v1'
const CHANGE_EVENT = 'namma:admin-demo-database-change'
let snapshot

const slugify = (value) => String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function makeSeedData() {
  const categories = seedCategories.map((category, index) => ({
    id: slugify(category.category),
    name: category.category,
    description: `Local ${category.category.toLowerCase()} services.`,
    image: category.image,
    icon: category.icon,
    displayOrder: index + 1,
    enabled: true,
  }))

  const providersByName = new Map()
  seedServices.forEach((service, index) => {
    const key = slugify(service.provider.name)
    if (!providersByName.has(key)) {
      providersByName.set(key, {
        id: key,
        fullName: service.provider.name,
        phone: service.provider.phone,
        email: `${key}@example.demo`,
        categoryId: slugify(service.category),
        skills: service.name,
        experience: service.provider.experience,
        location: service.provider.area,
        availability: 'Weekdays and weekends',
        status: 'Approved',
        verified: true,
        rating: service.rating,
        reviewCount: service.reviews,
        profileImage: service.provider.image,
        bookings: 8 + index,
      })
    }
  })

  const subcategories = seedServices.map((service) => ({
    id: service.slug,
    categoryId: slugify(service.category),
    name: service.name,
    description: service.description,
    image: service.image,
    startingPrice: service.price,
    duration: '1–2 hours',
    enabled: true,
  }))

  const services = seedServices.map((service, index) => ({
    id: service.slug,
    title: service.name,
    categoryId: slugify(service.category),
    subcategoryId: service.slug,
    description: service.description,
    images: service.image,
    startingPrice: service.price,
    priceRange: `₹${service.price} onwards`,
    duration: '1–2 hours',
    locations: service.provider.area,
    requirements: 'Discuss the work with the provider before confirming.',
    providerId: slugify(service.provider.name),
    enabled: true,
    featured: index < 6,
    rating: service.rating,
    reviewCount: service.reviews,
  }))

  return {
    categories,
    subcategories,
    services,
    employees: [
      { id: 'emp-1001', employeeId: 'EMP-1001', fullName: 'Karthik R.', phone: '+91 98430 55001', email: 'karthik@example.demo', address: 'Saibaba Colony, Coimbatore', gender: 'Male', experience: '7 years', skills: 'Electrical repairs, wiring', categoryIds: 'Home Maintenance', subcategoryIds: 'Electrician', location: 'Coimbatore', availability: 'Available', joiningDate: '2024-06-18', status: 'Active', profileImage: '' },
      { id: 'emp-1002', employeeId: 'EMP-1002', fullName: 'Meena S.', phone: '+91 98430 55002', email: 'meena@example.demo', address: 'Pollachi', gender: 'Female', experience: '5 years', skills: 'Deep cleaning, home cleaning', categoryIds: 'Cleaning Services', subcategoryIds: 'House Cleaning, Deep Cleaning', location: 'Pollachi', availability: 'Available', joiningDate: '2025-01-08', status: 'Active', profileImage: '' },
    ],
    providers: [...providersByName.values()],
    bookings: [
      { id: 'BK-24081', customerName: 'Priya S.', customerPhone: '+91 98430 10001', serviceId: 'electrician', serviceTitle: 'Electrician', categoryId: 'home-maintenance', providerId: 'arun-kumar', providerName: 'Arun Kumar', date: '2026-11-14', time: '10:30 AM', location: 'Coimbatore', status: 'Pending', amount: 650, paymentStatus: 'Unpaid' },
      { id: 'BK-24080', customerName: 'Ramesh K.', customerPhone: '+91 98430 10002', serviceId: 'coconut-tree-climbing', serviceTitle: 'Coconut Tree Climbing', categoryId: 'agriculture-outdoor', providerId: 'meena-services', providerName: 'Meena Services', employeeId: 'emp-1001', date: '2026-11-13', time: '08:00 AM', location: 'Pollachi', status: 'In Progress', amount: 1200, paymentStatus: 'Paid' },
      { id: 'BK-24079', customerName: 'Divya M.', customerPhone: '+91 98430 10003', serviceId: 'homemade-food', serviceTitle: 'Homemade Food', categoryId: 'food-services', providerId: 'anu-s-kitchen', providerName: 'Anu’s Kitchen', date: '2026-11-12', time: '12:00 PM', location: 'Tiruppur', status: 'Completed', amount: 950, paymentStatus: 'Paid' },
      { id: 'BK-24078', customerName: 'Arun P.', customerPhone: '+91 98430 10004', serviceId: 'plumber', serviceTitle: 'Plumber', categoryId: 'home-maintenance', providerId: 'karthik-works', providerName: 'Karthik Works', date: '2026-11-15', time: '02:00 PM', location: 'Coimbatore', status: 'Confirmed', amount: 500, paymentStatus: 'Unpaid' },
      { id: 'BK-24077', customerName: 'Nila R.', customerPhone: '+91 98430 10005', serviceId: 'house-cleaning', serviceTitle: 'House Cleaning', categoryId: 'cleaning-services', providerId: 'meena-services', providerName: 'Meena Services', date: '2026-11-10', time: '09:00 AM', location: 'Pollachi', status: 'Completed', amount: 850, paymentStatus: 'Paid' },
    ],
    customers: [
      { id: 'CUS-3001', fullName: 'Priya S.', email: 'priya@example.demo', phone: '+91 98430 10001', location: 'Coimbatore', address: 'Race Course, Coimbatore', joined: '2025-08-12', bookings: 5, status: 'Active' },
      { id: 'CUS-3002', fullName: 'Ramesh K.', email: 'ramesh@example.demo', phone: '+91 98430 10002', location: 'Pollachi', address: 'Mahalingapuram, Pollachi', joined: '2025-09-04', bookings: 3, status: 'Active' },
      { id: 'CUS-3003', fullName: 'Divya M.', email: 'divya@example.demo', phone: '+91 98430 10003', location: 'Tiruppur', address: 'Avinashi Road, Tiruppur', joined: '2026-01-21', bookings: 2, status: 'Active' },
    ],
    reviews: [
      { id: 'REV-501', customerName: 'Priya S.', serviceTitle: 'Electrician', providerName: 'Arun Kumar', rating: 5, comment: 'On time, explained the repair clearly, and left everything tidy.', date: '2026-11-12', status: 'Published' },
      { id: 'REV-500', customerName: 'Ramesh K.', serviceTitle: 'Coconut Tree Climbing', providerName: 'Meena Services', rating: 5, comment: 'Very experienced and careful work. Harvest was done quickly.', date: '2026-11-10', status: 'Published' },
      { id: 'REV-499', customerName: 'Divya M.', serviceTitle: 'Homemade Food', providerName: 'Anu’s Kitchen', rating: 4, comment: 'Delicious food and generous portions for our family.', date: '2026-11-08', status: 'Pending review' },
    ],
    locations: [
      { id: 'LOC-01', state: 'Tamil Nadu', district: 'Coimbatore', town: 'Coimbatore', areas: 'Race Course, Saibaba Colony, RS Puram', enabled: true },
      { id: 'LOC-02', state: 'Tamil Nadu', district: 'Coimbatore', town: 'Pollachi', areas: 'Pollachi, Mahalingapuram, Anaimalai', enabled: true },
      { id: 'LOC-03', state: 'Tamil Nadu', district: 'Tiruppur', town: 'Tiruppur', areas: 'Avinashi Road, Palladam', enabled: true },
    ],
    content: [
      { id: 'CMS-01', section: 'Homepage banner', title: 'Find the right service for every need.', body: 'Need a tap fixed, a tree climbed, or lunch for the whole family? Find someone nearby who knows exactly what to do.', image: '', enabled: true },
      { id: 'CMS-02', section: 'About us', title: 'Good things grow close to home.', body: 'We connect neighbors with skilled local professionals.', image: '', enabled: true },
      { id: 'CMS-03', section: 'Footer contact', title: 'Get in touch', body: 'hello@namma.example · +91 422 400 0123', image: '', enabled: true },
      { id: 'CMS-04', section: 'FAQ', title: 'How do I find a service provider?', body: 'Search for the service you need, filter by location or price, and explore local provider profiles.', enabled: true },
      { id: 'CMS-05', section: 'FAQ', title: 'How do I book a service?', body: 'There is no in-app booking at this time. Contact the provider directly to discuss the job, availability, pricing, and arrangements.', enabled: true },
      { id: 'CMS-06', section: 'Testimonial', title: 'Priya S. | Coimbatore', body: 'Finding a reliable electrician used to take half a day of asking around. Thumbly.in made it three clicks.', enabled: true },
      { id: 'CMS-07', section: 'Testimonial', title: 'Ramesh K. | Pollachi', body: 'Our coconut harvest was sorted in an afternoon. Such a relief to find skilled local people nearby.', enabled: true },
      { id: 'CMS-08', section: 'Testimonial', title: 'Divya M. | Tiruppur', body: 'A genuinely lovely home-cooked lunch for our family gathering. I’ve already recommended the caterer.', enabled: true },
    ],
    admins: [
      { id: 'ADM-001', fullName: 'Thumbly.in Admin', email: 'admin@namma.demo', role: 'Admin', status: 'Active', lastLogin: 'Today' },
    ],
    settings: [
      { id: 'SETTINGS-01', businessName: 'Thumbly.in', supportEmail: 'hello@namma.example', supportPhone: '+91 422 400 0123', officeAddress: 'Coimbatore, Tamil Nadu, India', currency: 'INR (₹)', timezone: 'Asia/Kolkata', notifications: true, twoFactorEnabled: false },
    ],
    activityLogs: [
      { id: 'LOG-01', action: 'Dashboard opened', actor: 'Thumbly.in Admin', date: new Date().toISOString() },
    ],
  }
}

export function getAdminDemoData() {
  if (snapshot) return snapshot

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved) {
    snapshot = JSON.parse(saved)
  } else {
    snapshot = makeSeedData()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  }
  return snapshot
}

export function saveAdminDemoData(nextData) {
  const serialized = JSON.stringify(nextData)
  window.localStorage.setItem(STORAGE_KEY, serialized)
  snapshot = nextData
  window.dispatchEvent(new Event(CHANGE_EVENT))
  return snapshot
}

export function resetAdminDemoData() {
  return saveAdminDemoData(makeSeedData())
}

function subscribe(listener) {
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      snapshot = event.newValue ? JSON.parse(event.newValue) : null
      listener()
    }
  }
  window.addEventListener(CHANGE_EVENT, listener)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function useAdminDemoData() {
  return useSyncExternalStore(subscribe, getAdminDemoData, getAdminDemoData)
}

export function getPublicCatalog(database = getAdminDemoData()) {
  const publicCategories = database.categories
    .filter((category) => category.enabled)
    .sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder))
    .map((category) => {
      const children = database.subcategories.filter((item) => item.categoryId === category.id && item.enabled)
      return {
        category: category.name,
        icon: category.icon || '⌂',
        count: children.length,
        image: category.image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=480&q=75',
        subcategories: children.map((item) => item.name),
      }
    })

  const publicServices = database.services
    .filter((service) => {
      const provider = database.providers.find((item) => item.id === service.providerId)
      const subcategory = database.subcategories.find((item) => item.id === service.subcategoryId)
      const providerIsAvailable = !service.providerId || (provider && ['Approved', 'Active'].includes(provider.status))
      const subcategoryIsAvailable = !service.subcategoryId || (subcategory && subcategory.enabled)
      return service.enabled &&
        providerIsAvailable &&
        subcategoryIsAvailable &&
        database.categories.some((category) => category.id === service.categoryId && category.enabled)
    })
    .map((service) => {
      const category = database.categories.find((item) => item.id === service.categoryId)
      const subcategory = database.subcategories.find((item) => item.id === service.subcategoryId)
      const provider = database.providers.find((item) => item.id === service.providerId)
      const providerName = provider?.fullName || service.providerName || 'Local provider'
      const providerArea = service.locations || provider?.location || 'Local area'
      const image = service.images || service.image || category?.image || 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=85'
      return {
        slug: service.id,
        name: service.title || subcategory?.name || 'Local service',
        category: category?.name || 'Services',
        categoryIcon: category?.icon || '⌂',
        description: service.description || 'Contact a local professional to discuss this service.',
        provider: {
          name: providerName,
          phone: provider?.phone || service.providerPhone || '',
          experience: provider?.experience || 'Local professional',
          area: providerArea,
          image: provider?.profileImage || service.providerImage || image,
        },
        rating: provider?.rating || service.rating || 'New',
        reviews: Number(provider?.reviewCount || service.reviewCount || 0),
        price: Number(service.startingPrice || service.price || 0),
        image,
        categoryImage: category?.image || image,
        featured: Boolean(service.featured),
      }
    })

  return { categories: publicCategories, services: publicServices }
}

export const makeDemoId = (prefix, value = '') => `${prefix}-${slugify(value) || 'item'}-${Date.now().toString(36)}`

export const addActivity = (database, action, actor = 'Thumbly.in Admin') => ({
  ...database,
  activityLogs: [
    { id: makeDemoId('LOG', action), action, actor, date: new Date().toISOString() },
    ...database.activityLogs,
  ].slice(0, 100),
})
