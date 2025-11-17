import { useState } from 'react'

function TicketForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    requester_email: '',
    category: 'Software',
    priority: 'medium'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to create ticket')
      const data = await res.json()
      onCreated && onCreated(data.id)
      setForm({ title: '', description: '', requester_email: '', category: 'Software', priority: 'medium' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Issue title" className="w-full rounded-md border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 focus:outline-none" required />
        <input type="email" name="requester_email" value={form.requester_email} onChange={handleChange} placeholder="Your email" className="w-full rounded-md border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 focus:outline-none" required />
      </div>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the problem" className="min-h-[90px] w-full rounded-md border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 focus:outline-none" required />
      <div className="grid gap-3 md:grid-cols-2">
        <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-white/5 p-3 text-white focus:outline-none">
          <option>Software</option>
          <option>Hardware</option>
          <option>Access</option>
          <option>Network</option>
          <option>Other</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-white/5 p-3 text-white focus:outline-none">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button disabled={loading} className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50">
        {loading ? 'Creating...' : 'Create Ticket'}
      </button>
    </form>
  )
}

export default TicketForm
