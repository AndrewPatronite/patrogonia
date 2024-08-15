import axios from 'axios';
import { Player } from '../player';
import { HttpStatus } from './types';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/player`,
  headers: { 'Content-Type': 'application/json' },
});

export const createAccount = (
  player: Partial<Player>,
  onSuccess: (createdPlayer: Player) => void,
  onFailure: (error: any) => void
) => {
  return axiosInstance
    .post('/create', player)
    .then((response) => {
      if (response.status === HttpStatus.Created) {
        getPlayer(response.data, onSuccess, onFailure);
      }
    })
    .catch((error) => onFailure(error));
};

export const login = (
  username: string,
  password: string,
  onSuccess: (loggedInPlayer: Player) => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .post('/login', { username, password })
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        getPlayer(response.data, onSuccess, onFailure);
      }
    })
    .catch((error) => onFailure(error));
};

export const getPlayer = (
  playerId: number,
  onSuccess: (player: Player) => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .get(`/get/${playerId}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};

export const getPlayers = (
  mapName: string,
  onSuccess: (players: Player[]) => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .get(`/getPlayers/${mapName}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};

export const updatePlayer = (
  player: Partial<Player>,
  saveGame: boolean,
  onSuccess: (updatedPlayer: Player) => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .put(`/update/${saveGame}`, player)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};

export const loadSave = (
  playerId: number,
  onSuccess: () => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .put(`/loadSave/${playerId}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess();
      }
    })
    .catch((error) => onFailure(error));
};

export const castSpell = (
  player: Partial<Player>,
  spellName: string,
  targetId: string,
  onSuccess: (updatedPlayer: Player) => void,
  onFailure: (error: any) => void
) => {
  return axiosInstance
    .put(`/castSpell/${spellName}/${targetId}`, player)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};
