import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import seatApi from '../../api/services/seats.api';
import CircularProgress from '@mui/material/CircularProgress';

const SeatPage = () => {
    const [loading, setLoading] = useState(true);
    const [seats,setSeats] = useState([]);
    useEffect(() => {
        const fetchSeats = async () => {
            const response = await seatApi.getSeats();
            if(response.error) {
                setSeats([]);
                console.error("Error fetching seats:", response.error);
                setLoading(false);
                return;
            }
            console.log("Seats:", response.data);
            setSeats(response.data.seats);
            setLoading(false);
        };
        fetchSeats();
        setLoading(true);
    }, []);


  // Column configuration
  const columns = [
    {id:'book_id', label: 'Book ID'},
    {id:'title', label: 'Title'},
    {id:'publisher', label: 'Publisher'},
    {id:'author', label: 'Author'},
    {id:'isbn', label: 'ISBN'},
  ];

  // Control functions
  const controls = {
    title: 'Book Management',
    onView: (row) => alert(`Viewing: ${row.name}`),
    onEdit: (row) => alert(`Editing: ${row.name}`),
    onDelete: (row) => {
      if (window.confirm(`Delete ${row.name}?`)) {
        alert(`Deleted: ${row.name}`);
      }
    }
  };

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={seats} 
        controls={controls} 
        onAdd={()=>{alert("add Book")}}
        emptyStateComponent={loading ? <CircularProgress /> : "No seats available"}
      />
    </div>
  );
};

export default SeatPage;