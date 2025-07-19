import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Avatar,
    IconButton,
} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import ViewIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import DueIcon from '@mui/icons-material/EventAvailable';
import ReturnIcon from '@mui/icons-material/AssignmentReturn';

import { printComponent } from "./printTransaction";

// Transaction Overview Dialog Component
const TransactionOverviewDialog = ({
    open,
    onClose,
    transaction,
    books,
    members,
}) => {
    if (!transaction) return null;

    // Find book and member details
    const book = books.find((b) => b.id === transaction.bookId);
    const member = members.find((m) => m.id === transaction.memberId);

    // Calculate days overdue and fine
    const daysOverdue = Math.max(
        0,
        Math.floor((new Date() - transaction.dueDate) / (1000 * 60 * 60 * 24))
    );
    const fineAmount = daysOverdue * 0.5; // $0.50 per day

    const handlePrint = () => {
        // alert(
        //     "Print functionality would open a print dialog with a formatted receipt"
        // );
        printComponent(transaction,book,member);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                display: open ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1300,
                p: 2,
                overflow:"auto"
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 800,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#3f51b5",
                        color: "white",
                        p: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5" fontWeight="700">
                        <Box
                            component="span"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <BookIcon sx={{ mr: 1 }} /> Transaction Overview
                        </Box>
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: "white" }}>
                        <Box component="span" sx={{ fontSize: 28, fontWeight: 300 }}>
                            ×
                        </Box>
                    </IconButton>
                </Box>

                <Box sx={{ p: 3, backgroundColor: "#f8f9fa",overflow:"scroll"}}>
                    <Paper sx={{ p: 3, mb: 2, backgroundColor: "white" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3,
                                pb: 2,
                                borderBottom: "2px solid #3f51b5",
                            }}
                        >
                            <Box>
                                <Typography variant="h5" fontWeight="700" gutterBottom>
                                    Library Transaction Receipt
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Transaction ID: #{transaction.id}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "1.5rem",
                                    color: "#3f51b5",
                                }}
                            >
                                LIBRARY
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    gutterBottom
                                    sx={{ color: "#3f51b5" }}
                                >
                                    Book Details
                                </Typography>

                                {book ? (
                                    <>
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <BookIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Title
                                                </Typography>
                                                <Typography fontWeight="600">{book.title}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <BookIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Author
                                                </Typography>
                                                <Typography>{book.author}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <BookIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    ISBN
                                                </Typography>
                                                <Typography>{book.isbn}</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                ) : (
                                    <Typography color="error">Book details not found</Typography>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    gutterBottom
                                    sx={{ color: "#3f51b5" }}
                                >
                                    Member Details
                                </Typography>

                                {member ? (
                                    <>
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <PersonIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Name
                                                </Typography>
                                                <Typography fontWeight="600">{member.name}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <PersonIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Email
                                                </Typography>
                                                <Typography>{member.email}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <PersonIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Membership
                                                </Typography>
                                                <Typography>{member.membership}</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                ) : (
                                    <Typography color="error">
                                        Member details not found
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Box sx={{ height: 1, borderTop: "1px dashed #ddd", my: 3 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    gutterBottom
                                    sx={{ color: "#3f51b5" }}
                                >
                                    Transaction Dates
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <EventIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                    <Box>
                                        <Typography variant="body2" color="textSecondary">
                                            Issue Date
                                        </Typography>
                                        <Typography>
                                            {new Date(transaction.issueDate).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <DueIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                    <Box>
                                        <Typography variant="body2" color="textSecondary">
                                            Due Date
                                        </Typography>
                                        <Typography>
                                            {new Date(transaction.dueDate).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>

                                {transaction.returnDate && (
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <ReturnIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Return Date
                                            </Typography>
                                            <Typography>
                                                {new Date(transaction.returnDate).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    gutterBottom
                                    sx={{ color: "#3f51b5" }}
                                >
                                    Status & Charges
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <BookIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                    <Box>
                                        <Typography variant="body2" color="textSecondary">
                                            Status
                                        </Typography>
                                        <Chip
                                            label={
                                                transaction.status.charAt(0).toUpperCase() +
                                                transaction.status.slice(1)
                                            }
                                            sx={{
                                                backgroundColor:
                                                    transaction.status === "returned"
                                                        ? "#4caf5020"
                                                        : transaction.status === "overdue"
                                                            ? "#f4433620"
                                                            : "#ff980020",
                                                color:
                                                    transaction.status === "returned"
                                                        ? "#4caf50"
                                                        : transaction.status === "overdue"
                                                            ? "#f44336"
                                                            : "#ff9800",
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {transaction.status === "overdue" && (
                                    <>
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <EventIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Days Overdue
                                                </Typography>
                                                <Typography>{daysOverdue} days</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <DueIcon sx={{ mr: 1.5, color: "#5c6bc0" }} />
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Fine Amount
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 800,
                                                        fontSize: "1.2rem",
                                                        color: "#f44336",
                                                    }}
                                                >
                                                    ${fineAmount.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </>
                                )}
                            </Grid>
                        </Grid>

                        <Box
                            sx={{
                                height: 1,
                                borderTop: "1px dashed #ddd",
                                my: 3,
                                textAlign: "center",
                                pt: 2,
                            }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                Thank you for using our library services
                            </Typography>
                            <Typography
                                variant="caption"
                                color="textSecondary"
                                sx={{ display: "block", mt: 1 }}
                            >
                                Generated on {new Date().toLocaleString()}
                            </Typography>
                        </Box>
                    </Paper>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 1,
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<PrintIcon />}
                            onClick={handlePrint}
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 1,
                                bgcolor: "#3f51b5",
                                "&:hover": { bgcolor: "#303f9f" },
                            }}
                        >
                            Print Receipt
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

// Demo Page Component
const TransactionOverviewDemo = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Sample data
    const books = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            isbn: "978-3-16-148410-0",
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            isbn: "978-0-06-112008-4",
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            isbn: "978-0-452-28423-4",
        },
    ];

    const members = [
        {
            id: 1,
            name: "Alex Johnson",
            email: "alex@example.com",
            membership: "Gold",
        },
        {
            id: 2,
            name: "Sarah Williams",
            email: "sarah@example.com",
            membership: "Silver",
        },
        {
            id: 3,
            name: "Michael Brown",
            email: "michael@example.com",
            membership: "Platinum",
        },
    ];

    const transactions = [
        {
            id: 1,
            bookId: 2,
            memberId: 1,
            issueDate: new Date(2023, 5, 15).getTime(),
            dueDate: new Date(2023, 6, 15).getTime(),
            returnDate: new Date(2023, 5, 25).getTime(),
            status: "returned",
        },
        {
            id: 2,
            bookId: 3,
            memberId: 3,
            issueDate: new Date(2023, 5, 10).getTime(),
            dueDate: new Date(2023, 6, 10).getTime(),
            returnDate: null,
            status: "overdue",
        },
        {
            id: 3,
            bookId: 1,
            memberId: 2,
            issueDate: new Date(2023, 4, 20).getTime(),
            dueDate: new Date(2023, 5, 20).getTime(),
            returnDate: null,
            status: "issued",
        },
    ];

    const openDialog = (transaction) => {
        setSelectedTransaction(transaction);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                    variant="h3"
                    fontWeight="700"
                    sx={{
                        color: "#3f51b5",
                        mb: 2,
                        background: "linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Library Transaction Overview
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    View and print detailed transaction receipts
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <BookIcon sx={{ fontSize: 40, color: "#3f51b5", mr: 2 }} />
                            <Box>
                                <Typography variant="h6" fontWeight="600">
                                    Books
                                </Typography>
                                <Typography>{books.length} titles in collection</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {books.map((book) => (
                                <Chip
                                    key={book.id}
                                    label={book.title}
                                    sx={{ m: 0.5, bgcolor: "#e3f2fd", color: "#1e88e5" }}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <PersonIcon sx={{ fontSize: 40, color: "#3f51b5", mr: 2 }} />
                            <Box>
                                <Typography variant="h6" fontWeight="600">
                                    Members
                                </Typography>
                                <Typography>{members.length} active members</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {members.map((member) => (
                                <Chip
                                    key={member.id}
                                    label={member.name}
                                    sx={{ m: 0.5, bgcolor: "#e8f5e9", color: "#388e3c" }}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <EventIcon sx={{ fontSize: 40, color: "#3f51b5", mr: 2 }} />
                            <Box>
                                <Typography variant="h6" fontWeight="600">
                                    Transactions
                                </Typography>
                                <Typography>
                                    {transactions.length} recorded transactions
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap" }}>
                            <Chip
                                label={`${transactions.filter((t) => t.status === "issued").length
                                    } Issued`}
                                sx={{ m: 0.5, bgcolor: "#fff8e1", color: "#ffa000" }}
                            />
                            <Chip
                                label={`${transactions.filter((t) => t.status === "returned").length
                                    } Returned`}
                                sx={{ m: 0.5, bgcolor: "#e8f5e9", color: "#388e3c" }}
                            />
                            <Chip
                                label={`${transactions.filter((t) => t.status === "overdue").length
                                    } Overdue`}
                                sx={{ m: 0.5, bgcolor: "#ffebee", color: "#d32f2f" }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ mb: 3, color: "#3f51b5" }}
                >
                    Recent Transactions
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Book</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Member</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Issue Date</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => {
                                const book = books.find((b) => b.id === transaction.bookId);
                                const member = members.find(
                                    (m) => m.id === transaction.memberId
                                );

                                return (
                                    <TableRow key={transaction.id} hover>
                                        <TableCell>#{transaction.id}</TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar
                                                    sx={{ bgcolor: "#e3f2fd", color: "#1e88e5", mr: 2 }}
                                                >
                                                    <BookIcon fontSize="small" />
                                                </Avatar>
                                                {book?.title || "Unknown Book"}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar
                                                    sx={{ bgcolor: "#e8f5e9", color: "#388e3c", mr: 2 }}
                                                >
                                                    <PersonIcon fontSize="small" />
                                                </Avatar>
                                                {member?.name || "Unknown Member"}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.issueDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.dueDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={
                                                    transaction.status.charAt(0).toUpperCase() +
                                                    transaction.status.slice(1)
                                                }
                                                sx={{
                                                    backgroundColor:
                                                        transaction.status === "returned"
                                                            ? "#4caf5020"
                                                            : transaction.status === "overdue"
                                                                ? "#f4433620"
                                                                : "#ff980020",
                                                    color:
                                                        transaction.status === "returned"
                                                            ? "#4caf50"
                                                            : transaction.status === "overdue"
                                                                ? "#f44336"
                                                                : "#ff9800",
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                startIcon={<ViewIcon />}
                                                onClick={() => openDialog(transaction)}
                                                sx={{
                                                    borderRadius: "8px",
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Box
                sx={{ textAlign: "center", p: 3, bgcolor: "#f5f5f5", borderRadius: 3 }}
            >
                <Typography variant="h6" sx={{ mb: 2, color: "#3f51b5" }}>
                    Try the Transaction Overview
                </Typography>
                <Typography sx={{ mb: 3, maxWidth: 600, mx: "auto", color: "#555" }}>
                    Click the "View" button on any transaction to see a detailed overview
                    with the option to print a receipt.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<ViewIcon />}
                    onClick={() => openDialog(transactions[1])}
                    sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        bgcolor: "#3f51b5",
                        "&:hover": { bgcolor: "#303f9f" },
                    }}
                >
                    View Sample Transaction
                </Button>
            </Box>

            <TransactionOverviewDialog
                open={dialogOpen}
                onClose={closeDialog}
                transaction={selectedTransaction}
                books={books}
                members={members}
            />
        </Container>
    );
};

export default TransactionOverviewDemo;
