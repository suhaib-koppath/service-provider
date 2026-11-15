import { services } from './serviceCatalog.js'

export const findServiceBySlug = (slug) => services.find((service) => service.slug === slug)
