function RotatingCircleFrame({ children, className = '' }) {
  return (
    <div
      className={`relative isolate flex w-full items-center justify-center rounded-[50%] p-5 sm:p-8 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10  rounded-[inherit] "
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2px] -z-10 rounded-[inherit] backdrop-blur"
      />
      {children}
    </div>
  )
}

export default RotatingCircleFrame
