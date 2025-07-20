import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

const DeleteDialog = ({ 
  open, 
  onClose, 
  itemName, 
  onConfirm 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={isDeleting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ color: 'error.main', fontWeight: 'bold' }}>
        Confirm Deletion
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText>
          Are you sure you want to permanently delete{" "}
          <strong style={{ color: 'error.dark' }}>{itemName}</strong>?
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ mr: 2 }}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disableElevation
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isDeleting ? "Deleting..." : "Confirm Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;