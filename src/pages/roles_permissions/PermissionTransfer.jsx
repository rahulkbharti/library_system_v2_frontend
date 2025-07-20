import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
  Checkbox,
  TextField,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Search from "@mui/icons-material/Search";
import Lock from "@mui/icons-material/Lock";
import Save from "@mui/icons-material/Save";
import groupApi from "../../api/services/group.api";
import ALL_PERMISSIONS from "../../constants/permissions";
import groupPermissionApi from "../../api/services/group_permission.api";

// Create lookup maps for better performance
const PERMISSION_ID_TO_KEY = ALL_PERMISSIONS.reduce((acc, perm) => {
  acc[perm.id] = perm.key;
  return acc;
}, {});

const PERMISSION_KEY_TO_ID = ALL_PERMISSIONS.reduce((acc, perm) => {
  acc[perm.key] = perm.id;
  return acc;
}, {});

const PermissionList = React.memo(({ title, items, checked, onToggle, onSearch }) => (
  <Paper sx={{ width: 300, height: 400, display: "flex", flexDirection: "column" }}>
    <Box p={2}>
      <Typography variant="h6">{title}</Typography>
      {onSearch && (
        <TextField
          size="small"
          placeholder="Search..."
          fullWidth
          InputProps={{
            startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
          }}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
    </Box>
    <Divider />
    <List dense sx={{ flexGrow: 1, overflow: "auto" }}>
      {items.map((p) => (
        <ListItem key={p.key} button onClick={() => onToggle(p.key)}>
          <Checkbox checked={checked.includes(p.key)} tabIndex={-1} disableRipple />
          <ListItemText primary={p.desc} secondary={p.key} />
        </ListItem>
      ))}
    </List>
  </Paper>
));

const PermissionPage = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [permissions, setPermissions] = useState({});
  const [draft, setDraft] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [checked, setChecked] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupNameToId, setGroupNameToId] = useState({});

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [groupsRes, permissionsRes] = await Promise.all([
        groupApi.getGroups(),
        groupPermissionApi.getGroupPermissions(),
      ]);

      // Create group name to ID mapping
      const groupMap = groupsRes.groups.reduce((acc, group) => {
        acc[group.name] = group.id;
        return acc;
      }, {});
      setGroupNameToId(groupMap);
      setGroups(groupsRes.groups.map((g) => g.name));

      // Initialize permissions structure with all groups
      const permissionsData = groupsRes.groups.reduce((acc, group) => {
        acc[group.name] = [];
        return acc;
      }, {});
      
      console.log("permissionsRes",permissionsRes)
      // Process permissions response
      if (permissionsRes.groups && permissionsRes.groups.length) {
        permissionsRes.groups.forEach(({ group_id, permission_id }) => {
          // Find group name for this permission
          const group = groupsRes.groups.find(g => g.id === group_id);
          if (group && PERMISSION_ID_TO_KEY[permission_id]) {
            const permissionKey = PERMISSION_ID_TO_KEY[permission_id];
            permissionsData[group.name].push(permissionKey);
          }
        });
      }

      setPermissions(permissionsData);
      setDraft(permissionsData);
      
    } catch (error) {
      console.error("Failed to load data", error);
      setSnackbar({
        open: true,
        message: "Failed to load data",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { assigned, available } = useMemo(() => {
    if (!selectedGroup) return { assigned: [], available: [] };

    const assignedKeys = draft[selectedGroup] || [];
    const lowerSearchTerm = searchTerm.toLowerCase();

    return {
      assigned: ALL_PERMISSIONS.filter((p) => assignedKeys.includes(p.key)),
      available: ALL_PERMISSIONS.filter(
        (p) => !assignedKeys.includes(p.key) &&
          (p.desc.toLowerCase().includes(lowerSearchTerm) || 
           p.key.toLowerCase().includes(lowerSearchTerm))
      ),
    };
  }, [draft, selectedGroup, searchTerm]);

  const hasChanges = useMemo(() => {
    if (!selectedGroup) return false;
    const current = permissions[selectedGroup] || [];
    const updated = draft[selectedGroup] || [];
    return current.length !== updated.length || 
           current.some((perm) => !updated.includes(perm)) ||
           updated.some((perm) => !current.includes(perm));
  }, [permissions, draft, selectedGroup]);

  const handlePermissionChange = useCallback((newPermissions) => {
    setDraft((prev) => ({ ...prev, [selectedGroup]: newPermissions }));
  }, [selectedGroup]);

  const handleSave = useCallback(async () => {
    if (!selectedGroup) return;

    setLoading(true);
    try {
      const previous = permissions[selectedGroup] || [];
      const updated = draft[selectedGroup] || [];
      
      // Convert permission keys to IDs
      const added = updated
        .filter(permKey => !previous.includes(permKey))
        .map(permKey => PERMISSION_KEY_TO_ID[permKey]);
      
      const removed = previous
        .filter(permKey => !updated.includes(permKey))
        .map(permKey => PERMISSION_KEY_TO_ID[permKey]);

      // Prepare the change object for logging
      const changes = {
        group_id: groupNameToId[selectedGroup],
        added_permissions: added,
        removed_permissions: removed
      };

      console.log("Permission changes:", changes);
      const result = await groupPermissionApi.updateGroupPermission(changes);
      if (result.error) {
        alert()
        throw new Error(result.error);
      }
      console.log("Update result:", result);

      // Here you would make actual API calls
      // Example:
      // if (added.length) await groupPermissionApi.addPermissions(groupNameToId[selectedGroup], added);
      // if (removed.length) await groupPermissionApi.removePermissions(groupNameToId[selectedGroup], removed);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update state
      setPermissions(prev => ({ ...prev, [selectedGroup]: updated }));
      
      setSnackbar({
        open: true,
        message: "Permissions saved successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to save permissions", error);
      setSnackbar({ 
        open: true, 
        message: "Failed to save permissions", 
        severity: "error" 
      });
    } finally {
      setLoading(false);
    }
  }, [selectedGroup, permissions, draft, groupNameToId]);

  const handleMove = useCallback((direction) => {
    if (!selectedGroup) return;

    const currentPermissions = draft[selectedGroup] || [];
    let newPermissions;

    if (direction === "right") {
      newPermissions = [...new Set([...currentPermissions, ...checked])];
    } else {
      newPermissions = currentPermissions.filter((key) => !checked.includes(key));
    }

    handlePermissionChange(newPermissions);
    setChecked([]);
  }, [selectedGroup, draft, checked, handlePermissionChange]);

  const handleToggle = useCallback((key) => {
    setChecked((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  }, []);

  const handleGroupChange = useCallback((e) => {
    const newGroup = e.target.value;
    if (hasChanges && !window.confirm("You have unsaved changes. Discard them?")) {
      return;
    }
    setSelectedGroup(newGroup);
    setChecked([]);
    setSearchTerm("");
  }, [hasChanges]);

  return (
    <Paper elevation={3} sx={{ p: 3, position: "relative" }}>
      {loading && (
        <CircularProgress sx={{ position: "absolute", top: 16, right: 16 }} />
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Permission Management</Typography>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={!selectedGroup || !hasChanges || loading}
        >
          Save Changes
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <FormControl fullWidth sx={{ mb: 4, maxWidth: 500 }}>
        <InputLabel>Select Group</InputLabel>
        <Select
          size="small"
          value={selectedGroup}
          label="Select Group"
          onChange={handleGroupChange}
          disabled={loading}
        >
          <MenuItem value="">
            <em>Select a Group</em>
          </MenuItem>
          {groups.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedGroup && (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <PermissionList
                title="Available Permissions"
                items={available}
                checked={checked}
                onToggle={handleToggle}
                onSearch={setSearchTerm}
              />
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton
                    onClick={() => handleMove("right")}
                    disabled={!checked.length || loading}
                    aria-label="Add permissions"
                  >
                    <ChevronRight />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => handleMove("left")}
                    disabled={!checked.length || loading}
                    aria-label="Remove permissions"
                  >
                    <ChevronLeft />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <PermissionList
                title="Assigned Permissions"
                items={assigned}
                checked={checked}
                onToggle={handleToggle}
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              Current Permissions for{" "}
              <Chip label={selectedGroup} color="primary" />
            </Typography>
            {assigned.length === 0 ? (
              <Typography color="text.secondary">
                No permissions assigned
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {[...new Set(assigned.map((p) => p.category))].map((category) => (
                  <Grid item xs={12} sm={6} md={4} key={category}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography color="text.secondary" gutterBottom>
                        {category}
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {assigned
                          .filter((p) => p.category === category)
                          .map((p) => (
                            <Chip
                              key={p.key}
                              icon={<Lock fontSize="small" />}
                              label={p.desc}
                              onDelete={() =>
                                handlePermissionChange(
                                  (draft[selectedGroup] || []).filter(
                                    (k) => k !== p.key
                                  )
                                )
                              }
                            />
                          ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PermissionPage;