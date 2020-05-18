import React, { useState } from 'react';

const OptionPanel = ({
    options,
    onBack,
    onChange = () => {},
    onNext,
    showBackButton,
}) => {
    const [selectedValue, setSelectedValue] = useState(
        (options[0] && options[0].value) || undefined
    );

    const handleChange = (selected) => {
        setSelectedValue(selected);
        onChange(selected);
    };

    return (
        <div className="option-panel">
            {showBackButton && <button onClick={onBack}>{'<<'}</button>}
            <select
                className="option-select"
                autoFocus={true}
                value={selectedValue}
                size={options.length}
                onChange={(e) => handleChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.display}
                    </option>
                ))}
            </select>
            <button onClick={() => onNext(selectedValue)}>{'>>'}</button>
        </div>
    );
};

export default OptionPanel;
