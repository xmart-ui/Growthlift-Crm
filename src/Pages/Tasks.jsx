
import { useState } from 'react'
import {
  ClipboardList,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Pencil,
  CalendarDays,
} from 'lucide-react'

export default function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Follow up with new leads',
      description: 'Contact recently registered leads.',
      priority: 'High',
      status: 'Pending',
      dueDate: '2026-11-16',
    },
    {
      id: 2,
      title: 'Prepare customer report',
      description: 'Prepare the monthly customer report.',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '2026-11-18',
    },
    {
      id: 3,
      title: 'Update CRM records',
      description: 'Review and update customer information.',
      priority: 'Low',
      status: 'Completed',
      dueDate: '2026-11-12',
    },
  ])

  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const emptyForm = {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
  }

  const [form, setForm] = useState(emptyForm)

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  const saveTask = (e) => {
    e.preventDefault()

    if (editingId) {
      setTasks(prev =>
        prev.map(task =>
          task.id === editingId ? { ...form, id: editingId } : task
        )
      )
    } else {
      setTasks(prev => [
        ...prev,
        { ...form, id: Date.now() },
      ])
    }

    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const editTask = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
    })
    setEditingId(task.id)
    setShowForm(true)
  }

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id))
    }
  }

  const updateStatus = (id, status) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  const priorityStyles = {
    High: 'bg-red-50 text-red-600',
    Medium: 'bg-amber-50 text-amber-700',
    Low: 'bg-blue-50 text-blue-600',
  }

  const statusStyles = {
    Pending: 'bg-amber-50 text-amber-700',
    'In Progress': 'bg-blue-50 text-blue-700',
    Completed: 'bg-emerald-50 text-emerald-700',
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tasks Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize, assign and track your team's tasks.
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
          Add New Task
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { title: 'Total Tasks', value: tasks.length, icon: ClipboardList },
          { title: 'Pending', value: tasks.filter(t => t.status === 'Pending').length, icon: Clock },
          { title: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, icon: CheckCircle2 },
        ].map(item => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.title}</p>
                <Icon size={21} className="text-blue-600" />
              </div>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          )
        })}
      </div>

      {/* Task Form */}
      {showForm && (
        <form
          onSubmit={saveTask}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h3 className="text-lg font-bold text-slate-900">
            {editingId ? 'Edit Task' : 'Create New Task'}
          </h3>

          <div>
            <label className="mb-2 block text-sm font-medium">Task Title</label>
            <input
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe this task"
              rows="3"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-3"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-3"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Due Date</label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-3"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {editingId ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-3.5 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* Tasks Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Task</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{task.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{task.description}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={15} />
                      {task.dueDate || 'Not set'}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={task.status}
                      onChange={e => updateStatus(task.id, e.target.value)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold outline-none ${statusStyles[task.status]}`}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        title="Edit task"
                        onClick={() => editTask(task)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        title="Delete task"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
