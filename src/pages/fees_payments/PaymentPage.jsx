import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';

// Dummy data for payments 💳
const dummyPayments = [
  {
    "payment_id": 3,
    "student_fee_id": 2,
    "amount": "2500.00",
    "payment_date": "2025-07-12",
    "payment_method": "Credit Card",
    "transaction_reference": "TXN-20250712-12345",
    "receipt_number": "RCPT-20250712-001",
    "received_by": 2
  },
  {
    "payment_id": 4,
    "student_fee_id": 5,
    "amount": "750.00",
    "payment_date": "2025-07-11",
    "payment_method": "UPI",
    "transaction_reference": "TXN-20250711-67890",
    "receipt_number": "RCPT-20250711-002",
    "received_by": 2
  },
  {
    "payment_id": 5,
    "student_fee_id": 7,
    "amount": "50.00",
    "payment_date": "2025-07-10",
    "payment_method": "Cash",
    "transaction_reference": "N/A",
    "receipt_number": "RCPT-20250710-003",
    "received_by": 1
  },
  {
    "payment_id": 6,
    "student_fee_id": 8,
    "amount": "1500.00",
    "payment_date": "2025-07-09",
    "payment_method": "Net Banking",
    "transaction_reference": "TXN-20250709-11223",
    "receipt_number": "RCPT-20250709-004",
    "received_by": 2
  }
];

const PaymentsPage = () => {
    
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // Load dummy data when the component mounts
        const fetchPayments = () => {
            console.log("Loading dummy payment data");
            setPayments(dummyPayments);
        };
        fetchPayments();
    }, []);

  // Column configuration for Payments
  const columns = [
    {id:'payment_id', label: 'Payment ID'},
    {id:'receipt_number', label: 'Receipt No.'},
    {id:'student_fee_id', label: 'Fee Trans. ID'},
    {id:'amount', label: 'Amount (INR)'},
    {id:'payment_date', label: 'Payment Date'},
    {id:'payment_method', label: 'Method'},
    {id:'received_by', label: 'Received By (User ID)'},
  ];

  // Control functions for the DataTable
  const controls = {
    title: 'Payment History',
    // Hiding controls as payment records are often immutable
    onView: (row) => alert(`Viewing receipt: ${row.receipt_number}`),
    // onEdit: (row) => alert(`Editing payment: ${row.payment_id}`), // Usually not editable
    // onDelete: (row) => { ... } // Usually requires a refund process, not direct deletion
  };

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={payments} 
        controls={controls} 
        // Hiding the 'Add' button as payments are typically recorded against specific fees
        // onAdd={() => {alert("Record New Payment")}} 
      />
    </div>
  );
};

export default PaymentsPage;