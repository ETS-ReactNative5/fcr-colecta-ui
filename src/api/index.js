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
    .then(response => response.data)
    .catch(error => error)
}

export const savePersonalData = (data) => {
  return axios.post('personal_data', data)
    .then(response => response.data)
    .catch(error => error)
}

export const saveFriends = (data) => {
  return axios.post('friends', data)
    .then(response => response.data)
    .catch(error => error)
}

export const getCities = () => {
  return axios.get('cities')
    .then(response => response.data)
    .catch(error => error)
}

export const getActivePlaces = (data) => {
  return axios.get(`places/${data.cityId}/active`,
    {params: {schedule_id: data.scheduleId}})
    .then(response => response.data)
    .catch(error => error)
}

export const getSchedules = () => {
  return axios.get('schedules')
    .then(response => response.data)
    .catch(error => error)
}

export const isLocationAvailable = (data) => {
  return axios.get(`location_available/${data.placeId }/${data.scheduleId}`)
    .then(response => response.data)
    .catch(error => error)
}

export const reserveLocation = (data) => {
  return axios.post('location', {
    place_id: data.placeId,
    schedule_id: data.scheduleId,
    responsible_id: data.personId
  })
    .then(response => response.data)
    .catch(error => error)
}