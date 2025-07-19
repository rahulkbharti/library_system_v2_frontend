import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import bookApi from '../../api/services/book.api';

import CircularProgress from '@mui/material/CircularProgress';

const BookPage = () => {
    const [loading, setLoading] = useState(true);
    const [books,setBooks] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await bookApi.getBooks();
            if(response.error) {
               setBooks([]);
               console.error("Error fetching books:", response.error);
               setLoading(false);
               return;
            }
            console.log("Books:", response?.books);
            setBooks(response?.books);
            setLoading(false);
        };
        fetchBooks();
        setLoading(true);
    }, []);


  // Column configuration
  const columns = [
    {id:'book_id', label: 'Book ID'},
    {id:'title', label: 'Title'},
    {id:'publisher', label: 'Publisher'},
    {id:'author', label: 'Author'},
    {id:'isbn', label: 'ISBN'},
  ];

  // Control functions
  const controls = {
    title: 'Book Management',
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
        data={books} 
        controls={controls} 
        onAdd={()=>{alert("add Book")}}
        emptyStateComponent={loading ? <CircularProgress/> : "No books available"}
      >
      </DataTable>
    </div>
  );
};

export default BookPage;