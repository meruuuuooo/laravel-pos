import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput(
    { label, options = [], className = '', isFocused = false, ...props },
    ref,
) {
    const selectRef = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            selectRef.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={selectRef}
        >
            <option value={label}>{label || 'Select an option'}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});
