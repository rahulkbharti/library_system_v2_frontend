// src/components/BooksPage.js
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, TextField, MenuItem, Select, InputLabel,
  FormControl, Grid, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Chip, IconButton, Stack, Dialog,
  DialogTitle, DialogContent, DialogActions, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterIcon from '@mui/icons-material/FilterList';
import ViewIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/ImportExport';
import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/system';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import StatusOverview from '../common/StatusOverview';
import { getStudents } from '../../api/services/student.api';

// Styled Components
const GradientHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
  color: 'white',
  //   padding: theme.spacing(4, 0),
  borderRadius: '0 0 20px 20px',
  //   marginBottom: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(78, 84, 200, 0.3)',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  margin: theme.spacing(0, 0.5),
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const RatingBadge = styled(Chip)(({ theme, rating }) => {
  let color;
  if (rating >= 4) color = theme.palette.success.main;
  else if (rating >= 3) color = theme.palette.warning.main;
  else color = theme.palette.error.main;

  return {
    backgroundColor: `${color}20`,
    color: color,
    fontWeight: 600,
  };
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Initial books data
const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925, rating: 4.2, pages: 218, added: new Date(2023, 0, 15) },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, rating: 4.5, pages: 324, added: new Date(2023, 1, 10) },
  { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, rating: 4.7, pages: 328, added: new Date(2023, 2, 5) },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813, rating: 4.3, pages: 432, added: new Date(2023, 0, 22) },
  { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, rating: 4.8, pages: 310, added: new Date(2023, 1, 18) },
  { id: 6, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', year: 1997, rating: 4.9, pages: 320, added: new Date(2023, 2, 12) },
  { id: 7, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', year: 1951, rating: 3.9, pages: 224, added: new Date(2023, 0, 30) },
  { id: 8, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954, rating: 4.9, pages: 1178, added: new Date(2023, 1, 25) },
  { id: 9, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', year: 1932, rating: 4.1, pages: 288, added: new Date(2023, 2, 8) },
  { id: 10, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Classic', year: 1866, rating: 4.4, pages: 527, added: new Date(2023, 0, 5) },
  { id: 11, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Adventure', year: 1988, rating: 4.0, pages: 208, added: new Date(2023, 1, 15) },
  { id: 12, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Mystery', year: 2003, rating: 3.8, pages: 454, added: new Date(2023, 2, 20) },
];

const genres = ['All', 'Classic', 'Fiction', 'Fantasy', 'Dystopian', 'Romance', 'Adventure', 'Mystery'];
const sortOptions = [
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' },
  { value: 'year_asc', label: 'Year (Oldest)' },
  { value: 'year_desc', label: 'Year (Newest)' },
  { value: 'rating_asc', label: 'Rating (Low)' },
  { value: 'rating_desc', label: 'Rating (High)' },
  { value: 'added_desc', label: 'Recently Added' },
];

const BooksPage = () => {
  // State management
  const [books, setBooks] = useState(initialBooks);
  const [filteredBooks, setFilteredBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState([1800, new Date().getFullYear()]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortOption, setSortOption] = useState('added_desc');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [dialogType, setDialogType] = useState('add');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  


  useEffect(()=>{
      const d = async ()=>{
           const result = await getStudents();
           console.log(result?.data?.students)
      }
      d();
  })
  // Apply filters and sorting
  useEffect(() => {
    let result = [...books];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term))
    }

    // Apply genre filter
    if (genreFilter !== 'All') {
      result = result.filter(book => book.genre === genreFilter);
    }

    // Apply year filter
    result = result.filter(book =>
      book.year >= yearFilter[0] && book.year <= yearFilter[1]
    );

    // Apply rating filter
    result = result.filter(book => book.rating >= ratingFilter);

    // Apply sorting
    switch (sortOption) {
      case 'title_asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'year_asc':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'year_desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'rating_asc':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'added_desc':
        result.sort((a, b) => b.added - a.added);
        break;
      default:
        break;
    }

    setFilteredBooks(result);
    setPage(0);
  }, [searchTerm, genreFilter, yearFilter, ratingFilter, sortOption, books]);

  // Handle book deletion
  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Handle dialog open
  const handleOpenDialog = (type, book = null) => {
    setDialogType(type);
    setCurrentBook(book);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentBook(null);
  };

  // Handle form submission (add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = {
      id: currentBook?.id || books.length + 1,
      title: formData.get('title'),
      author: formData.get('author'),
      genre: formData.get('genre'),
      year: parseInt(formData.get('year')),
      rating: parseFloat(formData.get('rating')),
      pages: parseInt(formData.get('pages')),
      added: currentBook?.added || new Date()
    };

    if (dialogType === 'add') {
      setBooks([...books, bookData]);
    } else {
      setBooks(books.map(book => book.id === currentBook.id ? bookData : book));
    }
    handleCloseDialog();
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setGenreFilter('All');
    setYearFilter([1800, new Date().getFullYear()]);
    setRatingFilter(0);
    setSortOption('added_desc');
  };

  const status = [
    {
      title: "Total Books",
      value: 500,
      color: "#4e54c8",
      icon: <BookIcon />
    },
    {
      title: "Genres",
      value: 50,
      color: "#ff6b6b",
      icon: <CategoryIcon />
    },
    {
      title: "Avg. Rating",
      value: 4.2,
      color: "#4caf50",
      icon: <StarIcon />
    },
    {
      title: "Oldest Book",
      value: 500,
      color: "#9c27b0",
      icon: <HistoryIcon />
    }
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%", mb: 2, justifyContent: "space-between" }}>
        <Box>
          <Typography variant='h5'>Books</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('add')}
              sx={{
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(78, 17, 201, 0.4)',
              }}
            >
              Add New Book
            </Button>
          </motion.div>
        </Box>
      </Stack>
      {/* Stats */}
      <StatusOverview status={status} />
      {/* Search and Filter Bar */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size='small'
              type='search'
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                label="Genre"
                size='small'
              >
                {genres.map(genre => (
                  <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort By"
                startAdornment={<SortIcon sx={{ color: 'action.active', mr: 1 }} />}
                size='small'
              >
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
              size='small'
            >
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </Button>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                {/* <Typography variant="body2" gutterBottom>Publication Year: {yearFilter[0]} - {yearFilter[1]}</Typography> */}
                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    type="number"
                    label="Min Year"
                    value={yearFilter[0]}
                    onChange={(e) => setYearFilter([parseInt(e.target.value), yearFilter[1]])}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    type="number"
                    label="Max Year"
                    value={yearFilter[1]}
                    onChange={(e) => setYearFilter([yearFilter[0], parseInt(e.target.value)])}
                    fullWidth
                    size='small'
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" gutterBottom>Minimum Rating: {ratingFilter}</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <StarIcon sx={{ color: 'gold' }} />
                  <Slider
                    value={ratingFilter}
                    onChange={(e, newValue) => setRatingFilter(newValue)}
                    min={0}
                    max={5}
                    step={0.1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => value.toFixed(1)}
                    sx={{ flexGrow: 1 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={resetFilters}
                  startIcon={<CloseIcon />}
                >
                  Reset Filters
                </Button>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </Paper>

      {/* Book Table */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: 'background.paper' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Cover</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Genre</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Added On</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
                <StyledTableRow key={book.id} hover>
                  <TableCell>
                    <Box
                      sx={{
                        width: 50,
                        height: 70,
                        backgroundColor: '#e0e0e0',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#757575',
                        fontSize: 12,
                        fontWeight: 500
                      }}
                    >
                      Cover
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{book.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{book.pages} pages</Typography>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Chip
                      label={book.genre}
                      size="small"
                      sx={{
                        backgroundColor: '#4e54c820',
                        color: 'primary.main'
                      }}
                    />
                  </TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <RatingBadge
                        rating={book.rating}
                        label={`${book.rating} ★`}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{format(book.added, 'MMM dd, yyyy')}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" justifyContent="center">
                      <Tooltip title="View Details">
                        <ActionButton onClick={() => handleOpenDialog('view', book)}>
                          <ViewIcon fontSize="small" color="info" />
                        </ActionButton>
                      </Tooltip>
                      <Tooltip title="Edit Book">
                        <ActionButton onClick={() => handleOpenDialog('edit', book)}>
                          <EditIcon fontSize="small" color="primary" />
                        </ActionButton>
                      </Tooltip>
                      <Tooltip title="Delete Book">
                        <ActionButton onClick={() => handleDelete(book.id)}>
                          <DeleteIcon fontSize="small" color="error" />
                        </ActionButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredBooks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
        />
      </Paper>

      {/* Book Dialog (View/Add/Edit) */}
      <BookDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        dialogType={dialogType}
        currentBook={currentBook}
        handleSubmit={handleSubmit}
      />
    </>
  );
};


const Slider = ({ value, onChange, ...props }) => (
  <input
    type="range"
    value={value}
    onChange={(e) => onChange(null, parseFloat(e.target.value))}
    style={{ width: '100%' }}
    {...props}
  />
);

const BookDialog = ({ open, handleClose, dialogType, currentBook, handleSubmit }) => (
  <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
    <DialogTitle sx={{
      background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
      color: 'white',
      fontWeight: 600
    }}>
      {dialogType === 'view' ? 'Book Details' :
        dialogType === 'add' ? 'Add New Book' : 'Edit Book'}
    </DialogTitle>
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ py: 3 }}>
        {dialogType === 'view' ? (
          currentBook && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#757575',
                    fontSize: 16,
                    fontWeight: 500
                  }}
                >
                  Book Cover
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" fontWeight={700} mb={1}>{currentBook.title}</Typography>
                <Typography mb={1}><strong>Author:</strong> {currentBook.author}</Typography>
                <Typography mb={1}><strong>Genre:</strong> {currentBook.genre}</Typography>
                <Typography mb={1}><strong>Year:</strong> {currentBook.year}</Typography>
                <Typography mb={1}><strong>Pages:</strong> {currentBook.pages}</Typography>
                <Typography mb={1}><strong>Rating:</strong> {currentBook.rating} ★</Typography>
                <Typography><strong>Added:</strong> {format(currentBook.added, 'MMM dd, yyyy')}</Typography>
              </Grid>
            </Grid>
          )
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                defaultValue={currentBook?.title || ''}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="author"
                label="Author"
                defaultValue={currentBook?.author || ''}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Genre</InputLabel>
                <Select
                  name="genre"
                  defaultValue={currentBook?.genre || ''}
                  label="Genre"
                >
                  {genres.filter(g => g !== 'All').map(genre => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                name="year"
                label="Publication Year"
                type="number"
                defaultValue={currentBook?.year || ''}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 1000, max: new Date().getFullYear() }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                name="pages"
                label="Page Count"
                type="number"
                defaultValue={currentBook?.pages || ''}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="rating"
                label="Rating (0-5)"
                type="number"
                defaultValue={currentBook?.rating || ''}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 0, max: 5, step: 0.1 }}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} color="inherit">
          {dialogType === 'view' ? 'Close' : 'Cancel'}
        </Button>
        {dialogType !== 'view' && (
          <Button type="submit" variant="contained" color="primary">
            {dialogType === 'add' ? 'Add Book' : 'Save Changes'}
          </Button>
        )}
      </DialogActions>
    </form>
  </Dialog>
);

// Icons for stats
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>;
const CategoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;

export default BooksPage;