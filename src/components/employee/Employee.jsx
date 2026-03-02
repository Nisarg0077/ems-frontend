import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Edit, Eye, Search } from "lucide-react";
import apis from '../../apis.json';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { useFilteredEmployees } from '../hooks/useFilteredEmployees';


const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDepartmentValue, setSelectedDepartmentValue] = useState('none');
  const [selectedPositionValue, setSelectedPositionValue] = useState('none');
  const [employeeSearchedName, setemployeeSearchedName] = useState('');
  const [selectedEmployeeStatus, setselectedEmployeeStatus] = useState('none');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const filteredEmployees = useFilteredEmployees(employees, {
    searchName: employeeSearchedName,
    department: selectedDepartmentValue,
    position: selectedPositionValue,
    status: selectedEmployeeStatus,
  });


  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const apiUrl = apis[0]?.api_emplpyee?.api_employee_list;
      const res = await axios.post(apiUrl);

      if (!res.data || res.data.length === 0) {
          console.log("No employees found");
      }
      
      setEmployees(res.data);
    } catch (err) {
        console.error("Error fetching employees:", err);
        setEmployees([]);
    } finally {
        setLoading(false); // Always stop loading regardless of success/fail
    }
  }

  const handleEmployeeSearchedName = (event) => {
    setemployeeSearchedName(event.target.value);
  }

  const handleSelectedDepartment = (event) => {
    setSelectedDepartmentValue(event.target.value);
  }

  const handleSelectedPosition = (event) => {
    setSelectedPositionValue(event.target.value);
  }
  const handleSelectedEmployeeStatus = (event) => {
    setselectedEmployeeStatus(event.target.value);
  }


  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='p-4 '>
      <div className='p-2 m-1'>
        <h1 className="text-2xl font-bold">All Employees List</h1>
      </div>

      {/* Table Section */}
      <div className="relative overflow-x-auto shadow-2xl border border-white/10 sm:rounded-lg backdrop-blur-sm bg-white/5">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-white/10 text-gray-200">
            <tr>
              <th className="px-6 py-3">
                <div className='p-1'>
                  Name
                </div>
                <div>
                <input 
            className='bg-transparent p-2 border border-blue-500 rounded-md outline-none text-white placeholder-white/50' 
            type="text" 
            placeholder='Search Employee'
            value={employeeSearchedName} onChange={handleEmployeeSearchedName}
          />
          </div>
              </th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">
                <div className='p-1'>
                Department

                </div>
                <div>

                  <select 
                    className='
                      border border-blue-600 
                      rounded-md 
                      p-2 
                      text-white
                      cursor-pointer
                    ' 
                    name="department"
                     value={selectedDepartmentValue} onChange={handleSelectedDepartment}
                  >
                    <option className='bg-black' value="none">none</option>
                    {
                      employees.length > 0 ? (
                        employees.map((emp) => (
                          <option className='bg-black' value={emp.department}>{emp.department}</option>
                        ))
                      ):("Not found")
                    }
                  </select>
                
                </div>  
              </th>
              <th className="px-6 py-3">
                <div className='p-1'>
                Position
                </div>
                <div>

                  <select 
                    className='
                      border border-blue-600 
                      rounded-md 
                      p-2 
                      text-white
                      cursor-pointer
                    ' 
                    name="Position"
                    value={selectedPositionValue} onChange={handleSelectedPosition}
                  >
                    <option className='bg-black' value="none">none</option>
                    {
                      employees.length > 0 ? (
                        employees.map((emp) => (
                          <option className='bg-black' value={emp.position}>{emp.position}</option>
                        ))
                      ):("Not found")
                    }
                  </select>
                
                </div> 
              </th>
              <th className="px-6 py-3">Hire Date</th>
              <th className="px-6 py-3">
                <div className='p-1'>
                Status
                </div>
                <div>

                  <select 
                    className='
                      border border-blue-600 
                      rounded-md 
                      p-2 
                      text-white
                      cursor-pointer
                    ' 
                    name="Status"
                    value={selectedEmployeeStatus} onChange={handleSelectedEmployeeStatus}
                  >
                    <option className='bg-black' value="none">none</option>
                    <option className='bg-black' value="Active">Active</option>
                    <option className='bg-black' value="Inactive">Inactive</option>
                  </select>
                
                </div> </th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr className="border-b border-white/5 hover:bg-white/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{emp.first_name} {emp.last_name}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4">{emp.department}</td>
                  <td className="px-6 py-4">{emp.position}</td>
                  <td className="px-6 py-4">{emp.hire_date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full ${emp.status == "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400" }  text-xs`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button onClick={() => navigate(`/emp/${emp.id}`)} className="hover:scale-110 transition-transform">
                      <Eye size={18} className='text-blue-400'/>
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <Edit size={18} className='text-amber-400'/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">No Employees Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee;