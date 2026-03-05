import React from 'react';

const labelStyles = "text-sm font-medium text-gray-500 dark:text-gray-400";
const valueStyles = "mt-1 text-lg font-medium text-gray-900 dark:text-gray-100";

const statusColors = {
  Active: 'text-green-600 dark:text-green-400',
  Inactive: 'text-red-600 dark:text-red-400',
  'On Leave': 'text-amber-600 dark:text-amber-400',
  Terminated: 'text-gray-600 dark:text-gray-500',
  default: 'text-gray-900 dark:text-gray-100',
};

export default function EmployeeDetailCard({ employee = "Employee Details" }) {
  if (!employee) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No employee data available
      </div>
    );
  }

  const getStatusClass = (status) => statusColors[status] || statusColors.default;

  // Format date safely
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '—';
    }
  };

  const fields = [
    { label: 'Full Name', value: `${employee.first_name || ''} ${employee.last_name || ''}`.trim() || '—' },
    { label: 'Email', value: employee.email || '—' },
    { label: 'Department', value: employee.department || '—' },
    { label: 'Position', value: employee.position || '—' },
    { label: 'Hire Date', value: formatDate(employee.hire_date) },
    { label: 'Status', value: employee.status || '—', className: getStatusClass(employee.status) },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100"></h2> */}
      </div>

      <div className="p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {fields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <dt className={labelStyles}>{field.label}</dt>
              <dd className={`${valueStyles} ${field.className || ''}`}>
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}