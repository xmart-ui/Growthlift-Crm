
import { useState } from 'react'
import {
  ShieldCheck,
  UserRound,
  ArrowRight,
  LogOut,
  Users,
  BarChart3,
  ClipboardList,
} from 'lucide-react'

export default function RoleSelection({ onContinue, onLogout }) {
  const [selectedRole, setSelectedRole] = useState('')

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage your entire CRM workspace and team.',
      icon: ShieldCheck,
      features: ['Manage users and employees', 'View reports and analytics', 'Full CRM access'],
    },
    {
      id: 'employee',
      title: 'Employee',
      description: 'Manage your assigned work and daily activities.',
      icon: UserRound,
      features: ['Manage assigned leads', 'Update customer records', 'Track daily tasks'],
    },
  ]

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-4xl">

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">
              GL
            </div>
            <div>
              <h1 className="font-bold text-slate-900">
                GrowthLift Digital
              </h1>
              <p className="text-xs text-slate-500">CRM Workspace</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-9">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[2px] text-blue-600">
              Workspace Access
            </span>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Select Your Role
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Choose your role to continue to your CRM workspace.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon
              const isSelected = selectedRole === role.id

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative rounded-2xl border-2 p-5 text-left transition-all duration-200 sm:p-6 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 shadow-lg shadow-blue-100'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-4 top-4 text-blue-600">
                      <ShieldCheck size={21} />
                    </span>
                  )}

                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Icon size={27} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {role.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {role.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                    {role.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            disabled={!selectedRole}
            onClick={() => onContinue?.(selectedRole)}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue to Dashboard
            <ArrowRight size={18} />
          </button>

          <p className="mt-5 text-center text-xs text-slate-400">
            <ClipboardList size={13} className="mr-1 inline" />
            Your workspace access depends on your assigned role.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 GrowthLift Digital. All rights reserved.
        </p>
      </div>
    </main>
  )
}
