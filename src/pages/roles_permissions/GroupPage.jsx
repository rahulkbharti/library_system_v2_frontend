import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import groupApi from '../../api/services/group.api';
import CircularProgress from '@mui/material/CircularProgress';

const GroupPage = () => {
    const [loading, setLoading] = useState(true);
    const [groups,setGroups] = useState([]);
    useEffect(() => {
        const fetchGroups = async () => {
            const response = await groupApi.getGroups();
            if(response.error) {
                console.error("Error fetching groups:", response.error);
                setGroups([]);
                setLoading(false);
                return;
            }
            console.log("Groups:", response?.groups);
            setGroups(response?.groups);
            setLoading(false);
        };
        fetchGroups();
        setLoading(true);
    }, []);


  // Column configuration
const columns = [
    {id:'id', label: 'Group ID', width:50},
    {id:"name", label:"Group Name"},  
    {id:'description', label: 'Description'},
    {id:'organization_id', label: 'Organization'},
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
        data={groups}
        controls={controls}
        onAdd={()=>{alert("add Student")}}
        emptyStateComponent={loading ? <CircularProgress /> : "No groups available"}
      />
    </div>
  );
};

export default GroupPage;