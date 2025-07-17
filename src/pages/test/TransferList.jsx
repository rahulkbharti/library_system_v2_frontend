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
  IconButton
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const EnhancedTransferList = () => {
  // Sample data with categories
  const categories = {
    'Fruits': ['Apple', 'Banana', 'Orange', 'Mango', 'Strawberry'],
    'Vegetables': ['Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Cucumber'],
    'Dairy': ['Milk', 'Cheese', 'Yogurt', 'Butter'],
    'Bakery': ['Bread', 'Croissant', 'Bagel', 'Muffin']
  };

  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  const [leftItems, setLeftItems] = useState([...categories[selectedCategory]]);
  const [rightItems, setRightItems] = useState([]);
  const [checked, setChecked] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
    // Move any existing items from the current category in right list back to left
    const itemsToMoveBack = rightItems.filter(item => categories[category].includes(item));
    setRightItems(rightItems.filter(item => !categories[category].includes(item)));
    
    // Reset left items for the new category, adding back any that were moved back
    const newLeftItems = [...categories[category]];
    setLeftItems([...newLeftItems, ...itemsToMoveBack]);
    
    // Clear checked items when changing category
    setChecked([]);
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
    setRightItems(rightItems.concat(checked));
    setLeftItems(leftItems.filter(value => !checked.includes(value)));
    setChecked([]);
  };

  const handleCheckedLeft = () => {
    setLeftItems(leftItems.concat(checked));
    setRightItems(rightItems.filter(value => !checked.includes(value)));
    setChecked([]);
  };

  // Filter items based on search term
  const filteredLeftItems = leftItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customList = (items, title) => (
    <Paper sx={{ width: 300, height: 400, overflow: 'auto' }}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {title === 'Choices' && (
          <Box mb={2}>
            <TextField
              size="small"
              placeholder="Search..."
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
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Enhanced Transfer List
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
          {Object.keys(categories).map((category) => (
            <MenuItem
              key={category}
              selected={category === selectedCategory}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(filteredLeftItems, 'Choices')}</Grid>
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
        <Grid item>{customList(rightItems, 'Selected')}</Grid>
      </Grid>

      {/* Selected items summary */}
      {rightItems.length > 0 && (
        <Box mt={4}>
          <Divider />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Your Selections:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.keys(categories).map(category => {
              const itemsInCategory = rightItems.filter(item => categories[category].includes(item));
              if (itemsInCategory.length === 0) return null;
              
              return (
                <Paper key={category} sx={{ p: 2, mb: 2, minWidth: 200 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {category}
                  </Typography>
                  <List dense>
                    {itemsInCategory.map(item => (
                      <ListItem key={item}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EnhancedTransferList;