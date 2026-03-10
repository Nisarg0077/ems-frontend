// src/components/forms/AddDataForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddDataForm = ({
  initialData = {},           // pre-filled values when editing
  onSubmit,                   // required: function to call when form is submitted
  onCancel,                   // optional: function for cancel/back
  title = "Add New Record",
  submitLabel = "Save",
  cancelLabel = "Cancel",
  fields = [],                // array of field definitions
  isLoading = false,
  errorMessage = '',
  className = '',
}) => {
  const [formData, setFormData] = useState(initialData);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFieldInvalid = (field) => {
    if (!field.required) return false;
    if (touched[field.name] && !formData[field.name]) return true;
    return false;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {title}
        </h2>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={field.required}
                  disabled={isLoading}
                  className={`px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isFieldInvalid(field)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={field.required}
                  disabled={isLoading}
                  rows={field.rows || 4}
                  className={`px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y ${
                    isFieldInvalid(field)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={field.required}
                  disabled={isLoading}
                  placeholder={field.placeholder || ''}
                  className={`px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isFieldInvalid(field)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              )}

              {isFieldInvalid(field) && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {field.label} is required
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg shadow transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : submitLabel}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors disabled:opacity-60"
            >
              {cancelLabel}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

AddDataForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
      placeholder: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })),
      rows: PropTypes.number, // for textarea
    })
  ),
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
};

export default AddDataForm;
