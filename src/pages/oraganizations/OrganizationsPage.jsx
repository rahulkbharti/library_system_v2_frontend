import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
// No API import is needed as we are using dummy data.
// import organizationApi from '../../api/services/organization.api';

// Dummy data for a list of organizations or branches
const dummyOrganizations = [
  {
    organization_id: 101,
    name: 'Central City Library',
    address: '123 Library Lane, Knowledge City, 400050',
    phone: '022-23456789',
    email: 'contact@centrallibrary.com',
    website: 'www.centrallibrary.com'
  },
  {
    organization_id: 102,
    name: 'Northside Community Branch',
    address: '456 Bookworm Avenue, North Town, 400061',
    phone: '022-98765432',
    email: 'support@northbranch.lib',
    website: 'www.northbranch.lib'
  },
  {
    organization_id: 103,
    name: 'Westwood Tech Archive',
    address: '789 Digital Drive, Tech Park, 400072',
    phone: '022-55551234',
    email: 'admin@westwoodarchive.tech',
    website: 'www.westwoodarchive.tech'
  },
];


const OrganizationPage = () => {
    
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        // In a real application, you would fetch this from an API.
        // For this template, we just load the dummy data.
        const fetchOrganizations = () => {
            // No need for an async call here, but keeping the structure
            // in case you want to swap in an API call later.
            console.log("Organizations:", dummyOrganizations);
            setOrganizations(dummyOrganizations);
        };
        fetchOrganizations();
    }, []);


  // Column configuration for the DataTable
  const columns = [
    {id:'organization_id', label: 'Org. ID'},
    {id:'name', label: 'Name'},
    {id:'phone', label: 'Contact Phone'},
    {id:'email', label: 'Contact Email'},
    {id:'website', label: 'Website'},
  ];

  // Control functions for the DataTable
  const controls = {
    title: 'Organization Management',
    // NOTE: In a real app, there's often only one organization to edit.
    // These controls are here to match the template's structure.
    onView: (row) => alert(`Viewing: ${row.name}`),
    onEdit: (row) => alert(`Editing: ${row.name}`),
    onDelete: (row) => {
      // Deleting an organization is a critical action, hence the confirm dialog.
      if (window.confirm(`Are you sure you want to delete ${row.name}? This action cannot be undone.`)) {
        alert(`Deleted: ${row.name}`);
        // Here you would call an API to delete the item and then refresh the list.
      }
    }
  };

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={organizations} 
        controls={controls} 
        onAdd={()=>{alert("Add New Organization")}}
      />
    </div>
  );
};

export default OrganizationPage;