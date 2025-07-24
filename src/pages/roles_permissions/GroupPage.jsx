import { useEffect, useState, useCallback } from "react";
import DataTable from "../common/DataTable";
import groupApi from "../../api/services/group.api";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../common/DialogeBox";
import AddGroupForm from "./group_page/AddGroupForm";
import ViewGroup from "./group_page/ViewGroup";
import DeleteDialog from "../common/DeleteBox";

const COLUMNS = [
  { id: "id", label: "Group ID" },
  { id: "organization_id", label: "Org ID" },
  { id: "name", label: "Group Name" },
];

const GroupPage = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await groupApi.getGroups();
      if (response.error) {
        console.error("Error fetching groups:", response.error);
        setGroups([]);
      } else {
        setGroups(response?.groups || []);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, [dialogState.add, dialogState.edit, dialogState.delete]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups, refreshFlag]);

  const handleDialogClose = (key) => () => {
    setDialogState((prev) => ({ ...prev, [key]: false }));
  };

  const handleGroupAction = (action, group = null) => {
    setSelectedGroup(group);
    setDialogState((prev) => ({ ...prev, [action]: true }));
  };

  const handleDeleteConfirm = async () => {
    if (!selectedGroup) return;
    try {
      await groupApi.deleteGroup(selectedGroup.id);
      handleDialogClose("delete")();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const controls = {
    title: "Group Management",
    onView: (row) => handleGroupAction("view", row),
    onEdit: (row) => handleGroupAction("edit", row),
    onDelete: (row) => handleGroupAction("delete", row),
  };

  return (
    <div>
      {/* Add Group Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={handleDialogClose("add")}
        title="Add New Group"
        maxWidth="sm"
      >
        <AddGroupForm handleClose={handleDialogClose("add")} />
      </DialogBox>

      {/* Edit Group Dialog */}
      <DialogBox
        open={dialogState.edit}
        handleClose={handleDialogClose("edit")}
        title="Edit Group"
        maxWidth="sm"
      >
        <AddGroupForm
          initialValues={selectedGroup}
          handleClose={handleDialogClose("edit")}
          edit={true}
        />
      </DialogBox>

      {/* View Group Dialog */}
      <DialogBox
        open={dialogState.view}
        handleClose={handleDialogClose("view")}
        title="Group Details"
        maxWidth="sm"
      >
        <ViewGroup
          group={selectedGroup}
          handleClose={handleDialogClose("view")}
        />
      </DialogBox>

      {/* Delete Group Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={handleDialogClose("delete")}
        itemName={selectedGroup?.name || ""}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable
        columns={COLUMNS}
        data={groups}
        controls={controls}
        onAdd={() => handleGroupAction("add")}
        emptyStateComponent={
          loading ? <CircularProgress /> : "No groups available"
        }
      />
    </div>
  );
};

export default GroupPage;
