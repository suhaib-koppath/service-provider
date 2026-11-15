import './provider-avatar-stack.css'

const MAX_VISIBLE_PROVIDERS = 3

export function ProviderAvatar({ name, image, size = 'medium' }) {
  const providerName = String(name || 'Provider')
  const initials = providerName.split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase()

  return (
    <span className={`provider-avatar provider-avatar-${size}`} title={providerName} aria-hidden="true">
      {image ? <img src={image} alt="" loading="lazy" /> : <span>{initials || '•'}</span>}
    </span>
  )
}

export default function ProviderAvatarStack({ providers, size = 'medium' }) {
  if (!providers.length) return '—'
  const visibleProviders = providers.slice(0, MAX_VISIBLE_PROVIDERS)
  const extraCount = providers.length - visibleProviders.length
  const providerNames = providers.map((provider) => provider.fullName || provider.name || 'Provider').join(', ')

  return (
    <span className={`provider-avatar-stack provider-avatar-stack-${size}`} role="img" aria-label={`Providers: ${providerNames}`}>
      {visibleProviders.map((provider) => (
        <ProviderAvatar
          key={provider.id}
          name={provider.fullName || provider.name}
          image={provider.profileImage || provider.image}
          size={size}
        />
      ))}
      {extraCount > 0 && <span className="provider-avatar-extra" aria-hidden="true">+{extraCount}</span>}
    </span>
  )
}
