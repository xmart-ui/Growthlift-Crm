
const API_URL = 'http://127.0.0.1:8000'

// COMMON API FUNCTION
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('access_token')

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      data.detail || `Request failed with status ${response.status}`
    )
  }

  return data
}

// LOGIN
export async function loginUser(email, password) {
  const data = await apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token)
  }

  return data
}

// SIGNUP
export async function signupUser(name, email, password) {
  return apiRequest('/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

// DASHBOARD
export async function getDashboard() {
  return apiRequest('/dashboard')
}

// GET CUSTOMERS
export async function getCustomers() {
  const data = await apiRequest('/customers')
  return data.customers || []
}

// ADD CUSTOMER
export async function addCustomer(customer) {
  return apiRequest('/customers', {
    method: 'POST',
    body: JSON.stringify(customer),
  })
}

// UPDATE CUSTOMER
export async function updateCustomer(id, customer) {
  return apiRequest(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(customer),
  })
}

// DELETE CUSTOMER
export async function deleteCustomer(id) {
  return apiRequest(`/customers/${id}`, {
    method: 'DELETE',
  })
}

// LOGOUT
export function logoutUser() {
  localStorage.removeItem('access_token')
}
