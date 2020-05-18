import axios from 'axios';
import HttpStatus from './HttpStatus';

const axiosInstance = axios.create({
    baseURL: '/battle',
    headers: { 'Content-Type': 'application/json' },
});

export const getBattle = (battleId, onSuccess, onFailure) => {
    axiosInstance
        .get(`/get/${battleId}`)
        .then((response) => {
            if (response.status === HttpStatus.OK) {
                onSuccess(response.data);
            }
        })
        .catch((error) => onFailure(error));
};

export const takeTurn = (
    battleId,
    playerId,
    playerAction,
    targetId,
    onSuccess,
    onFailure
) => {
    axiosInstance
        .post(
            `/turn/${battleId}?playerId=${playerId}&playerAction=${playerAction}&targetId=${targetId}`
        )
        .then((response) => {
            if (response.status === HttpStatus.OK) {
                onSuccess(response.data);
            }
        })
        .catch((error) => onFailure(error));
};
