import { useEffect, useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import DataTable from "../common/DataTable";
import organizationApi from "../../api/services/organization.api";
import DialogBox from "../common/DialogeBox";
import AddOrganizationForm from "./organization_page/AddOrganizationForm";
import ViewOrganization from "./organization_page/ViewOrganization";
import DeleteDialog from "../common/DeleteBox";
import {
  setOrganizations,
  selectOrganization,
} from "../../store/features/organization/organizationSlice";

const OrganizationPage = () => {
  const dispatch = useDispatch();
  const { organizations, selectedOrganization } = useSelector(
    (state) => state.organization
  );
  const admin_id = useSelector(
    (state) => state?.auth?.login_data?.userData?.admin_id
  );

  const [loading, setLoading] = useState(true);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedOrgForAction, setSelectedOrgForAction] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleActivation = useCallback(
    (row) => {
      setLoading(true);
      dispatch(selectOrganization(row));
      setLoading(false);
    },
    [dispatch]
  );

  const COLUMNS = useMemo(
    () => [
      { id: "organization_id", label: "Organization ID" },
      { id: "name", label: "Name" },
      { id: "address", label: "Address" },
      { id: "created_by_admin", label: "Admin ID" },
      {
        label: "Active",
        render: (row) =>
          row.organization_id === selectedOrganization?.organization_id ? (
            "Active"
          ) : (
            <Button
              size="small"
              variant="contained"
              onClick={() => handleActivation(row)}
            >
              Activate
            </Button>
          ),
      },
    ],
    [selectedOrganization, handleActivation, refreshFlag]
  );

  const fetchOrganizations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await organizationApi.getOrganizations(admin_id);
      if (response.error) {
        console.error("Error fetching organizations:", response.error);
      } else {
        dispatch(setOrganizations(response?.organizations || []));
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  }, [admin_id, dispatch]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations, refreshFlag]);

  const handleDialogClose = useCallback(
    (key) => () => {
      setDialogState((prev) => ({ ...prev, [key]: false }));
    },
    []
  );

  const handleOrganizationAction = useCallback(
    (action, organization = null) => {
      setSelectedOrgForAction(organization);
      setDialogState((prev) => ({ ...prev, [action]: true }));
    },
    []
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedOrgForAction) return;
    try {
      await organizationApi.deleteOrganization(
        selectedOrgForAction.organization_id
      );
      handleDialogClose("delete")();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  }, [selectedOrgForAction, handleDialogClose]);

  const controls = useMemo(
    () => ({
      title: "Organization Management",
      onView: (row) => handleOrganizationAction("view", row),
      onEdit: (row) => handleOrganizationAction("edit", row),
      onDelete: (row) => handleOrganizationAction("delete", row),
    }),
    [handleOrganizationAction]
  );

  return (
    <div>
      {/* Add Organization Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={handleDialogClose("add")}
        title="Add New Organization"
        maxWidth="md"
      >
        <AddOrganizationForm
          handleClose={handleDialogClose("add")}
          organizations={organizations}
        />
      </DialogBox>

      {/* Edit Organization Dialog */}
      <DialogBox
        open={dialogState.edit}
        handleClose={handleDialogClose("edit")}
        title="Edit Organization"
        maxWidth="md"
      >
        <AddOrganizationForm
          initialValues={selectedOrgForAction}
          handleClose={handleDialogClose("edit")}
          edit
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
          organization={selectedOrgForAction}
          handleClose={handleDialogClose("view")}
        />
      </DialogBox>

      {/* Delete Organization Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={handleDialogClose("delete")}
        itemName={selectedOrgForAction?.name || ""}
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
