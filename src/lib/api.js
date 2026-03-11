import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const getHome      = ()           => api.get('/home/')
export const getAbout     = ()           => api.get('/about/')
export const getServices  = ()           => api.get('/services/')
export const getService   = (slug)       => api.get(`/services/${slug}/`)
export const getProjects  = (params)     => api.get('/projects/', { params })
export const getProject   = (slug)       => api.get(`/projects/${slug}/`)
export const getProjectCategories = ()   => api.get('/projects/categories/')
export const getClients   = ()           => api.get('/clients/')
export const submitContact = (data)      => api.post('/contact/', data)

export default api
