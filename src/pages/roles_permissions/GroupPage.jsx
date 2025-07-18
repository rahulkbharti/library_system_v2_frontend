import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import groupApi from '../../api/services/group.api';

const GroupPage = () => {

    const [groups,setGroups] = useState([]);
    useEffect(() => {
        const fetchGroups = async () => {
            const response = await groupApi.getGroups();
            console.log("Groups:", response?.data);
            setGroups(response?.groups);
        };
        fetchGroups();
    }, []);


  // Column configuration
const columns = [
    {id:'id', label: 'Group ID', width:50},
    {id:"name", label:"Group Name"},  
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
      />
    </div>
  );
};

export default GroupPage;