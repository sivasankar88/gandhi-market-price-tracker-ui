export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  }
  return (
    <div className={`flex justify-center items-center py-10 ${className}`}>
      <div
        className={`${sizes[size]} spinner border-earth-300 border-t-earth-600 rounded-full`}
      />
    </div>
  )
}
