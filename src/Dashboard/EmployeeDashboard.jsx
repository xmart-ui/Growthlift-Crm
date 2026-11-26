
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  TrendingUp,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  CheckCircle2,
  Clock3,
  Target,
  ArrowUpRight,
} from 'lucide-react'

export default function EmployeeDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Follow up with Ali Ahmed', time: '10:00 AM', done: false },
    { id: 2, title: 'Contact new leads', time: '12:00 PM', done: false },
    { id: 3, title: 'Update customer records', time: '02:00 PM', done: true },
    { id: 4, title: 'Prepare daily report', time: '04:00 PM', done: false },
  ])

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Leads', icon: Users },
    { name: 'My Tasks', icon: ClipboardList },
    { name: 'My Performance', icon: TrendingUp },
  ]

  const leads = [
    { name: 'Ali Ahmed', company: 'Tech Solutions', status: 'New' },
    { name: 'Sara Khan', company: 'Creative Studio', status: 'Contacted' },
    { name: 'Usman Malik', company: 'Digital House', status: 'Qualified' },
    { name: 'Ayesha Noor', company: 'Bright Agency', status: 'New' },
  ]

  const stats = [
    { title: 'My Leads', value: '42', change: '+8 this week', icon: Users, color: 'blue' },
    { title: 'Completed Tasks', value: tasks.filter(t => t.done).length, change: 'Tasks completed', icon: CheckCircle2, color: 'emerald' },
    { title: 'Pending Tasks', value: tasks.filter(t => !t.done).length, change: 'Need attention', icon: Clock3, color: 'amber' },
    { title: 'Conversion Rate', value: '24%', change: '+4.5% this month', icon: Target, color: 'violet' },
  ]

  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    violet: 'bg-violet-50 text-violet-600',
  }

  const statusColors = {
    New: 'bg-blue-50 text-blue-700',
    Contacted: 'bg-amber-50 text-amber-700',
    Qualified: 'bg-emerald-50 text-emerald-700',
  }

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>

        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white">
              GL
            </div>
            <div>
              <h1 className="font-bold text-slate-900">GrowthLift</h1>
              <p className="text-xs text-slate-500">Employee Workspace</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            My Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map(item => {
              const Icon = item.icon
              const active = activePage === item.name

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name)
                    setSidebarOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              EM
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Employee</p>
              <p className="text-xs text-slate-500">Team Member</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen lg:pl-64">

        {/* Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-7">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-slate-900">{activePage}</h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Your personal CRM workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
              <Search size={16} className="text-slate-400" />
              <input
                placeholder="Search..."
                className="w-32 bg-transparent text-sm outline-none"
              />
            </div>

            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              EM
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-7">

          {/* Welcome */}
          <div className="mb-7">
            <p className="text-sm text-slate-500">Employee Workspace</p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
              Welcome back, Employee!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here's your work summary and today's activities.
            </p>
          </div>

          {activePage === 'Dashboard' && (
            <>
              {/* Statistics */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(stat => {
                  const Icon = stat.icon

                  return (
                    <div
                      key={stat.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">
                          {stat.title}
                        </p>
                        <div className={`rounded-xl p-3 ${colors[stat.color]}`}>
                          <Icon size={20} />
                        </div>
                      </div>

                      <h3 className="mt-4 text-3xl font-extrabold text-slate-900">
                        {stat.value}
                      </h3>

                      <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <TrendingUp size={14} />
                        {stat.change}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-7 grid gap-6 xl:grid-cols-3">

                {/* Recent Leads */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">My Recent Leads</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Leads assigned to you
                      </p>
                    </div>

                    <button
                      onClick={() => setActivePage('My Leads')}
                      className="text-sm font-semibold text-blue-600"
                    >
                      View all
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                          <th className="pb-3">Name</th>
                          <th className="pb-3">Company</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {leads.map(lead => (
                          <tr key={lead.name} className="border-b border-slate-50 last:border-0">
                            <td className="py-4 font-semibold text-slate-800">
                              {lead.name}
                            </td>
                            <td className="py-4 text-slate-600">
                              {lead.company}
                            </td>
                            <td className="py-4">
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[lead.status]}`}>
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Tasks */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">My Tasks</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Today's activities
                      </p>
                    </div>
                    <ClipboardList size={20} className="text-blue-600" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {tasks.map(task => (
                      <label
                        key={task.id}
                        className="flex cursor-pointer items-start gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(task.id)}
                          className="mt-1 h-4 w-4 accent-blue-600"
                        />

                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium ${
                            task.done
                              ? 'text-slate-400 line-through'
                              : 'text-slate-800'
                          }`}>
                            {task.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {task.time}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={() => setActivePage('My Tasks')}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    View all tasks
                    <ArrowUpRight size={16} />
                  </button>
                </section>
              </div>

              {/* Performance */}
              <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-900">My Performance</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Your monthly progress
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">Lead Target</span>
                      <span className="font-bold text-slate-800">75%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-3/4 rounded-full bg-blue-600" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">Task Completion</span>
                      <span className="font-bold text-slate-800">
                        {Math.round((tasks.filter(t => t.done).length / tasks.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{
                          width: `${(tasks.filter(t => t.done).length / tasks.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {activePage !== 'Dashboard' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{activePage}</h3>
              <p className="mt-2 text-sm text-slate-500">
                This section will be developed in the next steps.
              </p>
              <button
                onClick={() => setActivePage('Dashboard')}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Back to Dashboard
              </button>
            </section>
          )}

          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 GrowthLift Digital. Employee Workspace.
          </p>
        </main>
      </div>
    </div>
  )
}
