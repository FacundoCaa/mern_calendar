import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { variables } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: variables
})

// Todo: configurar interceptores
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;