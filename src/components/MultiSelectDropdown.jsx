import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

function MultiSelectDropdown({
  id,
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  disabled = false,
  emptyMessage = "No options available",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleValue = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
      return;
    }

    onChange([...selectedValues, value]);
  };

  const summary =
    selectedValues.length > 0
      ? selectedValues.join(", ")
      : placeholder;

  return (
    <div
      className="multi-dropdown"
      ref={dropdownRef}
    >
      <button
        type="button"
        id={id}
        className={`multi-dropdown-trigger ${
          isOpen ? "is-open" : ""
        }`}
        onClick={() => setIsOpen((current) => !current)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span
          className={
            selectedValues.length > 0
              ? "multi-dropdown-summary"
              : "multi-dropdown-placeholder"
          }
        >
          {summary}
        </span>

        <FaChevronDown />
      </button>

      {isOpen && (
        <div
          className="multi-dropdown-panel"
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={id}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <label
                className="multi-dropdown-option"
                key={option.value}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleValue(option.value)}
                />

                <span className="multi-dropdown-check">
                  <FaCheck />
                </span>

                <span>{option.label}</span>
              </label>
            ))
          ) : (
            <p className="multi-dropdown-empty">
              {emptyMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
