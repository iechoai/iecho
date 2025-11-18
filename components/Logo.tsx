interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 32, height = 32, className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0F5F66" />
          <stop offset="100%" stopColor="#B6FF3D" />
        </linearGradient>
        <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#logoGlow)">
        {/* Connection Lines */}
        <line
          x1="100"
          y1="100"
          x2="160"
          y2="60"
          stroke="url(#logoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="100"
          x2="160"
          y2="140"
          stroke="url(#logoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="100"
          x2="40"
          y2="60"
          stroke="url(#logoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="100"
          x2="40"
          y2="140"
          stroke="url(#logoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Outer Nodes */}
        <circle
          cx="160"
          cy="60"
          r="12"
          fill="url(#logoGradient)"
        />
        <circle
          cx="160"
          cy="140"
          r="12"
          fill="url(#logoGradient)"
        />
        <circle
          cx="40"
          cy="60"
          r="12"
          fill="url(#logoGradient)"
        />
        <circle
          cx="40"
          cy="140"
          r="12"
          fill="url(#logoGradient)"
        />
        {/* Central Node */}
        <circle
          cx="100"
          cy="100"
          r="24"
          fill="url(#logoGradient)"
        />
      </g>
    </svg>
  );
}