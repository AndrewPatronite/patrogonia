import { Legend } from '../../maps/Legend';
import inRange from 'lodash/inRange';
import isEqual from 'lodash/isEqual';
import { LandColors } from '../tiles/terrain';
import { MapLayout } from '../../maps';

const getMapSymbol = (
  mapLayout: MapLayout,
  rowIndex: number,
  columnIndex: number
) => {
  return inRange(rowIndex, mapLayout.length) &&
    inRange(columnIndex, mapLayout[rowIndex].length)
    ? mapLayout[rowIndex][columnIndex]
    : undefined;
};

const isWater = (symbol?: string) => isEqual(Legend.symbols.WATER, symbol);

export const landBorderRadius = '0.4375rem';

export const getLandBorderStyles = (
  mapSymbol: string,
  mapLayout: MapLayout,
  rowIndex: number,
  columnIndex: number
) => {
  const borderClasses: {
    borderTopWidth?: number;
    borderTopColor?: string;
    borderLeftWidth?: number;
    borderLeftColor?: string;
    borderRightWidth?: number;
    borderRightColor?: string;
    borderBottomWidth?: number;
    borderBottomColor?: string;
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
    borderBottomLeftRadius?: string;
    borderBottomRightRadius?: string;
  } = {};
  const isCurrentSymbolLand = !isWater(mapSymbol);
  if (isCurrentSymbolLand) {
    const hasWaterAbove = isWater(
      getMapSymbol(mapLayout, rowIndex - 1, columnIndex)
    );
    const hasWaterToTheLeft = isWater(
      getMapSymbol(mapLayout, rowIndex, columnIndex - 1)
    );
    const hasWaterToTheRight = isWater(
      getMapSymbol(mapLayout, rowIndex, columnIndex + 1)
    );
    const hasWaterBelow = isWater(
      getMapSymbol(mapLayout, rowIndex + 1, columnIndex)
    );
    if (hasWaterAbove) {
      borderClasses.borderTopWidth = 2;
      borderClasses.borderTopColor = LandColors.WetSand;
      if (hasWaterToTheLeft) {
        borderClasses.borderTopLeftRadius = landBorderRadius;
      }
      if (hasWaterToTheRight) {
        borderClasses.borderTopRightRadius = landBorderRadius;
      }
    }
    if (hasWaterToTheLeft) {
      borderClasses.borderLeftWidth = 2;
      borderClasses.borderLeftColor = LandColors.WetSand;
    }
    if (hasWaterToTheRight) {
      borderClasses.borderRightWidth = 2;
      borderClasses.borderRightColor = LandColors.WetSand;
    }
    if (hasWaterBelow) {
      borderClasses.borderBottomWidth = 2;
      borderClasses.borderBottomColor = LandColors.WetSand;
      if (hasWaterToTheLeft) {
        borderClasses.borderBottomLeftRadius = landBorderRadius;
      }
      if (hasWaterToTheRight) {
        borderClasses.borderBottomRightRadius = landBorderRadius;
      }
    }
  }
  return borderClasses;
};
