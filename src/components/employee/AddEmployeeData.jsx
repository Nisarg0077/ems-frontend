import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddDataForm from '../ui/AddDataForm';
import apis from '../../apis.json';
import axios from 'axios';


const AddEmployeeData = () => {
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employeeFields = [
    { name: 'first_name', label: 'First Name', required: true },
    { name: 'last_name', label: 'Last Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone No.', type: 'number', required: true },
    { name: 'department_name', label: 'Department', type: 'select', required: true,
      options: [
        { value: 'IT', label: 'IT' },
        { value: 'Human Resources', label: 'Human Resources' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Operations', label: 'Operations' },
      ]
     },
    {
      name: 'position',
      label: 'Position',
      type: 'select',
      required: true,
      options: [
        { value: 'Software Engineer', label: 'Software Engineer' },
        { value: 'Senior Developer', label: 'Senior Developer' },
        { value: 'Team Lead', label: 'Team Lead' },
        { value: 'HR Manager', label: 'HR Manager' },
      ],
    },
    { name: 'salary', label: 'Salary', type: 'number', required: true },
    { name: 'hire_date', label: 'Hire Date', type: 'date', required: true },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
      ],
    },
  ];



// useEffect(() => {
//   employeeFieldsData();
// }, [])


  // const handleSubmit = async (data) => {
  //   setIsSubmitting(true);
    
  //   try {
      
      
  //     const apiUrl = apis[0]?.api_emplpyee?.api_add_emp;
  //     const res = await axios.post(apiUrl, data);
      
  //     console.log(res.data);
  //     console.log('Submitting employee data:', data);
  //     // If success → redirect or show success message
  //     navigate('/employees');           // or wherever your list is
  //   } catch (error) {
  //     console.error('Failed to add employee:', error);
  //     // You can also set an error state here and pass it to AddDataForm
  //     alert('Failed to add employee. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleSubmit = async (data) => {
  setIsSubmitting(true);

  console.log("→→→ DATA BEING SENT TO BACKEND:", JSON.stringify(data, null, 2));

  try {
    const apiUrl = apis[0]?.api_emplpyee?.api_add_emp;
    console.log("→→→ API URL:", apiUrl);

    const res = await axios.post(apiUrl, data);

    console.log("→→→ SUCCESS RESPONSE:", res.data);
    navigate('/employees');
  } catch (error) {
    console.error("→→→ FULL ERROR OBJECT:", error);

    if (error.response) {
      // This is the most important part!
      console.log("→→→ SERVER RESPONSE (400 details):", error.response.data);
      console.log("→→→ STATUS:", error.response.status);
      console.log("→→→ HEADERS:", error.response.headers);
    }

    alert('Failed to add employee: ' + (error.response?.data?.message || error.message));
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <AddDataForm
        title="Add New Employee"
        fields={employeeFields}
        initialData={{status: 'Active' }}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AddEmployeeData;