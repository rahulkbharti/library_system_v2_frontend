import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import CircularProgress from '@mui/material/CircularProgress';

// No API import needed as we are using dummy data
// import bookCopyApi from '../../api/services/bookCopy.api'; 

// Dummy data for book copies
const dummyBookCopies = [
  { copy_id: 'C001', book_title: 'The Lord of the Rings', edition: '3rd Edition', status: 'Available', due_date: 'N/A' },
  { copy_id: 'C002', book_title: 'Pride and Prejudice', edition: 'Anniversary Edition', status: 'Borrowed', due_date: '2025-08-15' },
  { copy_id: 'C003', book_title: 'To Kill a Mockingbird', edition: '50th Anniversary', status: 'Available', due_date: 'N/A' },
  { copy_id: 'C004', book_title: 'The Great Gatsby', edition: 'Paperback', status: 'Under Maintenance', due_date: 'N/A' },
  { copy_id: 'C005', book_title: 'The Lord of the Rings', edition: '3rd Edition', status: 'Borrowed', due_date: '2025-07-30' },
  { copy_id: 'C006', book_title: '1984', edition: 'Signet Classics', status: 'Available', due_date: 'N/A' },
];


const BookCopyPage = () => {
    const [loading, setLoading] = useState(true);
    const [bookCopies, setBookCopies] = useState([]);

    useEffect(() => {
        // In a real scenario, you would fetch data from an API
        // For this template, we are just loading the dummy data into state.
        const fetchBookCopies = () => {
            console.log("Loading dummy book copies");
            setBookCopies(dummyBookCopies);
        };
        fetchBookCopies();
    }, []);


  // Column configuration for Book Copies
  const columns = [
    {id:'copy_id', label: 'Copy ID'},
    {id:'book_title', label: 'Book Title'},
    {id:'edition', label: 'Edition'},
    {id:'status', label: 'Status'},
    {id:'due_date', label: 'Due Date'},
  ];

  // Control functions for the DataTable
  const controls = {
    title: 'Book Copy Management',
    onView: (row) => alert(`Viewing copy ID: ${row.copy_id} of book "${row.book_title}"`),
    onEdit: (row) => alert(`Editing copy ID: ${row.copy_id}`),
    onDelete: (row) => {
      if (window.confirm(`Delete copy ${row.copy_id} of "${row.book_title}"?`)) {
        alert(`Deleted copy: ${row.copy_id}`);
        // Here you would typically call an API to delete and then refresh the data
      }
    }
  };

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={bookCopies} 
        controls={controls} 
        onAdd={() => {alert("Add New Book Copy")}}
        emptyStateComponent={loading ? <CircularProgress /> : "No book copies available"}
      />
    </div>
  );
};

export default BookCopyPage;