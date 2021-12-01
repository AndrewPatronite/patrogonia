import axios from 'axios'
import { HttpStatus } from './HttpStatus'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/player`,
  headers: { 'Content-Type': 'application/json' },
})

export const createAccount = (player, onSuccess, onFailure) => {
  return axiosInstance
    .post('/create', player)
    .then((response) => {
      if (response.status === HttpStatus.Created) {
        getPlayer(response.data, onSuccess, onFailure)
      }
    })
    .catch((error) => onFailure(error))
}

export const login = (username, password, onSuccess, onFailure) => {
  axiosInstance
    .post('/login', { username, password })
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        getPlayer(response.data, onSuccess, onFailure)
      }
    })
    .catch((error) => onFailure(error))
}

export const getPlayer = (playerId, onSuccess, onFailure) => {
  axiosInstance
    .get(`/get/${playerId}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data)
      }
    })
    .catch((error) => onFailure(error))
}

export const getPlayers = (mapName, onSuccess, onFailure) => {
  axiosInstance
    .get(`/getPlayers/${mapName}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data)
      }
    })
    .catch((error) => onFailure(error))
}

export const updatePlayer = (player, onSuccess, onFailure) => {
  axiosInstance
    .put('/update', player)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data)
      }
    })
    .catch((error) => onFailure(error))
}

export const loadSave = (playerId, onSuccess, onFailure) => {
  return axiosInstance
    .put(`/loadSave/${playerId}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess()
      }
    })
    .catch((error) => onFailure(error))
}

export const castSpell = (
  player,
  spellName,
  targetId,
  onSuccess,
  onFailure
) => {
  return axiosInstance
    .put(`/castSpell/${spellName}/${targetId}`, player)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data)
      }
    })
    .catch((error) => onFailure(error))
}
