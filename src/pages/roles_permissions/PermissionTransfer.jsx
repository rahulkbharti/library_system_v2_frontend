import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import {
  Box, Button, Grid, List, ListItem, ListItemText, Paper, Typography, Divider, Checkbox,
  TextField, IconButton, Chip, FormControl, InputLabel, Select, MenuItem, Container,
  CircularProgress, Snackbar, Alert
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';

import groupApi from '../../api/services/group.api';

// --- Configuration (No changes here) ---
const ALL_PERMISSIONS = [
  { key: 'ADD_BOOK', desc: 'Add Book', category: 'Book Management' },
  { key: 'EDIT_BOOK', desc: 'Edit Book', category: 'Book Management' },
  { key: 'DELETE_BOOK', desc: 'Delete Book', category: 'Book Management' },
  { key: 'VIEW_BOOK', desc: 'View Book', category: 'Book Management' },
  { key: 'ADD_SEAT', desc: 'Add Seat', category: 'Seat Management' },
  { key: 'EDIT_SEAT', desc: 'Edit Seat', category: 'Seat Management' },
  { key: 'DELETE_SEAT', desc: 'Delete Seat', category: 'Seat Management' },
  { key: 'VIEW_SEAT', desc: 'View Seat', category: 'Seat Management' },
  { key: 'ADD_GROUP', desc: 'Add Group', category: 'Group Management' },
  { key: 'EDIT_GROUP', desc: 'Edit Group', category: 'Group Management' },
];
const PERMISSION_CATEGORIES = [...new Set(ALL_PERMISSIONS.map(p => p.category))];

// --- Reusable Memoized UI Components (No changes here) ---
const CustomList = memo(({ title, items, checked, onToggle, onSearch }) => (
  <Paper sx={{ width: 300, height: 400, display: 'flex', flexDirection: 'column' }}>
    <Box p={2}>
      <Typography variant="h6" component="div">{title}</Typography>
      {onSearch && (
        <TextField
          size="small" placeholder="Search..." fullWidth margin="normal"
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
        />
      )}
    </Box>
    <Divider />
    <List dense component="div" role="list" sx={{ flexGrow: 1, overflow: 'auto' }}>
      {items.map((p) => (
        <ListItem key={p.key} role="listitem" button onClick={() => onToggle(p.key)}>
          <Checkbox checked={checked.includes(p.key)} tabIndex={-1} disableRipple />
          <ListItemText primary={p.desc} secondary={p.key} />
        </ListItem>
      ))}
    </List>
  </Paper>
));

const AssignPermissionsUI = memo(({
  group, groups, available, assigned, onGroupChange, onPermissionsChange
}) => {
  const [checked, setChecked] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAvailable = useMemo(() =>
    available.filter(p => p.desc.toLowerCase().includes(searchTerm.toLowerCase())),
    [available, searchTerm]
  );
  
  const handleToggle = (key) => {
    setChecked(prev => prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]);
  };
  
  const handleMove = (direction) => {
    let newAssigned;
    if (direction === 'right') {
      newAssigned = [...assigned.map(p => p.key), ...checked];
    } else {
      newAssigned = assigned.map(p => p.key).filter(key => !checked.includes(key));
    }
    onPermissionsChange(newAssigned.sort());
    setChecked([]);
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ maxWidth: 500, mb: 4 }}>
        <InputLabel id="group-select-label">Select Group</InputLabel>
        <Select size='small' labelId="group-select-label" value={group} label="Select Group" onChange={(e) => onGroupChange(e.target.value)}>
          <MenuItem value=""><em>Select a Group to Assign Permissions</em></MenuItem>
          {groups.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
        </Select>
      </FormControl>

      {group && (
        <Grid container spacing={2} alignItems="center">
          <Grid item><CustomList title="Available Permissions" items={filteredAvailable} checked={checked} onToggle={handleToggle} onSearch={setSearchTerm} /></Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <IconButton onClick={() => handleMove('right')} disabled={!checked.length}><ChevronRightIcon /></IconButton>
              <IconButton onClick={() => handleMove('left')} disabled={!checked.length}><ChevronLeftIcon /></IconButton>
            </Grid>
          </Grid>
          <Grid item><CustomList title="Assigned Permissions" items={assigned} checked={checked} onToggle={handleToggle} /></Grid>
        </Grid>
      )}
    </Box>
  );
});

// --- Main Page Component (Container with State Logic) ---
const PermissionPage = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  
  const [serverPermissions, setServerPermissions] = useState({});
  const [draftPermissions, setDraftPermissions] = useState({});
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // const fetchedGroups = ['Admin', 'Librarian', 'Student'];
      const fetchedPermissions = {
        'Admin': ['ADD_BOOK', 'EDIT_BOOK', 'DELETE_BOOK', 'VIEW_BOOK', 'ADD_SEAT', 'EDIT_SEAT', 'DELETE_SEAT', 'VIEW_SEAT'],
        'Librarian': ['ADD_BOOK', 'EDIT_BOOK', 'VIEW_BOOK', 'ADD_SEAT', 'VIEW_SEAT'],
        'Student': ['VIEW_BOOK', 'VIEW_SEAT'],
      };
      // setGroups(fetchedGroups);
      setServerPermissions(fetchedPermissions);
      setDraftPermissions(fetchedPermissions);
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(()=>{
     const fetch_group = async ()=>{
        const result = await groupApi.getGroups();
        console.log(result.groups.map(item => item.name));
        setGroups(result.groups.map(item => item.name))
     } 
     fetch_group();
  })
  const handleGroupChange = useCallback((group) => {
    if (JSON.stringify(serverPermissions) !== JSON.stringify(draftPermissions)) {
        if (!window.confirm("You have unsaved changes. Are you sure you want to switch groups? Your changes will be lost.")) {
            return;
        }
    }
    setSelectedGroup(group);
    setDraftPermissions(serverPermissions);
  }, [serverPermissions, draftPermissions]);

  const handleDraftChange = useCallback((newPermissions) => {
    setDraftPermissions(prev => ({ ...prev, [selectedGroup]: newPermissions }));
  }, [selectedGroup]);

  const handleSave = useCallback(() => {
    setLoading(true);
    console.log("SAVING TO SERVER:", { group: selectedGroup, permissions: draftPermissions[selectedGroup] });
    setTimeout(() => {
      setServerPermissions(draftPermissions);
      setLoading(false);
      setSnackbar({ open: true, message: `Permissions for ${selectedGroup} saved successfully!`, severity: 'success' });
    }, 1000);
  }, [draftPermissions, selectedGroup]);

  const assignedDraft = useMemo(() => 
    ALL_PERMISSIONS.filter(p => draftPermissions[selectedGroup]?.includes(p.key)),
    [draftPermissions, selectedGroup]
  );
  
  const availableDraft = useMemo(() => 
    ALL_PERMISSIONS.filter(p => !draftPermissions[selectedGroup]?.includes(p.key)),
    [draftPermissions, selectedGroup]
  );
  
  const hasUnsavedChanges = useMemo(() => 
    JSON.stringify(serverPermissions[selectedGroup]) !== JSON.stringify(draftPermissions[selectedGroup]),
    [serverPermissions, draftPermissions, selectedGroup]
  );

  if (loading && !selectedGroup) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  }

  return (
   <>
      <Paper elevation={3} sx={{ p: 3, position: 'relative' }}>
        {loading && <CircularProgress sx={{ position: 'absolute', top: 16, right: 16 }} />}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" component="h2">Permission Management</Typography>
            <Button 
                variant="contained" 
                startIcon={<SaveIcon />} 
                onClick={handleSave}
                disabled={!selectedGroup || !hasUnsavedChanges || loading}
            >
                Save Changes
            </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <AssignPermissionsUI
          group={selectedGroup}
          groups={groups}
          available={availableDraft}
          assigned={assignedDraft}
          onGroupChange={handleGroupChange}
          onPermissionsChange={handleDraftChange}
        />
        
        {/* Assigned Permissions Summary */}
        {selectedGroup && (
          <Box mt={5}>
            <Divider sx={{ mb: 3 }} />
            {/* CHANGED: Title now reflects the draft state */}
            <Typography variant="h5" gutterBottom>
                Permissions To Be Saved for <Chip label={selectedGroup} color="primary" />
            </Typography>
            <Grid container spacing={2}>
              {PERMISSION_CATEGORIES.map(category => {
                // CHANGED: Summary now shows the DRAFT, not the saved permissions
                const permissionsInCategory = (draftPermissions[selectedGroup] || []).filter(key => ALL_PERMISSIONS.find(p => p.key === key)?.category === category);
                
                if (permissionsInCategory.length === 0) return null;
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={category}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>{category}</Typography>
                        <Box>
                        {permissionsInCategory.map(key => (
                            <Chip 
                                key={key} 
                                icon={<LockIcon fontSize="small" />} 
                                label={ALL_PERMISSIONS.find(p => p.key === key)?.desc} 
                                sx={{ m: 0.5 }}
                                // CHANGED: Added onDelete handler
                                onDelete={() => {
                                    const currentPermissions = draftPermissions[selectedGroup] || [];
                                    const newPermissions = currentPermissions.filter(pKey => pKey !== key);
                                    handleDraftChange(newPermissions);
                                }}
                            />
                        ))}
                        </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar(prev => ({...prev, open: false}))}>
        <Alert onClose={() => setSnackbar(prev => ({...prev, open: false}))} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
        </Alert>
      </Snackbar>
      </>
  );
};

export default PermissionPage;