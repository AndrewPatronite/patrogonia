import { Flex, FlexboxProps, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { ErrorLabelColor } from '../theme';

interface LabeledValueProps extends FlexboxProps {
  label: string;
  value?: string | number;
  isDisabled?: boolean;
}

const LabeledValue = ({
  label,
  value,
  isDisabled,
  justifyContent = 'space-between',
  ...rest
}: LabeledValueProps) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      {...rest}
      justifyContent={justifyContent}
      {...(isDisabled && {
        sx: { '.value': { color: ErrorLabelColor[colorMode] } },
      })}
      data-testid="labeled-value"
    >
      <label>{label}</label>
      {value !== undefined ? <span className="value">{value}</span> : null}
    </Flex>
  );
};

export default LabeledValue;
