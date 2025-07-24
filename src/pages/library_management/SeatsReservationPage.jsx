import { useEffect, useState, useCallback } from "react";

import reservationApi from "../../api/services/seat_reservations.api";
import CircularProgress from "@mui/material/CircularProgress";

import AddReservationForm from "./reservation_page/AddReservationForm";
import ViewReservation from "./reservation_page/ViewReservation";
import DialogBox from "../common/DialogeBox";
import DataTable from "../common/DataTable";
import DeleteDialog from "../common/DeleteBox";

const COLUMNS = [
  { id: "reservation_id", label: "Reservation ID" },
  { id: "seat_id", label: "Seat ID" },
  { id: "user_id", label: "User ID" },
  // { id: "reservation_date", label: "Date" },
  { id: "start_time", label: "Start Time" },
  { id: "end_time", label: "End Time" },
];

const ReservationPage = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await reservationApi.getReservations();
      if (response.error) {
        console.error("Error fetching reservations:", response.error);
        setReservations([]);
      } else {
        console.log("Reservations:", response);
        setReservations(response?.reservations || []);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, [dialogState.add, dialogState.edit, dialogState.delete]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations, refreshFlag]);

  const handleDialogClose = (key) => () => {
    setDialogState((prev) => ({ ...prev, [key]: false }));
  };

  const handleReservationAction = (action, reservation = null) => {
    setSelectedReservation(reservation);
    setDialogState((prev) => ({ ...prev, [action]: true }));
  };

  const handleDeleteConfirm = async () => {
    if (!selectedReservation) return;
    try {
      await reservationApi.deleteReservation(
        selectedReservation.reservation_id
      );
      handleDialogClose("delete")();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const controls = {
    title: "Reservation Management",
    onView: (row) => handleReservationAction("view", row),
    onEdit: (row) => handleReservationAction("edit", row),
    onDelete: (row) => handleReservationAction("delete", row),
  };

  return (
    <div>
      {/* Add Reservation Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={handleDialogClose("add")}
        title="Add New Reservation"
        maxWidth="md"
      >
        <AddReservationForm handleClose={handleDialogClose("add")} />
      </DialogBox>

      {/* Edit Reservation Dialog */}
      <DialogBox
        open={dialogState.edit}
        handleClose={handleDialogClose("edit")}
        title="Edit Reservation"
        maxWidth="md"
      >
        <AddReservationForm
          initialValues={selectedReservation}
          handleClose={handleDialogClose("edit")}
          edit={true}
        />
      </DialogBox>

      {/* View Reservation Dialog */}
      <DialogBox
        open={dialogState.view}
        handleClose={handleDialogClose("view")}
        title="View Reservation"
        maxWidth="md"
      >
        <ViewReservation
          reservation={selectedReservation}
          handleClose={handleDialogClose("view")}
        />
      </DialogBox>

      {/* Delete Reservation Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={handleDialogClose("delete")}
        itemName={`Reservation #${selectedReservation?.reservation_id || ""}`}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable
        columns={COLUMNS}
        data={reservations}
        controls={controls}
        onAdd={() => handleReservationAction("add")}
        emptyStateComponent={
          loading ? <CircularProgress /> : "No reservations available"
        }
      />
    </div>
  );
};

export default ReservationPage;
