import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black text-white">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability (doesn't block interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start justify-end px-6 pb-16 pt-28">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-white/80 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          IT Support • Ticketing
        </span>
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
          Manage IT requests with a futuristic touch
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Create, track, and resolve support tickets effortlessly. Prioritize issues, assign to agents, and keep everyone in the loop.
        </p>
      </div>
    </section>
  )
}

export default Hero
