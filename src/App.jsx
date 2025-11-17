import { useState } from 'react'
import Hero from './components/Hero'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import TicketDetails from './components/TicketDetails'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeTicket, setActiveTicket] = useState(null)

  const onCreated = () => {
    setRefreshKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900">
      <Hero />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 text-white">
        <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="mb-3 text-2xl font-semibold">Open a new ticket</h2>
          <TicketForm onCreated={onCreated} />
        </div>

        <TicketList refreshKey={refreshKey} onSelect={setActiveTicket} />
      </div>

      {activeTicket && (
        <TicketDetails ticketId={activeTicket} onClose={() => setActiveTicket(null)} onUpdated={() => setRefreshKey(k => k + 1)} />
      )}
    </div>
  )
}

export default App
