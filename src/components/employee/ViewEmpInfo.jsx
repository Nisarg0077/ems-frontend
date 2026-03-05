import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader';         
import EmployeeDetailCard from '../ui/EmployeeDetailCard'; 
import apis from '../../apis.json';

export default function ViewEmpInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = apis?.[0].api_emplpyee?.api_info_employee;
        if (!apiUrl) throw new Error("API endpoint not configured");

        const res = await axios.post(`${apiUrl}${id}`);

        // Most APIs return object directly or { data: {...} }
        const empData = res.data?.data || res.data;

        if (!empData || typeof empData !== 'object' || Array.isArray(empData)) {
          throw new Error("Unexpected employee data format");
        }

        setEmployee(empData);
      } catch (err) {
        console.error("Failed to load employee:", err);
        setError("Could not load employee information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-svh bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Employee Profile
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        <EmployeeDetailCard employee={employee} />

        {/* You can easily add more cards / sections later */}
        {/* <div className="mt-8">
          <EmployeeDetailCard employee={someOtherData} title="Employment History" />
        </div> */}
      </div>
    </div>
  );
}