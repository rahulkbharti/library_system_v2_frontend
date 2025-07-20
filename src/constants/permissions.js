// Constants
const ALL_PERMISSIONS = [
  // Book Management
  { id: 7, key: 'ADD_BOOK', desc: 'Can add book', category: 'Book Management' },
  { id: 8, key: 'EDIT_BOOK', desc: 'Can edit book', category: 'Book Management' },
  { id: 9, key: 'VIEW_BOOK', desc: 'Can view book', category: 'Book Management' },
  { id: 10, key: 'DELETE_BOOK', desc: 'Can delete book', category: 'Book Management' },
  
  // Book Copy Management
  { id: 36, key: 'ADD_BOOK_COPY', desc: 'Add Book Copy', category: 'Book Copy Management' },
  { id: 37, key: 'EDIT_BOOK_COPY', desc: 'Edit Book Copy', category: 'Book Copy Management' },
  { id: 38, key: 'DELETE_BOOK_COPY', desc: 'Delete Book Copy', category: 'Book Copy Management' },
  { id: 39, key: 'VIEW_BOOK_COPY', desc: 'View Book Copy', category: 'Book Copy Management' },
  
  // Seat Management
  { id: 40, key: 'ADD_SEAT', desc: 'Add Seat', category: 'Seat Management' },
  { id: 41, key: 'EDIT_SEAT', desc: 'Edit Seat', category: 'Seat Management' },
  { id: 42, key: 'DELETE_SEAT', desc: 'Delete Seat', category: 'Seat Management' },
  { id: 43, key: 'VIEW_SEAT', desc: 'View Seat', category: 'Seat Management' },
  { id: 11, key: 'VIEW_SEATS', desc: 'Can view seats', category: 'Seat Management' },
  
  // Seat Reservation Management
  { id: 44, key: 'ADD_SEAT_RESERVATION', desc: 'Add Seat Reservation', category: 'Seat Reservation' },
  { id: 45, key: 'EDIT_SEAT_RESERVATION', desc: 'Edit Seat Reservation', category: 'Seat Reservation' },
  { id: 46, key: 'DELETE_SEAT_RESERVATION', desc: 'Delete Seat Reservation', category: 'Seat Reservation' },
  { id: 47, key: 'VIEW_SEAT_RESERVATION', desc: 'View Seat Reservation', category: 'Seat Reservation' },
  
  // Group Management
  { id: 48, key: 'ADD_GROUP', desc: 'Add Group', category: 'Group Management' },
  { id: 49, key: 'EDIT_GROUP', desc: 'Edit Group', category: 'Group Management' },
  { id: 50, key: 'DELETE_GROUP', desc: 'Delete Group', category: 'Group Management' },
  { id: 51, key: 'VIEW_GROUP', desc: 'View Group', category: 'Group Management' },
  
  // Group Permission Management
  { id: 52, key: 'ADD_GROUP_PERMISSION', desc: 'Add Group Permission', category: 'Group Permissions' },
  { id: 53, key: 'EDIT_GROUP_PERMISSION', desc: 'Edit Group Permission', category: 'Group Permissions' },
  { id: 54, key: 'DELETE_GROUP_PERMISSION', desc: 'Delete Group Permission', category: 'Group Permissions' },
  { id: 55, key: 'VIEW_GROUP_PERMISSION', desc: 'View Group Permission', category: 'Group Permissions' }
];

export default ALL_PERMISSIONS