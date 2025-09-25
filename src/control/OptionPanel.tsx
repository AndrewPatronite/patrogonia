import React, { useCallback, useEffect, useRef, useState } from 'react';
import inRange from 'lodash/inRange';
import List, { ListOption } from './List';
import { Box, BoxProps } from '@chakra-ui/react';
import { advanceFocus } from '../utils';
import { Token } from '@chakra-ui/styled-system/dist/types/utils';
import * as CSS from 'csstype';
import isEqual from 'lodash/isEqual';

export interface OptionPanelProps extends BoxProps {
  options: ListOption[];
  value?: any;
  onBack?: () => void;
  onChange?: (selectedOption: any) => void;
  onNext: (selectedOption: any) => void;
  isBackEnabled: boolean;
  submitOnClick?: 'single' | 'double';
  width?: Token<CSS.Property.Width | number, 'sizes'>;
}

const OptionPanel = ({
  options,
  value,
  onBack = () => {},
  onChange = () => {},
  onNext,
  isBackEnabled,
  submitOnClick = 'double',
  width,
  ...boxProps
}: OptionPanelProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState(
    (options[0] && options[0].value) || null
  );

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = useCallback(
    (selected: any) => {
      setSelectedValue(selected);
      onChange(selected);
    },
    [onChange]
  );

  const submitOption = useCallback(
    (selectedValue: any) => {
      if (
        selectedValue &&
        options.find(
          (option) => isEqual(option.value, selectedValue) && !option.disabled
        )
      ) {
        onNext(selectedValue);
      }
    },
    [onNext, options]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
      case 'Backspace':
      case 'Delete':
        if (isBackEnabled) {
          onBack();
        }
        break;
      case 'Enter':
        submitOption(selectedValue);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        {
          const optionIndex = parseInt(e.key, 10) - 1;
          if (inRange(optionIndex, 0, options.length)) {
            handleChange(options[optionIndex].value);
          }
        }
        break;
      default:
        break;
    }
    if (e.key != 'Tab') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      advanceFocus(listRef.current);
    }
  });

  return (
    <Box onKeyDown={handleKeyDown} {...boxProps}>
      <List
        ref={listRef}
        options={options}
        value={selectedValue}
        onChange={handleChange}
        submitOnClick={submitOnClick}
        onSubmit={(selection) => {
          handleChange(selection);
          submitOption(selection);
        }}
        size="sm"
        tabIndex={0}
        width={width}
      />
    </Box>
  );
};

export default OptionPanel;
