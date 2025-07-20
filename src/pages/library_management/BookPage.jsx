import { useEffect, useState, useCallback } from "react";
import DataTable from "../common/DataTable";
import bookApi from "../../api/services/book.api";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../common/DialogeBox";
import AddBookForm from "./book_page/AddBookForm";
import ViewBook from "./book_page/ViewBook";
import DeleteDialog from "../common/DeleteBox";

const COLUMNS = [
  { id: "book_id", label: "Book ID" },
  { id: "title", label: "Title" },
  { id: "publisher", label: "Publisher" },
  { id: "author", label: "Author" },
  { id: "isbn", label: "ISBN" },
];

const BookPage = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // Add refresh flag

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await bookApi.getBooks();
      if (response.error) {
        console.error("Error fetching books:", response.error);
        setBooks([]);
      } else {
        setBooks(response?.books || []);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, dialogState.add, dialogState.edit, refreshFlag]); // Add refreshFlag to dependencies

  const handleDialogClose = (key) => () => {
    setDialogState(prev => ({ ...prev, [key]: false }));
  };

  const handleBookAction = (action, book = null) => {
    setSelectedBook(book);
    setDialogState(prev => ({ ...prev, [action]: true }));
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBook) return;
    try {
      await bookApi.DeleteBook(selectedBook.book_id);
      handleDialogClose('delete')();
      setRefreshFlag(prev => !prev); // Toggle refresh flag to trigger re-fetch
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const controls = {
    title: "Book Management",
    onView: (row) => handleBookAction('view', row),
    onEdit: (row) => handleBookAction('edit', row),
    onDelete: (row) => handleBookAction('delete', row),
  };

  return (
    <div>
      {/* Add Book Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={handleDialogClose('add')}
        title="Add New Book"
        maxWidth="md"
      >
        <AddBookForm handleClose={handleDialogClose('add')} />
      </DialogBox>

      {/* Edit Book Dialog */}
      <DialogBox 
        open={dialogState.edit} 
        handleClose={handleDialogClose('edit')} 
        title="Edit Book" 
        maxWidth="md"
      >
        <AddBookForm 
          initialValues={selectedBook} 
          handleClose={handleDialogClose('edit')} 
          edit={true}
        />
      </DialogBox>

      {/* View Book Dialog */}
      <DialogBox
        open={dialogState.view}
        handleClose={handleDialogClose('view')}
        title="View Book"
        maxWidth="md"
        fullWidth
      >
        <ViewBook book={selectedBook} handleClose={handleDialogClose('view')} />
      </DialogBox>

      {/* Delete Book Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={handleDialogClose('delete')}
        itemName={selectedBook?.title || ""}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable
        columns={COLUMNS}
        data={books}
        controls={controls}
        onAdd={() => handleBookAction('add')}
        emptyStateComponent={
          loading ? <CircularProgress /> : "No books available"
        }
      />
    </div>
  );
};  

export default BookPage;