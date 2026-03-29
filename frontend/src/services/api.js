import axios from 'axios'

const API = axios.create({ 
  baseURL: 'http://localhost:5000/api' 
})

// Automatically attach token to every request if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }
  return req
})

export const submitComplaint = (data) => API.post('/complaints', data)
export const getAllComplaints = ()     => API.get('/complaints')
export const trackComplaint  = (id)   => API.get(`/complaints/${id}`)
export const updateStatus    = (id, status) => API.patch(`/complaints/${id}`, { status })
export const loginAdmin      = (data) => API.post('/auth/login', data)