import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";

const DialogBox = ({children,title="Item", open=false,handleClose=()=>{}}) => {
  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
         {children}
      </DialogContent>
      {/* <DialogActions>

        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions> 
      */}
    </Dialog>
  );
};

export default DialogBox;
