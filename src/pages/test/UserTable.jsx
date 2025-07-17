import React from 'react';
import DataTable from '../common/DataTable';
const StudentData = () => {
  // Sample data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending' },
    { id: 4, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 5, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 6, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending' },
    { id: 7, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 8, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 9, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending' },
    { id: 10, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 11, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 12, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending' },
    // ... more data
  ];

  // Column configuration
  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { 
      id: 'status', 
      label: 'Status',
      render: (row) => (
        <span style={{ 
          color: row.status === 'Active' ? 'green' : 
                row.status === 'Pending' ? 'orange' : 'red',
          fontWeight: 'bold'
        }}>
          {row.status}
        </span>
      )
    }
  ];

  // Control functions
  const controls = {
    title: 'User Management',
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
        data={users} 
        controls={controls} 
      />
    </div>
  );
};

export default StudentData;