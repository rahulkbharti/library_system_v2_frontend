import { useEffect, useState, useCallback } from "react";
import DataTable from "../common/DataTable";
import organizationApi from "../../api/services/organization.api";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../common/DialogeBox";
import AddOrganizationForm from "./organization_page/AddOrganizationForm";
import ViewOrganization from "./organization_page/ViewOrganization";
import DeleteDialog from "../common/DeleteBox";

const COLUMNS = [
  { id: "organization_id", label: "Organization ID" },
  { id: "name", label: "Name" },
  { id: "address", label: "Address" },
  { id: "created_by_admin", label: "Admin ID" },
];

const OrganizationPage = () => {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchOrganizations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await organizationApi.getOrganizations();
      if (response.error) {
        console.error("Error fetching organizations:", response.error);
        setOrganizations([]);
      } else {
        setOrganizations(response?.organizations || []);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  }, [dialogState.add, dialogState.edit, dialogState.delete]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations, refreshFlag]);

  const handleDialogClose = (key) => () => {
    setDialogState((prev) => ({ ...prev, [key]: false }));
  };

  const handleOrganizationAction = (action, organization = null) => {
    setSelectedOrganization(organization);
    setDialogState((prev) => ({ ...prev, [action]: true }));
  };

  const handleDeleteConfirm = async () => {
    if (!selectedOrganization) return;
    try {
      await organizationApi.deleteOrganization(
        selectedOrganization.organization_id
      );
      handleDialogClose("delete")();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const controls = {
    title: "Organization Management",
    onView: (row) => handleOrganizationAction("view", row),
    onEdit: (row) => handleOrganizationAction("edit", row),
    onDelete: (row) => handleOrganizationAction("delete", row),
  };

  return (
    <div>
      {/* Add Organization Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={handleDialogClose("add")}
        title="Add New Organization"
        maxWidth="md"
      >
        <AddOrganizationForm handleClose={handleDialogClose("add")} />
      </DialogBox>

      {/* Edit Organization Dialog */}
      <DialogBox
        open={dialogState.edit}
        handleClose={handleDialogClose("edit")}
        title="Edit Organization"
        maxWidth="md"
      >
        <AddOrganizationForm
          initialValues={selectedOrganization}
          handleClose={handleDialogClose("edit")}
          edit={true}
        />
      </DialogBox>

      {/* View Organization Dialog */}
      <DialogBox
        open={dialogState.view}
        handleClose={handleDialogClose("view")}
        title="Organization Details"
        maxWidth="md"
      >
        <ViewOrganization
          organization={selectedOrganization}
          handleClose={handleDialogClose("view")}
        />
      </DialogBox>

      {/* Delete Organization Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={handleDialogClose("delete")}
        itemName={selectedOrganization?.name || ""}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable
        columns={COLUMNS}
        data={organizations}
        controls={controls}
        onAdd={() => handleOrganizationAction("add")}
        emptyStateComponent={
          loading ? <CircularProgress /> : "No organizations available"
        }
      />
    </div>
  );
};

export default OrganizationPage;
