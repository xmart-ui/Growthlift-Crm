import { useState } from 'react'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
  Users,
  ChartNoAxesCombined,
  Zap,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from 'lucide-react'

import RoleSelection from './Pages/RoleSelection.jsx'
import AdminDashboard from './Dashboard/AdminDashboard.jsx'
import EmployeeDashboard from './Dashboard/EmployeeDashboard.jsx'
import { loginUser, signupUser, logoutUser } from './api'




export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')

  const [authView, setAuthView] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

 const switchView = (nextView) => {
  setAuthView(nextView)
  setStatusMessage('')
  setErrorMessage('')
}
const handleSubmit = async (e) => {
  e.preventDefault()

  setStatusMessage('')
  setErrorMessage('')
  setIsLoading(true)

  try {
    if (authView === 'login') {
      // Real backend login
      const data = await loginUser(email, password)

      // Login successful only after receiving token
      if (!data.access_token) {
        throw new Error('Access token not received')
      }

      setIsLoggedIn(true)
    }

    else if (authView === 'signup') {
      // Register user in MongoDB
      await signupUser(fullName, email, password)

      setStatusMessage('Account created successfully. Please sign in.')

      setPassword('')
      setFullName('')
      setAuthView('login')
    }

    else if (authView === 'forgot') {
      setErrorMessage(
        'Password reset feature is not configured in the backend yet.'
      )
    }

  } catch (error) {
    setErrorMessage(
      error.message || 'Something went wrong. Please try again.'
    )
  } finally {
    setIsLoading(false)
  }
}
if (isLoggedIn) {
  if (selectedRole === 'admin') {
    return (
      <AdminDashboard
       onLogout={() => {
        logoutUser()
        setIsLoggedIn(false)
        setSelectedRole('')
        setEmail('')
        setPassword('')
      }}
      />
    )
  }

if (selectedRole === 'employee') {
  return (
    <EmployeeDashboard
      onLogout={() => {
        setIsLoggedIn(false)
        setSelectedRole('')
        setEmail('')
        setPassword('')
      }}
    />
  )
}
  return (
    <RoleSelection
      onContinue={(role) => setSelectedRole(role)}
      onLogout={() => {
        setIsLoggedIn(false)
        setSelectedRole('')
        setEmail('')
        setPassword('')
      }}
    />
  )
}
  return (
    
    <main className="screen-fit min-h-[100dvh] bg-[#091326] selection:bg-blue-500 selection:text-white">
      <div className="screen-fit__inner mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col lg:flex-row">

        {/* LEFT BRAND SECTION */}
        <section className="brand-panel relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-7 text-center sm:px-8 sm:py-8 md:px-12 lg:min-h-[100dvh] lg:px-8 lg:py-6 xl:px-12">

          <div className="pointer-events-none absolute -left-36 top-8 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-36 -right-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />

          <div className="brand-content relative z-10 flex w-full max-w-[580px] flex-col items-center">

            {/* LOGO */}
            <div className="flex flex-col items-center">
            <div className="group flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-xl shadow-blue-600/30 ring-1 ring-white/20 transition-transform duration-300 hover:scale-105 sm:h-16 sm:w-16">
                <img 
                  src="/logo.jpeg" 
                  alt="GrowthLift Logo" 
                  className="h-full w-full object-cover transition-opacity duration-300" 
                  onError={(e) => {
                    // Fallback agar image file na mile taake layout break na ho
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <h1 className="mt-3 text-xl font-bold tracking-tight text-white sm:mt-4 sm:text-2xl">
                GrowthLift Digital
              </h1>

              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[3.5px] text-blue-400">
                CRM Workspace
              </p>
            </div>

            {/* HERO SECTION */}
            <div className="brand-hero mt-6 flex w-full flex-col items-center sm:mt-7 lg:mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-2 backdrop-blur-sm sm:px-4">
                <Zap size={14} className="shrink-0 text-blue-400" />
                <span className="text-[10px] font-bold tracking-[1.2px] text-blue-200 sm:text-[11px] sm:tracking-[1.5px]">
                  YOUR BUSINESS. ONE WORKSPACE.
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-white sm:mt-6 sm:text-5xl xl:text-[54px]">
                Manage smarter.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  Grow stronger.
                </span>
              </h2>

              <p className="mt-4 max-w-md px-2 text-sm leading-6 text-slate-300/80 sm:mt-5 sm:px-0 sm:text-base sm:leading-7">
                Bring your leads, customers, and team activities together in one
                organized, high-velocity workspace.
              </p>
            </div>

            {/* FEATURE BOXES */}
            <div className="feature-grid mt-6 grid w-full grid-cols-1 gap-3 text-left sm:mt-7 sm:grid-cols-2 sm:gap-3">

              <div className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:from-white/[0.11] hover:to-white/[0.06] sm:p-6">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-400/25 transition-transform duration-300 group-hover:scale-105">
                    <Users size={21} className="text-blue-400" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold leading-snug text-white sm:mt-5">
                    Customer Management
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400 sm:mt-3 sm:leading-6">
                    Keep customer records, deals, and follow-ups cleanly organized.
                  </p>
                </div>
              </div>

              <div className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:from-white/[0.11] hover:to-white/[0.06] sm:p-6">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/25 transition-transform duration-300 group-hover:scale-105">
                    <ChartNoAxesCombined size={21} className="text-indigo-400" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold leading-snug text-white sm:mt-5">
                    Business Insights
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400 sm:mt-3 sm:leading-6">
                    Monitor your team&apos;s progress and pipeline growth in real time.
                  </p>
                </div>
              </div>
            </div>

            <p className="brand-copyright mt-6 text-xs tracking-wide text-slate-500 sm:mt-7">
              © 2026 GrowthLift Digital. All rights reserved.
            </p>
          </div>
        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="auth-panel flex flex-1 items-center justify-center bg-gradient-to-br from-[#f4f7fc] via-[#eef3fb] to-[#e6eef9] px-4 py-6 sm:px-8 sm:py-7 lg:px-8 lg:py-4 xl:px-10">

          <div className="auth-card w-full max-w-[450px] rounded-[24px] border border-slate-200/90 bg-white p-5 shadow-[0_24px_70px_-12px_rgba(9,19,38,0.12)] transition-all duration-300 sm:rounded-[26px] sm:p-7 lg:p-7 xl:p-8">

            {/* CARD HEADER */}
            <div className="mb-5 sm:mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-600/15 sm:mb-4 sm:h-12 sm:w-12">
                <Lock size={21} />
              </div>

              <p className="text-[11px] font-bold uppercase tracking-[2px] text-blue-600">
                Welcome to GrowthLift
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0f1b33] sm:text-[28px]">
                {authView === 'login' && 'Sign in'}
                {authView === 'forgot' && 'Reset password'}
                {authView === 'signup' && 'Create account'}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {authView === 'login' &&
                  'Enter your account details to continue to your CRM.'}
                {authView === 'forgot' &&
                  'Enter your work email and we will send a recovery link.'}
                {authView === 'signup' &&
                  'Set up your GrowthLift Digital CRM account in seconds.'}
              </p>
            </div>

            {/* STATUS MESSAGE */}
            {statusMessage && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/90 px-3 py-3 text-xs font-medium leading-5 text-emerald-800 sm:px-4">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{statusMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">

              {authView === 'signup' && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Full Name
                  </label>

                  <div className="group flex h-[50px] items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-3.5 transition-all duration-200 hover:border-slate-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10 sm:h-[52px] sm:px-4">
                    <User
                      size={18}
                      className="shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-600"
                    />

                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      required
                      className="w-full min-w-0 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Email address
                </label>

                <div className="group flex h-[50px] items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-3.5 transition-all duration-200 hover:border-slate-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10 sm:h-[52px] sm:px-4">
                  <Mail
                    size={18}
                    className="shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-600"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full min-w-0 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              {authView !== 'forgot' && (
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      Password
                    </label>

                    {authView === 'login' && (
                      <button
                        type="button"
                        onClick={() => switchView('forgot')}
                        className="cursor-pointer text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <div className="group flex h-[50px] items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-3.5 transition-all duration-200 hover:border-slate-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10 sm:h-[52px] sm:px-4">
                    <Lock
                      size={18}
                      className="shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-600"
                    />

                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={
                        authView === 'login' ? 'current-password' : 'new-password'
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full min-w-0 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="-mr-1 shrink-0 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-blue-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {/* REMEMBER ME */}
              {authView === 'login' && (
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                    />
                    <span>Remember me</span>
                  </label>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-600/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:h-[52px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {authView === 'login' && 'Continue to workspace'}
                      {authView === 'forgot' && 'Send reset link'}
                      {authView === 'signup' && 'Create workspace account'}
                    </span>

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* SIGNUP / BACK TO LOGIN */}
            <div className="mt-4 text-center text-sm text-slate-500 sm:mt-5">
              {authView === 'login' ? (
                <p>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchView('signup')}
                    className="cursor-pointer font-bold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => switchView('login')}
                  className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                >
                  <ArrowLeft size={15} />
                  <span>Back to Sign in</span>
                </button>
              )}
            </div>

            {/* SECURITY FOOTER */}
            <div className="mt-5 flex items-center justify-center gap-2 border-t border-slate-100 pt-4 sm:mt-6 sm:pt-5">
              <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
              <span className="text-xs font-medium tracking-wide text-slate-500">
                Secure CRM Workspace
              </span>
            </div>

          </div>
        </section>
      </div>
    </main>
  )
}