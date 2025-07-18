import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import studentApi from '../../api/services/student.api';

const StudentPage = () => {

    const [students,setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const response = await studentApi.getStudents();
            console.log("Students:", response?.students);
            setStudents(response?.students);
        };
        fetchStudents();
    }, []);


  // Column configuration
const columns = [
    {id:'user_id', label: 'Student ID'},
    {id:'full_name', label: 'Name', render: row => `${row.first_name} ${row.last_name}`},
    {id:'email', label: 'Email'},
    {id:'program', label: 'Program'},
];

  // Control functions
  const controls = {
    title: 'Student Management',
    onView: (row) => alert(`Viewing: ${row.name}`),
    onEdit: (row) => alert(`Editing: ${row.name}`),
    onDelete: (row) => {
      if (window.confirm(`Delete ${row.name}?`)) {
        alert(`Deleted: ${row.name}`);
      }
    }
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={students}
        controls={controls}
        onAdd={()=>{alert("add Student")}}
      />
    </div>
  );
};

export default StudentPage;