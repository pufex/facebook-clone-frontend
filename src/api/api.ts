import axios from "axios"

const BASE_URL = "http://localhost:3003"

export const axiosPublic = axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})