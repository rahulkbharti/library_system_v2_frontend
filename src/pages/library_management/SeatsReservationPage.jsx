import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';

// Dummy data for seat reservations
const dummyReservations = [
  {
    "reservation_id": 7,
    "seat_id": 11,
    "user_id": 99,
    "reservation_date": "2025-07-19",
    "start_time": "10:00:00",
    "end_time": "12:00:00",
    "organization_id": 101,
    "seat_number": "A1",
    "location": "Reading Area 1"
  },
  {
    "reservation_id": 8,
    "seat_id": 12,
    "user_id": 105,
    "reservation_date": "2025-07-19",
    "start_time": "13:00:00",
    "end_time": "15:00:00",
    "organization_id": 101,
    "seat_number": "A2",
    "location": "Reading Area 1"
  },
  {
    "reservation_id": 9,
    "seat_id": 25,
    "user_id": 78,
    "reservation_date": "2025-07-20",
    "start_time": "09:00:00",
    "end_time": "11:00:00",
    "organization_id": 101,
    "seat_number": "C5",
    "location": "Quiet Zone"
  },
    {
    "reservation_id": 10,
    "seat_id": 33,
    "user_id": 99,
    "reservation_date": "2025-07-21",
    "start_time": "16:00:00",
    "end_time": "17:00:00",
    "organization_id": 101,
    "seat_number": "D8",
    "location": "Collaboration Space"
  }
];


const SeatReservationsPage = () => {
    
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Load dummy data when the component mounts
        const fetchReservations = () => {
            console.log("Loading dummy seat reservations");
            setReservations(dummyReservations);
        };
        fetchReservations();
    }, []);


  // Column configuration for Seat Reservations 🪑
  const columns = [
    {id:'reservation_id', label: 'Reservation ID'},
    {id:'seat_number', label: 'Seat'},
    {id:'location', label: 'Location'},
    {id:'user_id', label: 'User ID'},
    {id:'reservation_date', label: 'Date'},
    {id:'start_time', label: 'Start Time'},
    {id:'end_time', label: 'End Time'},
  ];

  // Control functions for the DataTable
  const controls = {
    title: 'Seat Reservation Management',
    onView: (row) => alert(`Viewing reservation for seat ${row.seat_number} by User ID: ${row.user_id}`),
    onEdit: (row) => alert(`Editing reservation #${row.reservation_id}`),
    onDelete: (row) => {
      if (window.confirm(`Cancel reservation for seat ${row.seat_number} on ${row.reservation_date}?`)) {
        alert(`Reservation #${row.reservation_id} canceled.`);
        // In a real app, you would call the delete API and refresh data
      }
    }
  };

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={reservations} 
        controls={controls} 
        onAdd={() => {alert("Add New Seat Reservation")}}
      />
    </div>
  );
};

export default SeatReservationsPage;