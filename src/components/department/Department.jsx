import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Edit, Eye, Table } from "lucide-react";
import apis from '../../apis.json';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { useFilteredDepartment } from '../hooks/useFilteredDepartments';


const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setloading] = useState(true);
  const [departmentSelectedName, setDepartmentSelectedName] = useState('none');
  const [departmentSearchLocation, setDepartmentSearchLocation] = useState('');
  const navigate = useNavigate();
  const apis_list = apis;

  const filteredDepartments = useFilteredDepartment(departments, {
    selectedDepartmentName: departmentSelectedName,
    searchLocation: departmentSearchLocation
  })

   const fatchDepartments = async () => {
     try {
       const res = await axios.post(apis_list?.at(0).api_department.api_department_list);
       if(res.data.langth === 0 ){
           console.log("Error fetching departments");
       }
       setloading(false);
       setDepartments(res.data);
     } catch (err) {
         console.error("Error fetching departments:", err);
         setDepartments([]);
         setloading(true);
     }
   }


   const handleSelectedDepartment = (event) => {
    setDepartmentSelectedName(event.target.value);
   }

   const handleSearchedLocationt = (event) => {
    setDepartmentSearchLocation(event.target.value);
   }
 
   useEffect(() => {
     
     fatchDepartments();
    
   }, [])
   

 if(loading == true) {
   return (
     <Loader/>
   );
 }
 
 
   return (
     <div className='p-4'>
       <div className='p-2 m-1'>
          <h1 className="text-2xl font-bold">All Employees List</h1>
        </div>

 
      <div className="relative overflow-x-auto shadow-2xl border border-white/10 sm:rounded-lg backdrop-blur-sm bg-white/5">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-white/10 text-gray-200">
            <tr>
              <th className="px-6 py-3">
                <div className='p-1'>
                  Name
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

                    value={departmentSelectedName} onChange={handleSelectedDepartment}
                  >
                    <option className='bg-black' value="none">none</option>
                    {
                      departments.length > 0 ? (
                        departments.map((dept) => (
                          <option className='bg-black' value={dept.name}>{dept.name}</option>
                        ))
                      ):("Not found")
                    }
                  </select>

                </div>
              </th>
              <th className="px-6 py-3" >
                    <div className='p-1'>
                    Location
                    </div>

                    <div>
                      <input 
                      className='bg-transparent p-2 border border-blue-500 rounded-md outline-none text-white placeholder-white/50' 
                      type="text" 
                      placeholder='Search Location'
                      value={departmentSearchLocation} onChange={handleSearchedLocationt}
                    />
                    </div>
                </th>
              {/* <th className="px-6 py-3">
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
                  >
                    <option className='bg-black' value="none">none</option>
                    {
                      departments.length > 0 ? (
                        departments.map((dept, index) => (
                          <option className='bg-black' value={dept.department}>{dept.department}</option>
                        ))
                      ):("Not found")
                    }
                  </select>
                
                </div>  
              </th> */}
              {/* <th className="px-6 py-3">
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
                  >
                    <option className='bg-black' value="none">none</option>
                    {
                      employees.length > 0 ? (
                        employees.map((emp, index) => (
                          <option className='bg-black' value={emp.position}>{emp.position}</option>
                        ))
                      ):("Not found")
                    }
                  </select>
                
                </div> 
              </th> */}
              
              {/* <th className="px-6 py-3">
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
                  >
                    <option className='bg-black' value="none">none</option>
                    <option className='bg-black' value="Active">Active</option>
                    <option className='bg-black' value="Inactive">Inactive</option>
                  </select>
                
                </div> </th> */}
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{dept.name}</td>
                  <td className="px-6 py-4">{dept.location}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button onClick={() => navigate(`/dept/${dept.id}`)} className="hover:scale-110 transition-transform">
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

export default Department
