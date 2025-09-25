import { Text } from '@chakra-ui/react';
import { OptionPanel } from '../control';
import React, { useMemo } from 'react';
import upperFirst from 'lodash/upperFirst';

interface ReturnOptionsProps {
  visitedTowns: string[];
  onTownBack: () => void;
  onTownNext: (town: string) => void;
}

const ReturnOptions = ({
  visitedTowns,
  onTownBack,
  onTownNext,
}: ReturnOptionsProps) => {
  const townOptions = useMemo(
    () =>
      visitedTowns.map((townName) => ({
        value: townName,
        display: upperFirst(townName.toLowerCase()),
      })),
    [visitedTowns]
  );

  return (
    <>
      <Text>Return to</Text>
      <OptionPanel
        options={townOptions}
        value={townOptions[0].value}
        isBackEnabled={true}
        onBack={onTownBack}
        onNext={onTownNext}
        width="8rem"
        justifyItems="center"
        submitOnClick="single"
      />
    </>
  );
};

export default ReturnOptions;
