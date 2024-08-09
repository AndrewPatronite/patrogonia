import React, { forwardRef, Ref, useState } from 'react';
import { Button, SelectProps, Stack } from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';

const getValueIndex = (options: any[], value: any) =>
  options.findIndex((option) => isEqual(option.value, value));

export interface ListOption {
  value: any;
  display: string;
  disabled?: boolean;
}

interface ListProps extends SelectProps {
  value: any;
  options: ListOption[];
  onChange: (value: any) => void;
}

const List = forwardRef(
  (
    { options, onChange, height, width, value, size }: ListProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const [listHasFocus, setListHasFocus] = useState(false);
    const valueIndex = getValueIndex(options, value);

    const choosePreviousEntry = (e: React.KeyboardEvent) => {
      const newIndex = valueIndex - 1;
      onChange(options[newIndex].value);
      e.preventDefault();
    };

    const chooseNextEntry = (e: React.KeyboardEvent) => {
      const newIndex = valueIndex + 1;
      onChange(options[newIndex].value);
      e.preventDefault();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (valueIndex > 0) {
            choosePreviousEntry(e);
          }
          break;
        case 'ArrowDown':
          if (valueIndex < options.length - 1) {
            chooseNextEntry(e);
          }
          break;
        default:
          break;
      }
    };

    const handleClick = (selectedValue: any) => {
      onChange(selectedValue);
    };

    return (
      <Stack
        role="listbox"
        ref={ref}
        borderWidth={1}
        height={height}
        onFocus={() => {
          setListHasFocus(true);
          if (valueIndex === -1) {
            onChange(options[0].value);
          }
        }}
        onBlur={() => setListHasFocus(false)}
        spacing={0}
      >
        {options.map(({ value: optionValue, display, disabled }, index) => {
          const isSelectedEntry = index === valueIndex;
          const isTabEnabled =
            isSelectedEntry || (index === 0 && valueIndex === -1);
          return (
            <Button
              id={`${display}-${index}`}
              isDisabled={disabled}
              ref={(entry) => listHasFocus && isSelectedEntry && entry?.focus()}
              tabIndex={isTabEnabled ? 0 : -1}
              key={`${display}-${index}`}
              colorScheme={isSelectedEntry ? 'blue' : undefined}
              variant={isSelectedEntry ? 'outline' : 'ghost'}
              borderRadius={0}
              width={width}
              onClick={() => handleClick(optionValue)}
              onKeyDown={handleKeyDown}
              fontWeight="normal"
              size={size}
            >
              {display}
            </Button>
          );
        })}
      </Stack>
    );
  }
);

export default List;
