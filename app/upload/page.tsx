// app/page.tsx
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
        Welcome to <span className="text-blue-600 dark:text-blue-400">BioVision</span> Hub
      </h1>
      <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
        Your new, smart educational platform is officially online. Phase 4 will transform this space into the ultimate search dashboard.
      </p>
    </div>
  )
}