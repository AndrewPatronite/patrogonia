import Player from '../player/Player';

export const isAdjacentToCurrentPlayer = (
    {
        location: {
            columnIndex: currentPlayerColumnIndex,
            rowIndex: currentPlayerRowIndex,
        },
    }: Player,
    targetRowIndex: number,
    targetColumnIndex: number
) =>
    (currentPlayerRowIndex === targetRowIndex ||
        currentPlayerColumnIndex === targetColumnIndex) &&
    Math.abs(currentPlayerRowIndex - targetRowIndex) <= 1 &&
    Math.abs(currentPlayerColumnIndex - targetColumnIndex) <= 1;
