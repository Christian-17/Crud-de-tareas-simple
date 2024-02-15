import { createApp } from 'vue'
import axios from 'axios'

const axiosIns = axios
axiosIns.defaults.baseURL = import.meta.env.VITE_API_URL
axiosIns.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// createApp.prototype.$http = axiosIns

export default axiosIns