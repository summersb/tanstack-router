import React from 'react'

type SelectProps = {
  label?: string
  value: string | number
  onChange: (value: string) => void
  options: Array<{ value: string | number; label?: string }>
  className?: string
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, className }) => {
  return (
    <div>
      {label && <label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-2 py-1 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label ?? opt.value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
