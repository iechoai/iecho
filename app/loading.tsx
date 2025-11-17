export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background transition-colors duration-300">
      <div className="relative w-16 h-16 animate-spin">
        {[0, 120, 240].map((angle) => (
          <div
            key={angle}
            className="absolute w-4 h-4 bg-[#0F5F6A] dark:bg-primary rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateY(-18px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
