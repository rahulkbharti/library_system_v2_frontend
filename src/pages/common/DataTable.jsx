import React, { useState, useCallback, useMemo } from "react";
import PropTypes, { object } from "prop-types";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Stack,
  LinearProgress,
  useTheme,
} from "@mui/material";
import ViewIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const DataTable = ({
  columns,
  data,
  controls,
  isLoading = false,
  onAdd,
  onSelectionChange,
  emptyStateComponent,
}) => {


  // console.log();
  const id = Object.keys(data[0] || {})[0]; // Assuming the first key is the unique identifier

  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAllClick = useCallback(
    (e) => {
      const newSelected = e.target.checked ? data.map((row) => row[id]) : [];
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
    },
    [data, onSelectionChange]
  );

  const handleRowSelect = useCallback(
    (id) => {
      const newSelected = selected.includes(id)
        ? selected.filter((item) => item !== id)
        : [...selected, id];
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
    },
    [selected, onSelectionChange]
  );

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  const isSelected = useCallback((id) => selected.includes(id), [selected]);

  const visibleRows = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  const selectedSome = selected.length > 0 && selected.length < data.length;
  const selectedAll = data.length > 0 && selected.length === data.length;

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600} color="text.primary">
              {selected.length > 0
                ? `${selected.length} selected`
                : controls.title}
            </Typography>
            {onAdd && (
              <Button
                variant="contained"
                size="medium"
                onClick={onAdd}
                aria-label="Add new item"
              >
                Add new
              </Button>
            )}
          </Stack>
        </Box>

        {/* Loading Indicator */}
        {isLoading && <LinearProgress />}

        <TableContainer>
          <Table aria-label="data table" size="medium">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedSome}
                    checked={selectedAll}
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all items" }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{ minWidth: column.minWidth }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
                {(controls.onView || controls.onEdit || controls.onDelete) && (
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Actions
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.length > 0 ? (
                visibleRows.map((row) => {
                  const isItemSelected = isSelected(row[id]);
                  return (
                    <TableRow
                      key={row[id]}
                      hover
                      selected={isItemSelected}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: theme.palette.action.selected,
                        },
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleRowSelect(row[id])}
                          inputProps={{ "aria-label": `select item ${row[id]}` }}
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell
                          key={`${row.id}-${column.id}`}
                          align={column.align || "left"}
                        >
                          {column.render
                            ? column.render(row)
                            : row[column.id]}
                        </TableCell>
                      ))}
                      {(controls.onView ||
                        controls.onEdit ||
                        controls.onDelete) && (
                        <TableCell align="right">
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                          >
                            {controls.onView && (
                              <Tooltip title="View">
                                <IconButton
                                  color="primary"
                                  onClick={() => controls.onView(row)}
                                  size="small"
                                  aria-label={`view item ${row.id}`}
                                >
                                  <ViewIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {controls.onEdit && (
                              <Tooltip title="Edit">
                                <IconButton
                                  color="secondary"
                                  onClick={() => controls.onEdit(row)}
                                  size="small"
                                  aria-label={`edit item ${row.id}`}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {controls.onDelete && (
                              <Tooltip title="Delete">
                                <IconButton
                                  color="error"
                                  onClick={() => controls.onDelete(row)}
                                  size="small"
                                  aria-label={`delete item ${row.id}`}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      columns.length +
                      1 +
                      (controls.onView || controls.onEdit || controls.onDelete
                        ? 1
                        : 0)
                    }
                    sx={{ height: 300, textAlign: "center" }}
                  >
                    {emptyStateComponent || (
                      <Typography variant="body1" color="text.secondary">
                        No data available
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                mt: 1,
                mb: 1,
              },
          }}
        />
      </Paper>
    </Box>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
      align: PropTypes.oneOf(["left", "center", "right", "justify", "inherit"]),
      minWidth: PropTypes.number,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  controls: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool,
  onAdd: PropTypes.func,
  onSelectionChange: PropTypes.func,
  emptyStateComponent: PropTypes.node,
};

DataTable.defaultProps = {
  isLoading: false,
  onAdd: null,
  onSelectionChange: null,
  emptyStateComponent: null,
};

export default React.memo(DataTable);