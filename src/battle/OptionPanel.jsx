import React, { forwardRef, useState } from 'react';
import { inRange } from 'lodash';
import styled from 'styled-components';

const OptionPanelDiv = styled.div`
    display: flex;
    align-items: center;

    .option-select {
        max-height: 90px;
        min-width: 80px;
        color: #606060;
        background-color: #ffffff;
        border-radius: 3px;
    }

    .option-select-selected {
        color: #606060;
        background-color: #aaaaaa;
    }
`;

const OptionPanel = forwardRef(
    (
        {
            options,
            onBack = () => {},
            onChange = (selectedOption) => {},
            onNext,
            showBackButton,
            selectSize = 5,
            showNextButton = true,
            disabled = false,
            initialValue = null,
        },
        ref
    ) => {
        const [selectedValue, setSelectedValue] = useState(
            initialValue || (options[0] && options[0].value) || undefined
        );
        if (initialValue && initialValue !== selectedValue) {
            setSelectedValue(initialValue);
        }

        const handleChange = (selected) => {
            setSelectedValue(selected);
            onChange(selected);
        };

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'Escape':
                case 'Backspace':
                case 'Delete':
                case 'ArrowLeft':
                    showBackButton && onBack();
                    break;
                case 'Enter':
                case 'ArrowRight':
                    selectedValue && onNext(selectedValue);
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                    const optionIndex = parseInt(e.key, 10) - 1;
                    if (inRange(optionIndex, 0, options.length)) {
                        handleChange(options[optionIndex].value);
                    }
                    break;
                default:
                    break;
            }
        };

        return (
            <OptionPanelDiv className="option-panel">
                {showBackButton && (
                    <button
                        className="back-button"
                        onClick={onBack}
                        disabled={disabled}
                    >
                        {'<<'}
                    </button>
                )}
                <select
                    ref={ref}
                    className="option-select"
                    autoFocus={true}
                    value={selectedValue}
                    size={selectSize}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.display}
                        </option>
                    ))}
                </select>
                {showNextButton && (
                    <button
                        className="next-button"
                        onClick={() => onNext(selectedValue)}
                        disabled={disabled}
                    >
                        {'>>'}
                    </button>
                )}
            </OptionPanelDiv>
        );
    }
);

export default OptionPanel;
