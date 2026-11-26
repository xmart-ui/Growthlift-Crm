
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserRound,
  ClipboardList,
  ChartNoAxesCombined,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Plus,
  TrendingUp,
  Clock3,
  CheckCircle2,
} from 'lucide-react'

import Leads from '../Pages/Lead.jsx'
import Customers from '../Pages/Customers.jsx'
import Tasks from '../Pages/Tasks.jsx'
import Reports from '../Pages/Reports.jsx'

export default function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Leads', icon: Users },
    { name: 'Customers', icon: UserRound },
    { name: 'Tasks', icon: ClipboardList },
    { name: 'Reports', icon: ChartNoAxesCombined },
  ]

  const stats = [
    {
      title: 'Total Leads',
      value: '248',
      change: '+12.5%',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Customers',
      value: '186',
      change: '+8.2%',
      icon: UserRound,
      color: 'violet',
    },
    {
      title: 'Pending Tasks',
      value: '24',
      change: 'Needs attention',
      icon: Clock3,
      color: 'amber',
    },
    {
      title: 'Completed Tasks',
      value: '132',
      change: '+18.4%',
      icon: CheckCircle2,
      color: 'emerald',
    },
  ]

  const leads = [
 
  ]

  const statusStyles = {
    New: 'bg-blue-50 text-blue-700',
    Contacted: 'bg-amber-50 text-amber-700',
    Qualified: 'bg-emerald-50 text-emerald-700',
  }

  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
            <img
              src="/logo.jpeg"
              alt="GrowthLift Digital Logo"
              className="h-full w-full object-contain"
            />
          </div>

            <div>
              <h1 className="font-bold text-slate-900">
                GrowthLift
              </h1>
              <p className="text-xs text-slate-500">
                CRM Workspace
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
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
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Admin Profile and Logout */}
        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              AD
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Administrator
              </p>
              <p className="text-xs text-slate-500">
                Full access
              </p>
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
              <h2 className="text-lg font-bold text-slate-900">
                {activePage}
              </h2>

              <p className="hidden text-xs text-slate-500 sm:block">
                Manage your CRM workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
              <Search size={16} className="text-slate-400" />

              <input
                placeholder="Search..."
                className="w-32 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
            >
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Admin Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-7xl p-4 sm:p-7">

          {/* Welcome Section - Dashboard Only */}
          {activePage === 'Dashboard' && (
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-500">
                  Friday, November 13, 2026
                </p>

                <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
                  Welcome back, Administrator
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Here's what's happening in your workspace today.
                </p>
              </div>

              <button
                onClick={() => setActivePage('Leads')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                <Plus size={18} />
                Add New Lead
              </button>
            </div>
          )}

          {/* Dashboard Page */}
          {activePage === 'Dashboard' ? (
            <>
              {/* Statistics Cards */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
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

                        <div className={`rounded-xl p-3 ${colorStyles[stat.color]}`}>
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

              {/* Dashboard Sections */}
              <div className="mt-7 grid gap-6 xl:grid-cols-3">

                {/* Recent Leads */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Recent Leads
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Latest lead activity in your CRM
                      </p>
                    </div>

                    <button
                      onClick={() => setActivePage('Leads')}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View all
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[540px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                          <th className="pb-3 font-semibold">Name</th>
                          <th className="pb-3 font-semibold">Company</th>
                          <th className="pb-3 font-semibold">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {leads.map((lead) => (
                          <tr
                            key={lead.email}
                            className="border-b border-slate-50 last:border-0"
                          >
                            <td className="py-4">
                              <p className="font-semibold text-slate-800">
                                {lead.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {lead.email}
                              </p>
                            </td>

                            <td className="py-4 text-slate-600">
                              {lead.company}
                            </td>

                            <td className="py-4">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}
                              >
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Quick Overview */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-slate-900">
                    Quick Overview
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Your workspace summary
                  </p>

                  <div className="mt-6 space-y-5">

                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-600">
                          Lead conversion
                        </span>

                        <span className="font-bold text-slate-800">
                          68%
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[68%] rounded-full bg-blue-600" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-600">
                          Task completion
                        </span>

                        <span className="font-bold text-slate-800">
                          82%
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[82%] rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-sm font-semibold text-blue-900">
                        Keep your team moving
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Review pending tasks and follow up with your latest leads.
                      </p>
                    </div>

                  </div>
                </section>
              </div>
            </>
          ) : activePage === 'Leads' ? (

  
        <Leads />

      ) : activePage === 'Customers' ? (

       
        <Customers />

      ) :  activePage === 'Tasks' ? (

        <Tasks />

      ) 
        : activePage === 'Reports' ? (
          <Reports />
     ) : 
     
     (

        
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">
            {activePage}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            The {activePage.toLowerCase()} management page will be added next.
          </p>
        </section>
      )}

       
          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 GrowthLift Digital. CRM Workspace.
          </p>

        </main>
      </div>
    </div>
  )
}
