
import { useState } from 'react'
import {
  Plus, Search, Filter, Pencil, Trash2,
  X, Users, Mail, Phone, Building2
} from 'lucide-react'

export default function Leads() {
  const [leads, setLeads] = useState([
  ])

  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'New',
    assigned: 'Ahmed',
  }

  const [form, setForm] = useState(emptyForm)

  const filteredLeads = leads.filter(lead =>
    `${lead.name} ${lead.email} ${lead.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      setLeads(prev => prev.map(lead =>
        lead.id === editingId ? { ...form, id: editingId } : lead
      ))
    } else {
      setLeads(prev => [
        ...prev,
        { ...form, id: Date.now() },
      ])
    }

    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const editLead = (lead) => {
    setEditingId(lead.id)
    setForm({ ...lead })
    setShowForm(true)
  }

  const deleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(lead => lead.id !== id))
    }
  }

  const statusStyles = {
    New: 'bg-blue-50 text-blue-700',
    Contacted: 'bg-amber-50 text-amber-700',
    Qualified: 'bg-emerald-50 text-emerald-700',
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and organize your business leads.
          </p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm)
            setEditingId(null)
            setShowForm(true)
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New Lead
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: 'Total Leads', value: leads.length, icon: Users },
          { title: 'New Leads', value: leads.filter(l => l.status === 'New').length, icon: Mail },
          { title: 'Qualified Leads', value: leads.filter(l => l.status === 'Qualified').length, icon: Building2 },
        ].map(item => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.title}</p>
                <Icon size={20} className="text-blue-600" />
              </div>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{item.value}</h2>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-500">
            <Filter size={17} />
            {filteredLeads.length} Leads Found
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th className="pb-4">Lead</th>
                <th className="pb-4">Phone</th>
                <th className="pb-4">Company</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Assigned To</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-4">
                    <p className="font-semibold text-slate-800">{lead.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{lead.email}</p>
                  </td>
                  <td className="py-4 text-slate-600">{lead.phone}</td>
                  <td className="py-4 text-slate-600">{lead.company}</td>
                  <td className="py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600">{lead.assigned}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editLead(lead)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        aria-label="Edit lead"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                        aria-label="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400">
              No leads found.
            </p>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? 'Edit Lead' : 'Add New Lead'}
                </h2>
                <p className="mt-1 text-xs text-slate-500">Enter lead information</p>
              </div>
              <button onClick={() => setShowForm(false)}>
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {[
                { key: 'name', label: 'Full Name', placeholder: 'Enter full name' },
                { key: 'email', label: 'Email Address', placeholder: 'Enter email' },
                { key: 'phone', label: 'Phone Number', placeholder: 'Enter phone number' },
                { key: 'company', label: 'Company', placeholder: 'Enter company name' },
              ].map(field => (
                <div key={field.key}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {field.label}
                  </label>
                  <input
                    required
                    type={field.key === 'email' ? 'email' : 'text'}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Assign To</label>
                  <select
                    value={form.assigned}
                    onChange={e => setForm({ ...form, assigned: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
                  >
                    <option>Ahmed</option>
                    <option>Usman</option>
                    <option>Sara</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingId ? 'Update Lead' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
