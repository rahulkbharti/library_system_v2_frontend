import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import studentApi from '../../api/services/student.api';
import CircularProgress from '@mui/material/CircularProgress';

const StudentPage = () => {
    const [loading, setLoading] = useState(true);
    const [students,setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const response = await studentApi.getStudents();
            if(response.error) {
                console.error("Error fetching students:", response.error);
                setStudents([]);
                setLoading(false);
                return;
            }
            console.log("Students:", response?.students);
            setStudents(response?.students);
            setLoading(false);
        };
        fetchStudents();
        setLoading(true);
    }, []);


  // Column configuration
const columns = [
    {id:'user_id', label: 'Student ID'},
    {id:'full_name', label: 'Name', render: row => `${row.first_name} ${row.last_name}`},
    {id:'email', label: 'Email'},
    {id:'program', label: 'Program'},
    {id : 'organization_id', label: 'Organization'},
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
        emptyStateComponent={loading ? <CircularProgress /> : "No students available"}
      />
    </div>
  );
};

export default StudentPage;