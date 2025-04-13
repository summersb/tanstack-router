import React from 'react'
import type {FieldApi} from '@tanstack/form-core'

type FormInputFieldProps<TFieldValue> = {
  label: string
  // @ts-ignore
  field: FieldApi<TFieldValue, any, any>
  type?: string
  className?: string
}

const FormInputField = <TFieldValue, >({
                                         label,
                                         field,
                                         type = 'text',
                                         className = '',
                                       }: FormInputFieldProps<TFieldValue>): React.ReactElement => {
  return (
    <div className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className={`mt-1 px-3 py-2 border rounded w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      {field.state.meta.touchedErrors && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          {field.state.meta.touchedErrors}
        </p>
      )}
    </div>
  )
}

export default FormInputField
