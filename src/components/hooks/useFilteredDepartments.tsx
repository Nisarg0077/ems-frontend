import { useMemo } from 'react';

type Department = {
  name: string;
  location: string;
};

type FilterState = {
  selectedDepartmentName: string;
  searchLocation: string;

};

export function useFilteredDepartment(
  department: Department[],
  filters: FilterState
) {
  const {
    selectedDepartmentName,
    searchLocation,
  } = filters;

  return useMemo(() => {
    return department.filter((dept) => {
      // Department Name search
      const nameMatch = selectedDepartmentName === 'none' || dept.name === selectedDepartmentName;

      // Location
       const location = `${dept.location || ''}`.toLowerCase();
      const searchTerm = searchLocation.trim().toLowerCase();
      const locationMatch = !searchTerm || location.includes(searchTerm);


      return nameMatch && locationMatch;
    });
  }, [department, selectedDepartmentName, searchLocation]);
}