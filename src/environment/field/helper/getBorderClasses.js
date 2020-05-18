import { Legend } from '../../maps/Legend';
import { inRange, isEqual } from 'lodash';

const getMapSymbol = (mapLayout, rowIndex, columnIndex) => {
    return inRange(rowIndex, mapLayout.length) &&
        inRange(columnIndex, mapLayout[rowIndex].length)
        ? mapLayout[rowIndex][columnIndex]
        : undefined;
};

const isWater = (symbol) => isEqual(Legend.symbols.WATER, symbol);

export const getBorderClasses = (
    mapSymbol,
    mapLayout,
    rowIndex,
    columnIndex
) => {
    let borderClasses = '';
    const isCurrentSymbolLand = !isWater(mapSymbol);
    if (isCurrentSymbolLand) {
        if (isWater(getMapSymbol(mapLayout, rowIndex - 1, columnIndex))) {
            borderClasses = borderClasses.concat(' water-above');
        }
        if (isWater(getMapSymbol(mapLayout, rowIndex, columnIndex - 1))) {
            borderClasses = borderClasses.concat(' water-left');
        }
        if (isWater(getMapSymbol(mapLayout, rowIndex, columnIndex + 1))) {
            borderClasses = borderClasses.concat(' water-right');
        }
        if (isWater(getMapSymbol(mapLayout, rowIndex + 1, columnIndex))) {
            borderClasses = borderClasses.concat(' water-below');
        }
    }
    return borderClasses;
};
