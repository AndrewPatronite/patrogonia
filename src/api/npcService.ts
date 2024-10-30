import { HttpStatus } from './types';
import axios from 'axios';
import { Npc } from '../npcs';
import { omit } from 'lodash';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/npc`,
  headers: { 'Content-Type': 'application/json' },
});

export const getNpcs = (
  mapName: string,
  onSuccess: (npcs: Npc[]) => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .get(`/getNpcs/${mapName}`)
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};

export const updateNpc = (
  npc: Npc,
  onSuccess: (updatedNpc: Npc) => void,
  onFailure: (error: any) => void
) => {
  axiosInstance
    .put('/update', omit(npc, 'lastUpdate'))
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};
