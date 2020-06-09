import React, { useState } from 'react';
import { inRange } from 'lodash';

const OptionPanel = ({
    options,
    onBack = () => {},
    onChange = () => {},
    onNext,
    showBackButton,
    selectSize = 5,
}) => {
    const [selectedValue, setSelectedValue] = useState(
        (options[0] && options[0].value) || undefined
    );

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
        <div className="option-panel">
            {showBackButton && <button className="back-button" onClick={onBack}>{'<<'}</button>}
            <select
                className="option-select"
                autoFocus={true}
                value={selectedValue}
                size={selectSize}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.display}
                    </option>
                ))}
            </select>
            <button className="next-button" onClick={() => onNext(selectedValue)}>{'>>'}</button>
        </div>
    );
};

export default OptionPanel;
