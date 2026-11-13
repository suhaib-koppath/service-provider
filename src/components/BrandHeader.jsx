function BrandHeader() {
  return (
    <div className="flex items-center gap-2 text-[var(--color-brand)] dark:text-[var(--color-brand-light)]">
      <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-[var(--color-brand)] text-xs font-bold text-[var(--color-white)]">
        N
      </span>
      <span className="text-[13px] font-bold tracking-[-0.02em]">
        Nishin Ideas
      </span>
    </div>
  )
}

export default BrandHeader
