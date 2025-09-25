import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, SelectProps, Stack, Text } from '@chakra-ui/react';
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
  submitOnClick?: 'single' | 'double';
  onSubmit?: (value: any) => void;
}

const List = forwardRef(
  (
    {
      options,
      onChange,
      submitOnClick,
      height,
      width,
      value,
      size,
      onSubmit = () => {},
    }: ListProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const currentButtonRef = useRef<HTMLButtonElement>(null);
    const [listHasFocus, setListHasFocus] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const valueIndex = getValueIndex(options, value);

    const choosePreviousEntry = useCallback(
      (e: React.KeyboardEvent) => {
        const newIndex = valueIndex - 1;
        onChange(options[newIndex].value);
        e.preventDefault();
      },
      [onChange, options, valueIndex]
    );

    const chooseNextEntry = useCallback(
      (e: React.KeyboardEvent) => {
        const newIndex = valueIndex + 1;
        onChange(options[newIndex].value);
        e.preventDefault();
      },
      [onChange, options, valueIndex]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
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
      },
      [chooseNextEntry, choosePreviousEntry, options.length, valueIndex]
    );

    useEffect(() => {
      if (currentButtonRef?.current) {
        currentButtonRef.current.focus();
      }
    }, [value, currentButtonRef]);

    const handleClick = useCallback(
      (disabled: boolean, optionValue: any, isSelectedEntry: boolean) => {
        if (!disabled && submitOnClick === 'single') {
          onSubmit(optionValue);
          setShowConfirmation(false);
        } else if (!disabled && isSelectedEntry && submitOnClick === 'double') {
          onSubmit(optionValue);
          setShowConfirmation(false);
        } else {
          onChange(optionValue);
          setShowConfirmation(!disabled);
        }
      },
      [onChange, onSubmit, submitOnClick]
    );

    return (
      <Stack alignItems="center">
        <Stack
          data-testid="list"
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
          {options.map(
            ({ value: optionValue, display, disabled = false }, index) => {
              const isSelectedEntry = index === valueIndex;
              const isTabEnabled =
                isSelectedEntry || (index === 0 && valueIndex === -1);

              return (
                <Button
                  data-testid={
                    typeof optionValue === 'object' ? `${display}` : optionValue
                  }
                  id={`${display}-${index}`}
                  ref={
                    listHasFocus && isSelectedEntry ? currentButtonRef : null
                  }
                  tabIndex={isTabEnabled ? 0 : -1}
                  key={`${display}-${index}`}
                  colorScheme={
                    disabled ? 'gray' : isSelectedEntry ? 'blue' : undefined
                  }
                  variant={
                    disabled ? 'solid' : isSelectedEntry ? 'outline' : 'ghost'
                  }
                  {...(disabled && { textColor: 'gray' })}
                  {...(disabled && index > 0 && { marginTop: '3px' })}
                  cursor={disabled ? 'not-allowed' : 'pointer'}
                  borderRadius={0}
                  width={width}
                  onClick={() => {
                    handleClick(disabled, optionValue, isSelectedEntry);
                  }}
                  onKeyDown={handleKeyDown}
                  fontWeight="normal"
                  size={size}
                >
                  {display}
                </Button>
              );
            }
          )}
        </Stack>
        {submitOnClick === 'double' && showConfirmation && (
          <Text fontSize="xs">Click twice to confirm</Text>
        )}
      </Stack>
    );
  }
);

List.displayName = 'List';

export default List;
