// src/components/TransactionsPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  History as HistoryIcon,
  ArrowForward as IssueIcon,
  AssignmentReturn as ReturnIcon,
  EventAvailable as DueIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { format, addDays, differenceInDays, parseISO } from "date-fns";
import { motion } from "framer-motion";
import TransactionOverviewDialog from "./TransactionOverview";
import TransactionOverviewDemo from "./TransactionOverview";
import StatusOverview from "../common/StatusOverview";

// Styled Components
const GradientHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  color: "white",
  padding: theme.spacing(4, 0),
  borderRadius: "0 0 20px 20px",
  marginBottom: theme.spacing(4),
  boxShadow: "0 4px 20px rgba(106, 17, 203, 0.3)",
}));

const StatusBadge = styled(Chip)(({ theme, status }) => {
  let color;
  switch (status) {
    case "issued":
      color = theme.palette.warning.main;
      break;
    case "returned":
      color = theme.palette.success.main;
      break;
    case "overdue":
      color = theme.palette.error.main;
      break;
    default:
      color = theme.palette.info.main;
  }

  return {
    backgroundColor: `${color}20`,
    color: color,
    fontWeight: 600,
  };
});

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "12px",
  padding: "8px 16px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Mock data
const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-3-16-148410-0",
    available: true,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    available: false,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    available: true,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-1-59308-036-5",
    available: true,
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0-261-10221-4",
    available: true,
  },
];

const initialMembers = [
  { id: 1, name: "John Smith", email: "john@example.com", membership: "Gold" },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    membership: "Silver",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    membership: "Platinum",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    membership: "Silver",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    membership: "Gold",
  },
];

const initialTransactions = [
  {
    id: 1,
    bookId: 2,
    memberId: 1,
    issueDate: new Date(2023, 5, 15),
    dueDate: new Date(2023, 6, 15),
    returnDate: null,
    status: "issued",
  },
  {
    id: 2,
    bookId: 3,
    memberId: 3,
    issueDate: new Date(2023, 5, 10),
    dueDate: new Date(2023, 6, 10),
    returnDate: new Date(2023, 5, 25),
    status: "returned",
  },
  {
    id: 3,
    bookId: 1,
    memberId: 2,
    issueDate: new Date(2023, 4, 20),
    dueDate: new Date(2023, 5, 20),
    returnDate: null,
    status: "overdue",
  },
];

const TransactionsPage = () => {
  // State management
  const [books] = useState(initialBooks);
  const [members] = useState(initialMembers);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openIssueDialog, setOpenIssueDialog] = useState(false);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [issueForm, setIssueForm] = useState({
    bookId: "",
    memberId: "",
    issueDate: new Date(),
    dueDate: addDays(new Date(), 30),
  });
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((transaction) => {
        const book = books.find((b) => b.id === transaction.bookId);
        const member = members.find((m) => m.id === transaction.memberId);

        return (
          book?.title.toLowerCase().includes(term) ||
          member?.name.toLowerCase().includes(term) ||
          transaction.status.toLowerCase().includes(term)
        );
      });
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    setFilteredTransactions(result);
    setPage(0);
  }, [searchTerm, statusFilter, transactions, books, members]);

  // Handle issue dialog open
  const handleOpenIssueDialog = () => {
    setIssueForm({
      bookId: "",
      memberId: "",
      issueDate: new Date(),
      dueDate: addDays(new Date(), 30),
    });
    setOpenIssueDialog(true);
  };

  // Handle issue dialog close
  const handleCloseIssueDialog = () => {
    setOpenIssueDialog(false);
  };

  // Handle return dialog open
  const handleOpenReturnDialog = (transaction) => {
    setCurrentTransaction(transaction);
    setOpenReturnDialog(true);
  };

  // Handle return dialog close
  const handleCloseReturnDialog = () => {
    setOpenReturnDialog(false);
    setCurrentTransaction(null);
  };

  // Handle issue form change
  const handleIssueFormChange = (e) => {
    const { name, value } = e.target;
    setIssueForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle book issue
  const handleIssueBook = () => {
    // Update book availability
    const updatedBooks = books.map((book) =>
      book.id === parseInt(issueForm.bookId)
        ? { ...book, available: false }
        : book
    );

    // Create new transaction
    const newTransaction = {
      id: transactions.length + 1,
      bookId: parseInt(issueForm.bookId),
      memberId: parseInt(issueForm.memberId),
      issueDate: issueForm.issueDate,
      dueDate: issueForm.dueDate,
      returnDate: null,
      status: "issued",
    };

    setTransactions([...transactions, newTransaction]);
    handleCloseIssueDialog();
  };

  // Handle book return
  const handleReturnBook = () => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === currentTransaction.id
        ? { ...transaction, returnDate: new Date(), status: "returned" }
        : transaction
    );

    // Update book availability
    const updatedBooks = books.map((book) =>
      book.id === currentTransaction.bookId
        ? { ...book, available: true }
        : book
    );

    setTransactions(updatedTransactions);
    handleCloseReturnDialog();
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
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Get book by ID
  const getBookById = (id) => {
    return books.find((book) => book.id === id);
  };

  // Get member by ID
  const getMemberById = (id) => {
    return members.find((member) => member.id === id);
  };

  // Get days remaining
  const getDaysRemaining = (dueDate) => {
    const days = differenceInDays(parseISO(dueDate.toISOString()), new Date());
    return days > 0 ? days : 0;
  };

  //   return(
  //     <TransactionOverviewDemo
  //       />
  //   )
  const status = [
    {
      title: "Total Transactions",
      value: 500,
      color: "#6a11cb",
      icon: <HistoryIcon />,
    },
    {
      title: "Books Issued",
      value: 500,
      color: "#ff6b6b",
      icon: <BookIcon />,
    },
    {
      title: "Overdue Books",
      value: 500,
      color: "#f44336",
      icon: <DueIcon />,
    },
    {
      title: "Active Members",
      value: 500,
      color: "#4caf50",
      icon: <PersonIcon />,
    },
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}
        >
          Transaction Management
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ActionButton
            variant="contained"
            color="secondary"
            startIcon={<IssueIcon />}
            onClick={handleOpenIssueDialog}
            sx={{
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
            }}
          >
            Issue New Book
          </ActionButton>
        </motion.div>
      </Box>

      <>
        {/* Stats */}
        <StatusOverview status={status}/>

        {/* Search and Filter Bar */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search transactions by book, member, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="issued">Issued</MenuItem>
                  <MenuItem value="returned">Returned</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilters(!showFilters)}
                endIcon={showFilters ? <CloseIcon fontSize="small" /> : null}
              >
                {showFilters ? "Hide Filters" : "More Filters"}
              </Button>
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Book</InputLabel>
                    <Select value="" onChange={() => {}} label="Book">
                      {books.map((book) => (
                        <MenuItem key={book.id} value={book.id}>
                          {book.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Member</InputLabel>
                    <Select value="" onChange={() => {}} label="Member">
                      {members.map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                          {member.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={resetFilters}
                    startIcon={<RefreshIcon />}
                  >
                    Reset Filters
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </Paper>

        {/* Transaction Table */}
        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "background.paper" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Book</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Member</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Issue Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Return Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => {
                    const book = getBookById(transaction.bookId);
                    const member = getMemberById(transaction.memberId);
                    const daysRemaining = getDaysRemaining(transaction.dueDate);

                    return (
                      <StyledTableRow key={transaction.id} hover>
                        <TableCell>#{transaction.id}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              sx={{
                                bgcolor: "#6a11cb",
                                mr: 2,
                                width: 36,
                                height: 36,
                              }}
                            >
                              <BookIcon fontSize="small" />
                            </Avatar>
                            <Box>
                              <Typography fontWeight={600}>
                                {book?.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {book?.author}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              sx={{
                                bgcolor: "#2575fc",
                                mr: 2,
                                width: 36,
                                height: 36,
                              }}
                            >
                              <PersonIcon fontSize="small" />
                            </Avatar>
                            <Box>
                              <Typography fontWeight={600}>
                                {member?.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {member?.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {format(transaction.issueDate, "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {format(transaction.dueDate, "MMM dd, yyyy")}
                            {transaction.status === "issued" && (
                              <Chip
                                label={`${daysRemaining} days`}
                                size="small"
                                color={daysRemaining < 5 ? "error" : "success"}
                                sx={{ ml: 1, fontWeight: 600 }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {transaction.returnDate
                            ? format(transaction.returnDate, "MMM dd, yyyy")
                            : "Not returned"}
                        </TableCell>
                        <TableCell>
                          <StatusBadge
                            status={transaction.status}
                            label={
                              transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" justifyContent="center">
                            {transaction.status !== "returned" && (
                              <Tooltip title="Return Book">
                                <IconButton
                                  onClick={() =>
                                    handleOpenReturnDialog(transaction)
                                  }
                                  color="primary"
                                  sx={{
                                    backgroundColor: "#4caf5020",
                                    "&:hover": { backgroundColor: "#4caf5040" },
                                  }}
                                >
                                  <ReturnIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Transaction Details">
                              <IconButton
                                color="info"
                                sx={{
                                  backgroundColor: "#2196f320",
                                  "&:hover": { backgroundColor: "#2196f340" },
                                  ml: 1,
                                }}
                              >
                                <HistoryIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
          />
        </Paper>
      </>

      {/* Issue Book Dialog */}
      <Dialog
        open={openIssueDialog}
        onClose={handleCloseIssueDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "white",
            fontWeight: 600,
          }}
        >
          Issue New Book
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Select Book</InputLabel>
                <Select
                  name="bookId"
                  value={issueForm.bookId}
                  onChange={handleIssueFormChange}
                  label="Select Book"
                >
                  {books
                    .filter((b) => b.available)
                    .map((book) => (
                      <MenuItem key={book.id} value={book.id}>
                        {book.title} - {book.author}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Select Member</InputLabel>
                <Select
                  name="memberId"
                  value={issueForm.memberId}
                  onChange={handleIssueFormChange}
                  label="Select Member"
                >
                  {members.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.name} ({member.membership})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="issueDate"
                label="Issue Date"
                type="date"
                value={format(issueForm.issueDate, "yyyy-MM-dd")}
                onChange={(e) =>
                  setIssueForm({
                    ...issueForm,
                    issueDate: parseISO(e.target.value),
                  })
                }
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dueDate"
                label="Due Date"
                type="date"
                value={format(issueForm.dueDate, "yyyy-MM-dd")}
                onChange={(e) =>
                  setIssueForm({
                    ...issueForm,
                    dueDate: parseISO(e.target.value),
                  })
                }
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseIssueDialog} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleIssueBook}
            disabled={!issueForm.bookId || !issueForm.memberId}
          >
            Issue Book
          </Button>
        </DialogActions>
      </Dialog>

      {/* Return Book Dialog */}
      <Dialog
        open={openReturnDialog}
        onClose={handleCloseReturnDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
            color: "white",
            fontWeight: 600,
          }}
        >
          Return Book
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {currentTransaction && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Confirm Book Return
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  p={2}
                  bgcolor="#f5f5f5"
                  borderRadius={2}
                >
                  <BookIcon sx={{ fontSize: 40, color: "#6a11cb", mr: 2 }} />
                  <Box>
                    <Typography fontWeight={600}>
                      {getBookById(currentTransaction.bookId)?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Issued to:{" "}
                      {getMemberById(currentTransaction.memberId)?.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Issue Date</Typography>
                <Typography fontWeight={600}>
                  {format(currentTransaction.issueDate, "MMM dd, yyyy")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Due Date</Typography>
                <Typography fontWeight={600}>
                  {format(currentTransaction.dueDate, "MMM dd, yyyy")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Days Overdue</Typography>
                <Typography fontWeight={600} color="error">
                  {differenceInDays(new Date(), currentTransaction.dueDate)}{" "}
                  days
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Fine Amount</Typography>
                <Typography fontWeight={600}>
                  $
                  {differenceInDays(new Date(), currentTransaction.dueDate) *
                    0.5}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseReturnDialog} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReturnBook}
            startIcon={<CheckCircleIcon />}
          >
            Confirm Return
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Stat Card Component
const StatCard = ({ title, value, color, icon }) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: 3,
      background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
      color: "white",
      textAlign: "center",
      boxShadow: `0 4px 20px ${color}40`,
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {title}
      </Typography>
    </Box>
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
      {React.cloneElement(icon, { sx: { fontSize: 40, opacity: 0.8 } })}
    </Box>
  </Paper>
);

export default TransactionsPage;
