export function DraxityLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>

        {/* Main background */}
        <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />

        {/* Connected nodes representing data structures */}
        <circle cx="8" cy="8" r="2.5" fill="url(#nodeGradient)" />
        <circle cx="24" cy="8" r="2.5" fill="url(#nodeGradient)" />
        <circle cx="8" cy="24" r="2.5" fill="url(#nodeGradient)" />
        <circle cx="24" cy="24" r="2.5" fill="url(#nodeGradient)" />
        <circle cx="16" cy="16" r="3" fill="url(#nodeGradient)" />

        {/* Connection lines */}
        <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="1.5" opacity="0.8" />
        <line x1="24" y1="8" x2="16" y2="16" stroke="white" strokeWidth="1.5" opacity="0.8" />
        <line x1="8" y1="24" x2="16" y2="16" stroke="white" strokeWidth="1.5" opacity="0.8" />
        <line x1="24" y1="24" x2="16" y2="16" stroke="white" strokeWidth="1.5" opacity="0.8" />

        {/* Central D for Draxity */}
        <text x="16" y="20" textAnchor="middle" fill="#1E293B" fontSize="8" fontWeight="bold" fontFamily="system-ui">
          D
        </text>
      </svg>
    </div>
  )
}