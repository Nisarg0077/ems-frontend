import { useMemo } from 'react';

type Employee = {
  id?: string | number;
  first_name: string;
  last_name: string;
  email?: string;
  department?: string;
  position?: string;
  hire_date?: string;
  status?: string;
};

type FilterState = {
  searchName: string;
  department: string;
  position: string;
  status: string;
};

export function useFilteredEmployees(
  employees: Employee[],
  filters: FilterState
) {
  const {
    searchName,
    department,
    position,
    status,
  } = filters;

  return useMemo(() => {
    return employees.filter((emp) => {
      // Name search
      const fullName = `${emp.first_name || ''} ${emp.last_name || ''}`.toLowerCase();
      const searchTerm = searchName.trim().toLowerCase();
      const nameMatch = !searchTerm || fullName.includes(searchTerm);

      // Department
      const deptMatch = department === 'none' || emp.department === department;

      // Position
      const posMatch = position === 'none' || emp.position === position;

      // Status
      const statusMatch = status === 'none' || emp.status === status;

      return nameMatch && deptMatch && posMatch && statusMatch;
    });
  }, [employees, searchName, department, position, status]);
}