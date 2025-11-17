import { useEffect, useState } from 'react'

function TicketDetails({ ticketId, onClose, onUpdated }) {
  const [ticket, setTicket] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [comment, setComment] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    if (!ticketId) return
    const res = await fetch(`${baseUrl}/api/tickets/${ticketId}`)
    const data = await res.json()
    setTicket(data)
  }

  useEffect(() => { load() }, [ticketId])

  const updateField = async (field, value) => {
    if (!ticket) return
    setUpdating(true)
    try {
      await fetch(`${baseUrl}/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      })
      await load()
      onUpdated && onUpdated()
    } finally {
      setUpdating(false)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    await fetch(`${baseUrl}/api/tickets/${ticket.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticket_id: ticket.id, author: 'Agent', body: comment })
    })
    setComment('')
    await load()
  }

  if (!ticketId) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 md:items-center">
      <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-slate-900 p-5 text-white shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{ticket?.title || 'Ticket'}</h3>
            <p className="text-sm text-white/60">{ticket?.requester_email} • {ticket?.category}</p>
          </div>
          <button onClick={onClose} className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">Close</button>
        </div>

        <p className="mb-4 text-white/80">{ticket?.description}</p>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs text-white/50">Status</p>
            <select disabled={updating} value={ticket?.status} onChange={e => updateField('status', e.target.value)} className="w-full rounded-md border border-white/10 bg-white/5 p-2">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/50">Priority</p>
            <select disabled={updating} value={ticket?.priority} onChange={e => updateField('priority', e.target.value)} className="w-full rounded-md border border-white/10 bg-white/5 p-2">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/50">Assignee</p>
            <input disabled={updating} value={ticket?.assignee || ''} onChange={e => updateField('assignee', e.target.value)} placeholder="Agent name" className="w-full rounded-md border border-white/10 bg-white/5 p-2" />
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold">Comments</p>
          <div className="max-h-56 space-y-2 overflow-auto rounded-md border border-white/10 bg-white/5 p-3">
            {ticket?.comments?.length ? ticket.comments.map(c => (
              <div key={c.id} className="rounded-md bg-white/5 p-2">
                <p className="text-xs text-white/60">{c.author} • {new Date(c.created_at).toLocaleString()}</p>
                <p className="text-sm">{c.body}</p>
              </div>
            )) : <p className="text-white/60">No comments yet.</p>}
          </div>
          <form onSubmit={addComment} className="mt-2 flex gap-2">
            <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment" className="flex-1 rounded-md border border-white/10 bg-white/5 p-2" />
            <button className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold hover:bg-emerald-600">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TicketDetails
