import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Edit, Eye } from "lucide-react";
import apis from '../../apis.json';
import Loader from '../Loader';
import { useNavigate, useParams } from 'react-router-dom';
const ViewEmpInfo = () => {
    const {id} = useParams();
    const [empInfo, setEmpInfo] = useState([]);
   const [loading, setloading] = useState(true);
   const apis_list = apis;
 
   const fatchEmpInfo = async () => {
     try {
       const res = await axios.post(`${apis_list?.at(0).api_emplpyee.api_info_employee}${id}`);
       console.log(res.data);
       if(res.data.langth === 0 ){
           console.log("Error fetching employee information");
       }
       setloading(false);
       setEmpInfo(res.data);
     } catch (err) {
         console.error("Error fetching employee information:", err);
         setEmpInfo(null);
     }
   }
 
   useEffect(() => {
     
     fatchEmpInfo();
    
   }, [])
 if(loading == true) {
   return (
     <Loader/>
   );
 }


  return (
    <div className="relative overflow-x-auto sm:rounded-lg m-5 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Employee Details:
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
          <p className="text-lg font-medium">{empInfo.first_name || '—'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-lg font-medium">{empInfo.email || '—'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
          <p className="text-lg font-medium">{empInfo.department || '—'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
          <p className="text-lg font-medium">{empInfo.position || '—'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
          <p className="text-lg font-medium">
            {empInfo.hire_date ? new Date(empInfo.hire_date).toLocaleDateString() : '—'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
          <p className={`text-lg font-medium ${
            empInfo.status === 'Active'
                ? 'text-green-600 dark:text-green-400'
                : empInfo.status === 'Inactive'
                ? 'text-red-600 dark:text-red-400'
                : empInfo.status === 'On Leave'
                ? 'text-amber-600 dark:text-amber-400'
                : empInfo.status === 'Terminated'
                ? 'text-gray-600 dark:text-gray-400'
                : 'text-gray-900 dark:text-gray-100' 
            }`}>
            {empInfo.status ? empInfo.status : '-'}
          </p>
        </div>

      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ViewEmpInfo
