import axios from 'axios'


//Create an Axios instance with default configuration
const api = axios.create({
    baseURL: 'https://nodejs214.dszcbaross.edu.hu/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})


// Add a request interceptor to include the JWT token in the Authorization header for all requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
})

// Add a response interceptor to handle authentication errors

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname
            
            if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/verify-email') {
                localStorage.removeItem('token')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)


export default api