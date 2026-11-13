const providers = [
  {
    name: 'Arun Kumar',
    phone: '+919876543210',
    experience: '8 years',
    area: 'Coimbatore',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Meena Services',
    phone: '+919876543211',
    experience: '6 years',
    area: 'Pollachi',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Karthik Works',
    phone: '+919876543212',
    experience: '10 years',
    area: 'Tiruppur',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
  },
]

const serviceGroups = [
  {
    category: 'Home Maintenance',
    icon: '⌂',
    services: ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'AC Repair', 'CCTV Installation'],
    image: 'photo-1621905251918-48416bd8575a',
  },
  {
    category: 'Cleaning Services',
    icon: '✳',
    services: ['House Cleaning', 'Deep Cleaning', 'Bathroom Cleaning', 'Water Tank Cleaning'],
    image: 'photo-1581578731548-c64695cc6952',
  },
  {
    category: 'Agriculture & Outdoor',
    icon: '♧',
    services: ['Coconut Tree Climbing', 'Gardening', 'Grass Cutting', 'Tree Cutting', 'Agricultural Workers'],
    image: 'photo-1416879595882-3373a0480b5b',
  },
  {
    category: 'Vehicle Services',
    icon: '↗',
    services: ['Car Repair', 'Bike Repair', 'Vehicle Workshop', 'Towing', 'Vehicle Washing', 'Puncture Repair'],
    image: 'photo-1486262715619-67b85e0b08d3',
  },
  {
    category: 'Food Services',
    icon: '♨',
    services: ['Homemade Food', 'Catering', 'Bakery', 'Snacks', 'Party Food'],
    image: 'photo-1555939594-58d7cb561ad1',
  },
  {
    category: 'Moving & Transportation',
    icon: '▰',
    services: ['Packers and Movers', 'Goods Vehicles', 'Loading and Unloading'],
    image: 'photo-1600518464441-9154a4dea21b',
  },
  {
    category: 'Appliance Repair',
    icon: '⌁',
    services: ['Washing Machine Repair', 'Refrigerator Repair', 'TV Repair', 'Fan Repair', 'Microwave Repair'],
    image: 'photo-1581092918056-0c4c3a3b6a48',
  },
  {
    category: 'Personal & Event Services',
    icon: '✦',
    services: ['Event Decoration', 'Photography', 'Beauty Services', 'Babysitting'],
    image: 'photo-1511795409834-ef04bbd61622',
  },
]

const serviceImages = [
  'photo-1621905251918-48416bd8575a',
  'photo-1581578731548-c64695cc6952',
  'photo-1416879595882-3373a0480b5b',
  'photo-1486262715619-67b85e0b08d3',
  'photo-1555939594-58d7cb561ad1',
]

export const categories = serviceGroups.map(({ category, icon, services: categoryServices, image }) => ({
  category,
  icon,
  count: categoryServices.length,
  image: `https://images.unsplash.com/${image}?auto=format&fit=crop&w=480&q=75`,
}))

export const services = serviceGroups.flatMap((group, groupIndex) =>
  group.services.map((name, serviceIndex) => {
    const provider = providers[(groupIndex + serviceIndex) % providers.length]
    return {
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      name,
      category: group.category,
      categoryIcon: group.icon,
      description: `Reliable ${name.toLowerCase()} from a trusted local professional. Get friendly, quality service at a time that works for you.`,
      provider: { ...provider, name: `${name === 'Homemade Food' ? 'Anu’s Kitchen' : provider.name}` },
      rating: (4.6 + ((groupIndex + serviceIndex) % 4) * 0.1).toFixed(1),
      reviews: 32 + groupIndex * 13 + serviceIndex * 7,
      price: 350 + groupIndex * 100 + serviceIndex * 50,
      image: `https://images.unsplash.com/${serviceImages[(groupIndex + serviceIndex) % serviceImages.length]}?auto=format&fit=crop&w=900&q=85`,
      categoryImage: `https://images.unsplash.com/${group.image}?auto=format&fit=crop&w=900&q=85`,
    }
  }),
)

export const findService = (slug) => services.find((service) => service.slug === slug)
