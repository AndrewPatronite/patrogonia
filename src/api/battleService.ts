import axios from 'axios';
import { Battle } from '../battle/types';
import { HttpStatus } from './types';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/battle`,
  headers: { 'Content-Type': 'application/json' },
});

export const getBattle = (
  battleId: string,
  onSuccess: (battle: Battle) => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .get(`/get/${battleId}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};

export const takeTurn = (
  battleId: string,
  playerId: number,
  playerAction: string,
  onSuccess: (battle: Battle) => void,
  onFailure: (error: any) => void,
  targetId?: string | number
) => {
  axiosInstance
    .post(
      `/turn/${battleId}?playerId=${playerId}&playerAction=${playerAction}&targetId=${targetId}`
    )
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};
