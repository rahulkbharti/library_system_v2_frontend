import React, { useState } from 'react';
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
  Menu,
  MenuItem,
  Checkbox,
  TextField,
  IconButton,
  Chip
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const PermissionTransferList = ({ initialPermissions = [], onPermissionsChange }) => {
  // Categorized permissions
  const permissionCategories = {
    'Book Management': [
      'ADD_BOOK',
      'EDIT_BOOK',
      'VIEW_BOOK',
      'DELETE_BOOK'
    ],
    'Book Copy Management': [
      'ADD_BOOK_COPY',
      'EDIT_BOOK_COPY',
      'DELETE_BOOK_COPY',
      'VIEW_BOOK_COPY'
    ],
    'Seat Management': [
      'VIEW_SEATS',
      'ADD_SEAT',
      'EDIT_SEAT',
      'DELETE_SEAT',
      'VIEW_SEAT'
    ],
    'Seat Reservation': [
      'ADD_SEAT_RESERVATION',
      'EDIT_SEAT_RESERVATION',
      'DELETE_SEAT_RESERVATION',
      'VIEW_SEAT_RESERVATION'
    ],
    'Group Management': [
      'ADD_GROUP',
      'EDIT_GROUP',
      'DELETE_GROUP',
      'VIEW_GROUP'
    ],
    'Permission Management': [
      'ADD_GROUP_PERMISSION',
      'EDIT_GROUP_PERMISSION',
      'DELETE_GROUP_PERMISSION',
      'VIEW_GROUP_PERMISSION'
    ]
  };

  // Flatten all permissions for search
  const allPermissions = Object.values(permissionCategories).flat();

  // State management
  const [selectedCategory, setSelectedCategory] = useState('Book Management');
  const [leftItems, setLeftItems] = useState(
    permissionCategories[selectedCategory]?.filter(p => !initialPermissions.includes(p))
  );
  const [rightItems, setRightItems] = useState(initialPermissions);
  const [checked, setChecked] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowAll(false);
    updateLeftItems(category);
    handleMenuClose();
  };

  const updateLeftItems = (category) => {
    const categoryPermissions = permissionCategories[category];
    setLeftItems(categoryPermissions.filter(p => !rightItems.includes(p)));
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSelectedCategory('All Permissions');
    setLeftItems(allPermissions.filter(p => !rightItems.includes(p)));
    handleMenuClose();
  };

  // Checkbox handlers
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Transfer handlers
  const handleCheckedRight = () => {
    const newRightItems = [...rightItems, ...checked];
    setRightItems(newRightItems);
    setLeftItems(leftItems.filter(value => !checked.includes(value)));
    setChecked([]);
    
    if (onPermissionsChange) {
      onPermissionsChange(newRightItems);
    }
  };

  const handleCheckedLeft = () => {
    const newRightItems = rightItems.filter(value => !checked.includes(value));
    setRightItems(newRightItems);
    
    // Add back to left items if in current category or showing all
    if (showAll || permissionCategories[selectedCategory].some(p => checked.includes(p))) {
      setLeftItems([...leftItems, ...checked.filter(p => 
        showAll || permissionCategories[selectedCategory].includes(p)
      )]);
    }
    
    setChecked([]);
    
    if (onPermissionsChange) {
      onPermissionsChange(newRightItems);
    }
  };

  // Filter items based on search term
  const filteredLeftItems = leftItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format permission names for display
  const formatPermissionName = (permission) => {
    return permission.split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const customList = (items, title) => (
    <Paper sx={{ width: 300, height: 400, overflow: 'auto' }}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {title === 'Available Permissions' && (
          <Box mb={2}>
            <TextField
              size="small"
              placeholder="Search permissions..."
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />
              }}
            />
          </Box>
        )}
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                <ListItemText 
                  id={labelId} 
                  primary={formatPermissionName(value)} 
                  secondary={value}
                />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ width: '100%'}}>
      <Typography variant="h4" gutterBottom align="center">
        Group Permission Management
      </Typography>
      
      {/* Category Dropdown */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          aria-controls="category-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          endIcon={<ExpandMoreIcon />}
          variant="outlined"
          sx={{ minWidth: 200 }}
        >
          {selectedCategory}
        </Button>
        <Menu
          id="category-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleShowAll}>
            <Typography fontWeight={selectedCategory === 'All Permissions' ? 'bold' : 'normal'}>
              All Permissions
            </Typography>
          </MenuItem>
          <Divider />
          {Object.keys(permissionCategories).map((category) => (
            <MenuItem
              key={category}
              selected={category === selectedCategory && !showAll}
              onClick={() => handleCategorySelect(category)}
            >
              <Typography fontWeight={category === selectedCategory && !showAll ? 'bold' : 'normal'}>
                {category}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(filteredLeftItems, 'Available Permissions')}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={checked.length === 0}
              aria-label="move selected right"
            >
              <ChevronRightIcon />
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={checked.length === 0}
              aria-label="move selected left"
            >
              <ChevronLeftIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(rightItems, 'Assigned Permissions')}</Grid>
      </Grid>

      {/* Selected permissions summary */}
      {rightItems.length > 0 && (
        <Box mt={4}>
          <Divider />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Assigned Permissions by Category:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {Object.keys(permissionCategories).map(category => {
              const permissionsInCategory = rightItems.filter(
                permission => permissionCategories[category].includes(permission)
              );
              
              if (permissionsInCategory.length === 0) return null;
              
              return (
                <Paper key={category} elevation={2} sx={{ p: 2, flexGrow: 1, minWidth: 250 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {permissionsInCategory.map(permission => (
                      <Chip
                        key={permission}
                        label={formatPermissionName(permission)}
                        onDelete={() => {
                          const newRightItems = rightItems.filter(p => p !== permission);
                          setRightItems(newRightItems);
                          // Add back to left if in current view
                          if (showAll || permissionCategories[selectedCategory].includes(permission)) {
                            setLeftItems([...leftItems, permission]);
                          }
                          if (onPermissionsChange) {
                            onPermissionsChange(newRightItems);
                          }
                        }}
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PermissionTransferList;