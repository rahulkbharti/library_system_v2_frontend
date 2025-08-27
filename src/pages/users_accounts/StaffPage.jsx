import { useEffect, useState, useCallback } from "react";
import DataTable from "../common/DataTable";
import staffApi from "../../api/services/staff.api";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../common/DialogeBox";
import AddStaffForm from "./staff_page/AddStaffForm";
import ViewStaff from "./staff_page/ViewStaff";
import DeleteDialog from "../common/DeleteBox";

const COLUMNS = [
  { id: "user_id", label: "Staff ID" },
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "group_id", label: "Group ID" },
  { id: "organization_id", label: "Organization ID" },
];

const StaffPage = () => {
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchStaffs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await staffApi.getStaffs();
      if (response.error) {
        console.error("Error fetching staff:", response.error);
        setStaffs([]);
      } else {
        setStaffs(response?.staffs || []);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      setStaffs([]);
    } finally {
      setLoading(false);
    }
  }, [dialogState.add, dialogState.edit, dialogState.delete]);

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs, refreshFlag]);

  const handleDialogClose = (key) => () => {
    setDialogState((prev) => ({ ...prev, [key]: false }));
  };

  const handleStaffAction = (action, staff = null) => {
    setSelectedStaff(staff);
    setDialogState((prev) => ({ ...prev, [action]: true }));
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStaff) return;
    try {
      await staffApi.deleteStaff(selectedStaff.user_id);
      handleDialogClose("delete")();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const controls = {
    title: "Staff Management",
    onView: (row) => handleStaffAction("view", row),
    onEdit: (row) => handleStaffAction("edit", row),
    onDelete: (row) => handleStaffAction("delete", row),
  };

  return (
    <div>
      {/* Add Staff Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={handleDialogClose("add")}
        title="Add New Staff"
        maxWidth="md"
      >
        <AddStaffForm handleClose={handleDialogClose("add")} />
      </DialogBox>

      {/* Edit Staff Dialog */}
      <DialogBox
        open={dialogState.edit}
        handleClose={handleDialogClose("edit")}
        title="Edit Staff"
        maxWidth="md"
      >
        <AddStaffForm
          initialValues={selectedStaff}
          handleClose={handleDialogClose("edit")}
          edit={true}
        />
      </DialogBox>

      {/* View Staff Dialog */}
      <DialogBox
        open={dialogState.view}
        handleClose={handleDialogClose("view")}
        title="Staff Details"
        maxWidth="md"
      >
        <ViewStaff
          staff={selectedStaff}
          handleClose={handleDialogClose("view")}
        />
      </DialogBox>

      {/* Delete Staff Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={handleDialogClose("delete")}
        itemName={selectedStaff?.username || ""}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable
        columns={COLUMNS}
        data={staffs}
        controls={controls}
        onAdd={() => handleStaffAction("add")}
        emptyStateComponent={
          loading ? <CircularProgress /> : "No staff members available"
        }
      />
    </div>
  );
};

export default StaffPage;
