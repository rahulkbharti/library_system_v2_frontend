import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';

// Dummy data for fees 💰
const dummyFees = [
  {
    "fee_id": 1,
    "fee_code": "LATE-001",
    "fee_name": "Late Return Fee",
    "fee_category": "Late",
    "amount": "50.00",
    "currency": "INR",
    "max_amount": "500.00",
    "is_active": 1,
  },
  {
    "fee_id": 2,
    "fee_code": "ANNUAL-001",
    "fee_name": "Annual Membership",
    "fee_category": "Membership",
    "amount": "1500.00",
    "currency": "INR",
    "max_amount": null,
    "is_active": 1,
  },
  {
    "fee_id": 3,
    "fee_code": "REPLACE-001",
    "fee_name": "Lost Book Replacement",
    "fee_category": "Damage",
    "amount": "750.00",
    "currency": "INR",
    "max_amount": null,
    "is_active": 1,
  },
  {
    "fee_id": 4,
    "fee_code": "PRINT-001",
    "fee_name": "Printing Services",
    "fee_category": "Service",
    "amount": "5.00",
    "currency": "INR",
    "max_amount": null,
    "is_active": 0,
  }
];

const FeesPage = () => {
    
    const [fees, setFees] = useState([]);

    useEffect(() => {
        // Load dummy data when the component mounts
        const fetchFees = () => {
            console.log("Loading dummy fee data");
            setFees(dummyFees);
        };
        fetchFees();
    }, []);

  // Column configuration for Fees
  const columns = [
    {id:'fee_code', label: 'Fee Code'},
    {id:'fee_name', label: 'Name'},
    {id:'fee_category', label: 'Category'},
    {id:'amount', label: 'Amount (INR)'},
    {id:'max_amount', label: 'Max Amount'},
    {
      id:'is_active', 
      label: 'Status',
      // Simple formatter to display text instead of 0 or 1
      render: (rowData) => rowData.is_active ? 'Active' : 'Inactive'
    },
  ];

  // Control functions for the DataTable
  const controls = {
    title: 'Fee Management',
    onView: (row) => alert(`Viewing details for: ${row.fee_name}`),
    onEdit: (row) => alert(`Editing fee: ${row.fee_code}`),
    onDelete: (row) => {
      if (window.confirm(`Are you sure you want to delete the fee "${row.fee_name}"?`)) {
        alert(`Deleted fee: ${row.fee_name}`);
        // API call to delete and refresh data would go here
      }
    }
  };

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={fees} 
        controls={controls} 
        onAdd={() => {alert("Add New Fee")}}
      />
    </div>
  );
};

export default FeesPage;