import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

function apiToken(token) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

function getTasks() { return api.get('/tasks') }

function logoutAll() { return api.post('/users/logoutAll') }

export const  createUser = payload => api.post('/users', payload)
export const  getUserByEmail = email => api.get('/users/me/' + email)
export const  loginUser = user => api.post('/users/login', user)

export const  createTask = payload => api.post('/tasks', payload)
export const  getTasksFilter = filter => api.get('/tasks/' + filter) // --> /tasks?completed=true || /tasks?limit=10&skip=20 || /tasks?sortBy=createdAt:desc
export const  getTask = id => api.get('/tasks/' + id) // --> /ID
export const  updateTask = payload => api.patch('/tasks/' + payload._id, { completed: payload.completed })
export const  deleteTask = id => api.delete('/tasks/' + id)

const apis = {
    apiToken,
    createUser,
    getUserByEmail,
    loginUser,
    logoutAll,
    createTask,
    getTasks,
    getTasksFilter,
    getTask,
    updateTask,
    deleteTask
}

export default apis