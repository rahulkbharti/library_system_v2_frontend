import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


const PermissionManagement = () => {
  // State for permission groups and permissions
  const [groups, setGroups] = useState([
    { id: 1, name: 'Admins', permissions: ['create', 'read', 'update', 'delete', 'manage_users'] },
    { id: 2, name: 'Editors', permissions: ['read', 'update'] },
    { id: 3, name: 'Viewers', permissions: ['read'] },
  ]);
  
  const [allPermissions, setAllPermissions] = useState([
    { id: 'create', name: 'Create' },
    { id: 'read', name: 'Read' },
    { id: 'update', name: 'Update' },
    { id: 'delete', name: 'Delete' },
    { id: 'manage_users', name: 'Manage Users' },
    { id: 'manage_settings', name: 'Manage Settings' },
  ]);

  // Form states
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Initialize selected permissions when group is selected
  useEffect(() => {
    if (selectedGroup) {
      setSelectedPermissions(selectedGroup.permissions);
    }
  }, [selectedGroup]);

  // Handle permission toggle
  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  // Create new permission group
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    
    const newGroup = {
      id: Date.now(),
      name: newGroupName.trim(),
      permissions: []
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setSelectedGroup(newGroup);
    setEditMode(true);
  };

  // Update existing group
  const handleUpdateGroup = () => {
    if (!selectedGroup) return;
    
    setGroups(groups.map(group =>
      group.id === selectedGroup.id
        ? { ...group, permissions: selectedPermissions }
        : group
    ));
    
    setEditMode(false);
    setOpenDialog(false);
  };

  // Delete group
  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
    if (selectedGroup && selectedGroup.id === groupId) {
      setSelectedGroup(null);
      setEditMode(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditMode(false);
    if (selectedGroup) {
      setSelectedPermissions(selectedGroup.permissions);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Permission Management
      </Typography>
      
      <Grid container spacing={3}>
        {/* Left Panel - Groups List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Permission Groups
              </Typography>
              
              {/* Create New Group */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="New Group Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateGroup}
                  disabled={!newGroupName.trim()}
                >
                  Add
                </Button>
              </Box>
              
              {/* Groups List */}
              <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
                <List dense>
                  {groups.map(group => (
                    <ListItem
                      key={group.id}
                      secondaryAction={
                        <Box>
                          <Tooltip title="Edit">
                            <IconButton
                              edge="end"
                              onClick={() => {
                                setSelectedGroup(group);
                                setEditMode(true);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              edge="end"
                              onClick={() => handleDeleteGroup(group.id)}
                              disabled={group.name === 'Admins'}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                      selected={selectedGroup?.id === group.id}
                      onClick={() => {
                        setSelectedGroup(group);
                        setEditMode(false);
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      <ListItemText
                        primary={group.name}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                            {group.permissions.slice(0, 3).map(perm => (
                              <Chip
                                key={perm}
                                label={perm}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                            {group.permissions.length > 3 && (
                              <Chip
                                label={`+${group.permissions.length - 3}`}
                                size="small"
                              />
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Right Panel - Permissions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {selectedGroup ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      {editMode ? 'Edit Permissions' : 'View Permissions'} for {selectedGroup.name}
                    </Typography>
                    
                    {!editMode ? (
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={() => setOpenDialog(true)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  {/* Permissions List */}
                  <Grid container spacing={2}>
                    {allPermissions.map(permission => (
                      <Grid item xs={12} sm={6} md={4} key={permission.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedPermissions.includes(permission.id)}
                              onChange={() => handlePermissionToggle(permission.id)}
                              disabled={!editMode}
                            />
                          }
                          label={permission.name}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    Select a permission group to view or edit permissions
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Save Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to update permissions for {selectedGroup?.name}?
          </Typography>
          <Box sx={{ mt: 2 }}>
            {selectedPermissions.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {selectedPermissions.map(perm => (
                  <Chip key={perm} label={perm} size="small" />
                ))}
              </Box>
            ) : (
              <Typography color="error">No permissions selected!</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdateGroup}
            disabled={selectedPermissions.length === 0}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionManagement;