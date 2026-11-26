
import { useState } from 'react'
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CalendarDays,
  CheckCircle2,
  Clock,
  XCircle,
  Activity,
} from 'lucide-react'

const monthlyData = [
  { month: 'Jan', leads: 35, customers: 18 },
  { month: 'Feb', leads: 48, customers: 25 },
  { month: 'Mar', leads: 42, customers: 22 },
  { month: 'Apr', leads: 65, customers: 34 },
  { month: 'May', leads: 58, customers: 30 },
  { month: 'Jun', leads: 78, customers: 45 },
  { month: 'Jul', leads: 68, customers: 38 },
  { month: 'Aug', leads: 90, customers: 52 },
  { month: 'Sep', leads: 82, customers: 48 },
  { month: 'Oct', leads: 105, customers: 64 },
  { month: 'Nov', leads: 95, customers: 59 },
  { month: 'Dec', leads: 120, customers: 75 },
]

const activities = [
  { name: 'New lead added', detail: 'Sarah Ahmed was added to the CRM', time: '10 minutes ago', icon: Users, color: 'text-blue-600 bg-blue-50' },
  { name: 'Task completed', detail: 'Follow-up call with client completed', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Customer converted', detail: 'Ali Traders converted into a customer', time: '3 hours ago', icon: TrendingUp, color: 'text-violet-600 bg-violet-50' },
  { name: 'Task overdue', detail: 'Website proposal is overdue', time: 'Yesterday', icon: Clock, color: 'text-amber-600 bg-amber-50' },
]

export default function Reports() {
  const [period, setPeriod] = useState('This Year')

  const stats = [
    { title: 'Total Leads', value: '1,284', change: '+12.8%', positive: true, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { title: 'Total Customers', value: '846', change: '+8.2%', positive: true, icon: Target, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Conversion Rate', value: '65.9%', change: '+4.3%', positive: true, icon: TrendingUp, color: 'bg-violet-50 text-violet-600' },
    { title: 'Revenue', value: 'Rs. 485K', change: '-2.4%', positive: false, icon: DollarSign, color: 'bg-amber-50 text-amber-600' },
  ]

  const exportReport = () => {
    const rows = [
      ['Month', 'Leads', 'Customers'],
      ...monthlyData.map(item => [item.month, item.leads, item.customers]),
    ]

    const csv = rows.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'crm-report.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your business performance and team progress.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
          >
            <option>This Year</option>
            <option>This Month</option>
            <option>Last 30 Days</option>
          </select>

          <button
            onClick={exportReport}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={21} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${stat.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">{stat.title}</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</h2>
              <p className="mt-2 text-xs text-slate-400">Compared with previous period</p>
            </div>
          )
        })}
      </div>

      {/* Performance Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Business Performance</h2>
            <p className="mt-1 text-sm text-slate-500">Leads and customers generated each month</p>
          </div>

          <div className="flex gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              Leads
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Customers
            </span>
          </div>
        </div>

        <div className="mt-8 flex h-64 items-end gap-2 border-b border-l border-slate-200 px-2 sm:gap-4">
          {monthlyData.map((item) => (
            <div key={item.month} className="flex h-full flex-1 items-end justify-center gap-1">
              <div
                title={`${item.leads} leads`}
                className="w-1/2 max-w-5 rounded-t-md bg-blue-600 transition hover:bg-blue-700"
                style={{ height: `${(item.leads / 130) * 100}%` }}
              />
              <div
                title={`${item.customers} customers`}
                className="w-1/2 max-w-5 rounded-t-md bg-emerald-500 transition hover:bg-emerald-600"
                style={{ height: `${(item.customers / 130) * 100}%` }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-between text-[10px] text-slate-400 sm:text-xs">
          {monthlyData.map(item => <span key={item.month}>{item.month}</span>)}
        </div>
      </div>

      {/* Lead Status and Activity */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">Lead Status Overview</h2>
          <p className="mt-1 text-sm text-slate-500">Current distribution of your leads</p>

          <div className="mt-6 space-y-5">
            {[
              { label: 'Converted', count: 846, percent: 66, color: 'bg-emerald-500', icon: CheckCircle2 },
              { label: 'In Progress', count: 280, percent: 22, color: 'bg-blue-500', icon: Activity },
              { label: 'Pending', count: 105, percent: 8, color: 'bg-amber-500', icon: Clock },
              { label: 'Lost', count: 53, percent: 4, color: 'bg-red-500', icon: XCircle },
            ].map(item => {
              const Icon = item.icon

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Icon size={16} className="text-slate-400" />
                      {item.label}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item.count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <p className="mt-1 text-right text-xs text-slate-400">{item.percent}%</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Recent Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Latest updates from your CRM</p>
            </div>
            <CalendarDays size={20} className="text-slate-400" />
          </div>

          <div className="mt-5 divide-y divide-slate-100">
            {activities.map((activity, index) => {
              const Icon = activity.icon

              return (
                <div key={index} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">{activity.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{activity.detail}</p>
                    <p className="mt-2 text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        Reports currently use sample data. They will be connected to your database later.
      </p>
    </div>
  )
}
