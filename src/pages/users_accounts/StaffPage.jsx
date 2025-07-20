import { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import staffApi from '../../api/services/staff.api';
import CircularProgress from '@mui/material/CircularProgress';

const StaffPage = () => {
    const [loading, setLoading] = useState(true);
    const [staffs,setStaffs] = useState([]);
    useEffect(() => {
        const fetchStaff = async () => {
            const response = await staffApi.getStaffs();
            if(response.error) {
                console.error("Error fetching staffs:", response.error);
                setStaffs([]);
                setLoading(false);
                return;
            }
            console.log("Staffs:", response?.staffs);
            setStaffs( response?.staffs);
            setLoading(false);
        };
        fetchStaff();
        setLoading(true);
    }, []);


  // Column configuration
const columns = [
    {id:'user_id', label: 'Student ID', width:50},
    {id:'full_name', label: 'Name', render: row => `${row.first_name} ${row.last_name}`},
    {id:'email', label: 'Email'},
    {id:'phone', label: 'Mobile No.'},
    {id:"group_id", label: "Group", render: row => row.group_id ? row.group_id : 'N/A'},
    {id : 'organization_id', label: 'Organization'},
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
        emptyStateComponent={loading ? <CircularProgress /> : "No staffs available"}
      />
    </div>
  );
};

export default StaffPage;