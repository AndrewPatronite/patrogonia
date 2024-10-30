import React, { useEffect, useRef, useState } from 'react';
import inRange from 'lodash/inRange';
import List, { ListOption } from '../control/List';
import { Box } from '@chakra-ui/react';
import { advanceFocus } from '../utils';

export interface OptionPanelProps {
  options: ListOption[];
  onBack?: () => void;
  onChange?: (selectedOption: any) => void;
  onNext: (selectedOption: any) => void;
  isBackEnabled: boolean;
}

const OptionPanel = ({
  options,
  onBack = () => {},
  onChange = () => {},
  onNext,
  isBackEnabled,
}: OptionPanelProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState(
    (options[0] && options[0].value) || undefined
  );

  const handleChange = (selected: any) => {
    setSelectedValue(selected);
    onChange(selected);
  };

  const submitOption = (selectedValue: any) => {
    if (selectedValue) {
      onNext(selectedValue);
    }
  };

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
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (listRef.current) {
      advanceFocus(listRef.current);
    }
  });

  return (
    <Box onKeyDown={handleKeyDown}>
      <List
        ref={listRef}
        options={options}
        value={selectedValue}
        onChange={handleChange}
        onDoubleClick={(selection) => {
          handleChange(selection);
          submitOption(selection);
        }}
        size="sm"
        tabIndex={0}
      />
    </Box>
  );
};

export default OptionPanel;
