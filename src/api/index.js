import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = false;

export const emailLookup = (email) => {
  return axios.get('/email_lookup', {
    params: {
      email: email
    }
  })
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const savePersonalData = (data) => {
  return axios.post('personal_data', data)
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const getCities = () => {
  return axios.get('cities')
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const getActivePlaces = (data) => {
  return axios.get(`places/${data.cityId}/active`)
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const getSchedules = () => {
  return axios.get('schedules')
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const isLocationAvailable = (data) => {
  return axios.get(`location_available/${data.placeId }/${data.scheduleId}`)
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const reserveLocation = (data) => {
  return axios.post('location', data)
    .then(response => ({response}))
    .catch(error => ({error}))
}