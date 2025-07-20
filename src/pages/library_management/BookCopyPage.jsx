import React, { useEffect, useState } from 'react';
import DataTable from "../common/DataTable";
import DialogBox from '../common/DialogeBox';
import AddBookCopyForm from './book_copy_page/AddBookCopyForm';
import DeleteDialog from '../common/DeleteBox';
import ViewBookCopy from './book_copy_page/ViewBookCopy'; 
import { CircularProgress} from "@mui/material";

import bookCopyApi from '../../api/services/book_copy.api'; 

const BookCopyPage = () => {
  const [loading, setLoading] = useState(true);
  const [bookCopies, setBookCopies] = useState([]);
  const [dialogState, setDialogState] = useState({
    add: false,
    view: false,
    edit: false,
    delete: false
  });
  const [selectedCopy, setSelectedCopy] = useState(null);

  // Column configuration
  const columns = [
    { id: 'copy_id', label: 'Copy ID' },
    { id: 'barcode', label: 'barCode' },
    { id: 'shelf_location', label: 'Shelf Location' },
    { id: 'book_title', label: 'Book Title' },
    {
      id: 'status',
      label: 'Status',
      format: (value) => (
        <span style={{ 
          color: value === 'available' ? 'green' : 
                 value === 'Borrowed' ? 'orange' : 'red',
          fontWeight: 'bold'
        }}>
          {value}
        </span>
      )
    },
  ];

  // Fetch book copies
  const fetchBookCopies = async () => {
    setLoading(true);
    try {
      // Replace with actual API call when ready:
      const response = await bookCopyApi.getBookCopies();
      // setBookCopies(response.data);
      console.log("Fetched book copies:", response.books);
      setBookCopies(response.books || []);
    } catch (error) {
      console.error("Error fetching book copies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookCopies();
  }, [dialogState]);

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!selectedCopy) return;
    try {
      await bookCopyApi.deleteBookCopy(selectedCopy.copy_id);
      handleDialogClose('delete')();
      setRefreshFlag(prev => !prev); // Toggle refresh flag to trigger re-fetch
    } catch (error) {
      console.error("Error deleting book copy:", error);
    }
  };

  // Control functions
  const controls = {
    title: 'Book Copy Management',
    onView: (row) => {
      setSelectedCopy(row);
      setDialogState(prev => ({ ...prev, view: true }));
    },
    onEdit: (row) => {
      setSelectedCopy(row);
      setDialogState(prev => ({ ...prev, edit: true }));
    },
    onDelete: (row) => {
      setSelectedCopy(row);
      setDialogState(prev => ({ ...prev, delete: true }));
    },
  };

  return (
    <div>
      {/* Add Book Copy Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={() => setDialogState(prev => ({ ...prev, add: false }))}
        title="Add New Book Copy"
      >
        <AddBookCopyForm 
          handleClose={() => setDialogState(prev => ({ ...prev, add: false }))}
          onSuccess={fetchBookCopies}
        />
      </DialogBox>

      {/* View Book Copy Dialog */}
      <DialogBox
        open={dialogState.view}
        handleClose={() => setDialogState(prev => ({ ...prev, view: false }))}
        title="Book Copy Details"
      >
        <ViewBookCopy 
          copy={selectedCopy} 
          handleClose={() => setDialogState(prev => ({ ...prev, view: false }))}
        />
      </DialogBox>

      {/* Edit Book Copy Dialog */}
      <DialogBox
        open={dialogState.edit}
        handleClose={() => setDialogState(prev => ({ ...prev, edit: false }))}
        title="Edit Book Copy"
      >
        <AddBookCopyForm 
          initialValues={selectedCopy}
          edit={true}
          handleClose={() => setDialogState(prev => ({ ...prev, edit: false }))}
          onSuccess={fetchBookCopies}
        />
      </DialogBox>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={() => setDialogState(prev => ({ ...prev, delete: false }))}
        itemName={selectedCopy?.book_title || 'this book copy'}
        itemIdentifier={selectedCopy?.copy_id}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable 
        columns={columns} 
        data={bookCopies} 
        controls={controls} 
        onAdd={() => setDialogState(prev => ({ ...prev, add: true }))}
        emptyStateComponent={
          loading ? (
            <CircularProgress />
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              No book copies available
            </div>
          )
        }
      />
    </div>
  );
};

export default BookCopyPage;