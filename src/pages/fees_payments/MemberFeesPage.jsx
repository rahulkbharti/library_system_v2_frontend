import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';

// Dummy data for fees assigned to members (students) 🧾
const dummyMemberFees = [
  {
    "student_fee_id": 2,
    "student_id": 99,
    "fee_id": 3,
    "original_amount": "2500.00",
    "due_date": "2025-07-31",
    "status": "Paid",
    "notes": "Annual membership fee for 2025"
  },
  {
    "student_fee_id": 3,
    "student_id": 101,
    "fee_id": 1,
    "original_amount": "50.00",
    "due_date": "2025-07-20",
    "status": "Due",
    "notes": "Late return fee for 'The Great Gatsby'"
  },
  {
    "student_fee_id": 4,
    "student_id": 105,
    "fee_id": 2,
    "original_amount": "1500.00",
    "due_date": "2025-08-01",
    "status": "Due",
    "notes": "Annual membership fee"
  },
  {
    "student_fee_id": 5,
    "student_id": 99,
    "fee_id": 5,
    "original_amount": "750.00",
    "due_date": "2025-07-15",
    "status": "Paid",
    "notes": "Replacement fee for lost book"
  }
];

const MemberFeesPage = () => {
    
    const [memberFees, setMemberFees] = useState([]);

    useEffect(() => {
        // Load dummy data when the component mounts
        const fetchMemberFees = () => {
            console.log("Loading dummy member fee data");
            setMemberFees(dummyMemberFees);
        };
        fetchMemberFees();
    }, []);

  // Column configuration for Member Fees
  const columns = [
    {id:'student_fee_id', label: 'Transaction ID'},
    {id:'student_id', label: 'Member ID'},
    {id:'notes', label: 'Description'},
    {id:'original_amount', label: 'Amount (INR)'},
    {id:'due_date', label: 'Due Date'},
    {id:'status', label: 'Status'},
  ];

  // Control functions for the DataTable
  const controls = {
    title: 'Member Fee Management',
    onView: (row) => alert(`Viewing transaction #${row.student_fee_id} for Member ID: ${row.student_id}`),
    onEdit: (row) => alert(`Editing transaction #${row.student_fee_id}`),
    onDelete: (row) => {
      if (window.confirm(`Delete transaction #${row.student_fee_id}?`)) {
        alert(`Deleted transaction: ${row.student_fee_id}`);
        // API call to delete and refresh data would go here
      }
    }
  };

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={memberFees} 
        controls={controls} 
        onAdd={() => {alert("Assign New Fee to Member")}}
      />
    </div>
  );
};

export default MemberFeesPage;