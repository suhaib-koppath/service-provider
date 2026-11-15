import { serviceImageIds, serviceNameGroups, serviceProviders } from './serviceSeedData.js'

export const services = serviceNameGroups.flatMap((nameGroup, groupIndex) =>
  nameGroup.map((name, serviceIndex) => {
    const provider = serviceProviders[(groupIndex + serviceIndex) % serviceProviders.length]
    return {
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      name,
      description: `Reliable ${name.toLowerCase()} from a trusted local professional. Get friendly, quality service at a time that works for you.`,
      provider: { ...provider, name: `${name === 'Homemade Food' ? 'Anu’s Kitchen' : provider.name}` },
      rating: (4.6 + ((groupIndex + serviceIndex) % 4) * 0.1).toFixed(1),
      reviews: 32 + groupIndex * 13 + serviceIndex * 7,
      price: 350 + groupIndex * 100 + serviceIndex * 50,
      image: `https://images.unsplash.com/${serviceImageIds[(groupIndex + serviceIndex) % serviceImageIds.length]}?auto=format&fit=crop&w=900&q=85`,
    }
  }),
)
