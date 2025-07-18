import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import staffApi from '../../api/services/staff.api';
import { width } from '@mui/system';

const StaffPage = () => {

    const [staffs,setStaffs] = useState([]);
    useEffect(() => {
        const fetchStaff = async () => {
            const response = await staffApi.getStaffs();
            console.log("Staffs:", response?.staffs);
            setStaffs( response?.staffs);
        };
        fetchStaff();
    }, []);


  // Column configuration
const columns = [
    {id:'user_id', label: 'Student ID', width:50},
    {id:'full_name', label: 'Name', render: row => `${row.first_name} ${row.last_name}`},
    {id:'email', label: 'Email'},
    {id:'phone', label: 'Mobile No.'},
    {id:"group_id", label: "Group"},
];

  // Control functions
  const controls = {
    title: 'Staff Management',
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
        data={staffs}
        controls={controls}
        onAdd={()=>{alert("add Student")}}
      />
    </div>
  );
};

export default StaffPage;