import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import seatApi from "../../api/services/seats.api";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../common/DialogeBox";
import AddSeatForm from "./seat_page/AddSeatForm";
import DeleteDialog from "../common/DeleteBox";

const SeatPage = () => {
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState([]);
  const [dialogOpen, setDialogOpen] = useState({
    add: false,
    view: false,
    edit: false,
    delete: false,
  });
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      const response = await seatApi.getSeats();
      if (response.error) {
        setSeats([]);
        console.error("Error fetching seats:", response.error);
        setLoading(false);
        return;
      }
      console.log("Seats:", response?.seats);
      setSeats(response?.seats || []);
      setLoading(false);
    };
    fetchSeats();
    setLoading(true);
  }, [dialogOpen.add, dialogOpen.edit, dialogOpen.delete]);

  // Column configuration
  const columns = [
    { id: "seat_id", label: "Seat ID" },
    { id: "seat_number", label: "Seat Number" },
    // {id :'status', label: 'Status', accessor: 'status'},
    { id: "location", label: "Location" },
    { id: "organization_id", label: "Organization ID" },
  ];

  // Control functions
  const controls = {
    title: "Book Management",
    onView: (row) => alert(`Viewing: ${row.name}`),
    onEdit: (row) => {
      setSelectedSeat(row);
      setDialogOpen({ ...dialogOpen, edit: true });
    },
    onDelete: (row) => {
      setSelectedSeat(row);
      setDialogOpen({ ...dialogOpen, delete: true });
    },
  };
  const handleDelete = async () => {
    if (!selectedSeat) return;
    const response = await seatApi.deleteSeat(selectedSeat.seat_id);
    if (response.error) {
      console.error("Error deleting seat:", response.error);
      return;
    }
    setDialogOpen({ ...dialogOpen, delete: false });
    setSelectedSeat(null);
  };
  return (
    <div>
      {/* Add Seat Dialog */}
      <DialogBox
        open={dialogOpen.add}
        handleClose={() => setDialogOpen({ ...dialogOpen, add: false })}
        title="Add Seat"
      >
        <AddSeatForm
          initialValues={{
            seat_number: "",
            location: "",
            organization_id: 101,
          }}
          handleClose={() => setDialogOpen({ ...dialogOpen, add: false })}
        />
      </DialogBox>
      {/* Edit Seat Dialog */}
      <DialogBox
        open={dialogOpen.edit}
        handleClose={() => setDialogOpen({ ...dialogOpen, edit: false })}
        title="Edit Seat"
      >
        <AddSeatForm
          initialValues={selectedSeat}
          edit={true}
          handleClose={() => setDialogOpen({ ...dialogOpen, edit: false })}
        />
      </DialogBox>
      {/* Delete Seat Dialog */}
      <DeleteDialog
        open={dialogOpen.delete}
        onClose={() => setDialogOpen({ ...dialogOpen, delete: false })}
        itemName={selectedSeat?.seat_number || ""}
        onConfirm={handleDelete}
      />
      <DataTable
        columns={columns}
        data={seats}
        controls={controls}
        onAdd={() => {
          setDialogOpen({ ...dialogOpen, add: true });
        }}
        emptyStateComponent={
          loading ? <CircularProgress /> : "No seats available"
        }
      />
    </div>
  );
};
export default SeatPage;
