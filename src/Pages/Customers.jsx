
import { useEffect, useState, useCallback } from 'react'

import {
  Users,
  UserPlus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  X,
  Plus,
  User,
  Loader2,
} from 'lucide-react'

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from '../api'

export default function Customers() {
  const [search, setSearch] = useState('')
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'active',
  })

  // LOAD CUSTOMERS
  const loadCustomers = useCallback(async () => {
    try {
      setError('')
      setLoading(true)

      const data = await getCustomers()
      setCustomers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Unable to load customers')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCustomers()
  }, [loadCustomers])

  // OPEN MODAL
  const openModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'active',
    })
    setFormError('')
    setShowModal(true)
  }

  // CLOSE MODAL
  const closeModal = () => {
    if (saving) return
    setShowModal(false)
    setFormError('')
  }

  // FORM INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // ADD CUSTOMER
  const handleAddCustomer = async (e) => {
    e.preventDefault()
    setFormError('')

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim()
    ) {
      setFormError('Please fill in all fields.')
      return
    }

    try {
      setSaving(true)

      await addCustomer({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        status: formData.status,
      })

      setShowModal(false)

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'active',
      })

      await loadCustomers()
    } catch (err) {
      setFormError(err.message || 'Unable to add customer.')
    } finally {
      setSaving(false)
    }
  }

  // SEARCH
  const filteredCustomers = customers.filter(customer =>
    `${customer.name || ''} ${customer.email || ''} ${customer.company || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  // VIEW CUSTOMER
  const viewCustomer = customer => {
    window.alert(
      `Name: ${customer.name}\n` +
      `Email: ${customer.email}\n` +
      `Phone: ${customer.phone}\n` +
      `Company: ${customer.company}\n` +
      `Status: ${customer.status}`
    )
  }

  // EDIT CUSTOMER
  const handleEditCustomer = async customer => {
    const name = window.prompt(
      'Customer name',
      customer.name || ''
    )

    if (!name?.trim()) return

    try {
      await updateCustomer(customer.id, {
        name: name.trim(),
      })

      await loadCustomers()
    } catch (err) {
      window.alert(err.message || 'Unable to update customer')
    }
  }

  // DELETE CUSTOMER
  const handleDeleteCustomer = async id => {
    if (!id) return
    if (!window.confirm('Are you sure you want to delete this customer?')) return

    try {
      await deleteCustomer(id)
      await loadCustomers()
    } catch (err) {
      window.alert(err.message || 'Unable to delete customer')
    }
  }

  const activeCustomers = customers.filter(
    customer => customer.status?.toLowerCase() === 'active'
  ).length

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            CUSTOMER MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Customers
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your customer relationships and business contacts.
          </p>
        </div>

        <button
          onClick={openModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <Plus size={19} />
          Add Customer
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid gap-5 sm:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Customers
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                {customers.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
              <Users size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Customers
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                {activeCustomers}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-600">
              <Building2 size={25} />
            </div>
          </div>
        </div>

      </div>

      {/* CUSTOMER TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-slate-900">
              All Customers
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              View and manage your customer records.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {error && (
          <div className="m-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}

            <button
              onClick={loadCustomers}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">

            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto mb-2 animate-spin" size={22} />
                    Loading customers...
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer.id} className="transition hover:bg-slate-50">

                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-800">
                        {customer.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        ID: #{customer.id}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} />
                        {customer.email}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <Phone size={14} />
                        {customer.phone}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {customer.company}
                    </td>

                    <td className="px-6 py-5">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        customer.status?.toLowerCase() === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {customer.status || 'Unknown'}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <button
                          title="View"
                          onClick={() => viewCustomer(customer)}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => handleEditCustomer(customer)}
                          className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-50"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          title="Delete"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}

              {!loading && filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No customers found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* ADD CUSTOMER MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="my-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-start justify-between border-b border-slate-100 px-7 py-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                  <UserPlus size={25} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Add New Customer
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter customer details below.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleAddCustomer} className="space-y-5 px-7 py-7">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Customer Name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-400" size={18} />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="customer@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03XX XXXXXXX"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Company Name
                  </label>

                  <div className="relative">
                    <Building2 className="absolute left-4 top-3.5 text-slate-400" size={18} />

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Customer Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {formError && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              {/* MODAL BUTTONS */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Save Customer
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
