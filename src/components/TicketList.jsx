import { useEffect, useState } from 'react'

function Badge({ children, color = 'slate' }) {
  const colorMap = {
    slate: 'bg-slate-500/20 text-slate-200',
    emerald: 'bg-emerald-500/20 text-emerald-200',
    amber: 'bg-amber-500/20 text-amber-200',
    rose: 'bg-rose-500/20 text-rose-200'
  }
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${colorMap[color]}`}>{children}</span>
}

function TicketList({ refreshKey, onSelect }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTickets = async () => {
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/tickets`)
      const data = await res.json()
      setTickets(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTickets() }, [refreshKey])

  const statusColor = (status) => {
    switch (status) {
      case 'open': return 'rose'
      case 'in_progress': return 'amber'
      case 'resolved': return 'emerald'
      case 'closed': return 'slate'
      default: return 'slate'
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent Tickets</h3>
        <button onClick={fetchTickets} className="text-sm text-white/70 hover:text-white">Refresh</button>
      </div>
      {loading ? (
        <p className="text-white/70">Loading...</p>
      ) : tickets.length === 0 ? (
        <p className="text-white/60">No tickets yet.</p>
      ) : (
        <ul className="divide-y divide-white/10">
          {tickets.map(t => (
            <li key={t.id} className="cursor-pointer py-3 hover:bg-white/5" onClick={() => onSelect && onSelect(t.id)}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{t.title}</p>
                  <p className="text-xs text-white/60">{t.requester_email} • {t.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={statusColor(t.status)}>{t.status.replace('_',' ')}</Badge>
                  <Badge color={t.priority === 'urgent' ? 'rose' : t.priority === 'high' ? 'amber' : 'slate'}>{t.priority}</Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TicketList
