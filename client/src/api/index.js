import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertUser = payload => api.post(`/Login`, payload)
export const getUser = email => api.get(`/Login/${email}`)

const apis = {
    insertUser,
    getUser
}

export default apis