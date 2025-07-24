import { useEffect, useState, useCallback } from "react";
import DataTable from "../common/DataTable";
import studentApi from "../../api/services/student.api";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../common/DialogeBox";
import AddStudentForm from "./student_page/AddStudentForm";
import ViewStudent from "./student_page/ViewStudent";
import DeleteDialog from "../common/DeleteBox";

const COLUMNS = [
  { id: "user_id", label: "Student ID" },
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
];

const StudentPage = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await studentApi.getStudents();
      if (response.error) {
        console.error("Error fetching students:", response.error);
        setStudents([]);
      } else {
        setStudents(response?.students || []);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [dialogState.add, dialogState.edit, dialogState.delete]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents, refreshFlag]);

  const handleDialogClose = (key) => () => {
    setDialogState((prev) => ({ ...prev, [key]: false }));
  };

  const handleStudentAction = (action, student = null) => {
    setSelectedStudent(student);
    setDialogState((prev) => ({ ...prev, [action]: true }));
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;
    try {
      await studentApi.deleteStudent(selectedStudent.user_id);
      handleDialogClose("delete")();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const controls = {
    title: "Student Management",
    onView: (row) => handleStudentAction("view", row),
    onEdit: (row) => handleStudentAction("edit", row),
    onDelete: (row) => handleStudentAction("delete", row),
  };

  return (
    <div>
      {/* Add Student Dialog */}
      <DialogBox
        open={dialogState.add}
        handleClose={handleDialogClose("add")}
        title="Add New Student"
        maxWidth="md"
      >
        <AddStudentForm handleClose={handleDialogClose("add")} />
      </DialogBox>

      {/* Edit Student Dialog */}
      <DialogBox
        open={dialogState.edit}
        handleClose={handleDialogClose("edit")}
        title="Edit Student"
        maxWidth="md"
      >
        <AddStudentForm
          initialValues={selectedStudent}
          handleClose={handleDialogClose("edit")}
          edit={true}
        />
      </DialogBox>

      {/* View Student Dialog */}
      <DialogBox
        open={dialogState.view}
        handleClose={handleDialogClose("view")}
        title="Student Details"
        maxWidth="md"
      >
        <ViewStudent
          student={selectedStudent}
          handleClose={handleDialogClose("view")}
        />
      </DialogBox>

      {/* Delete Student Dialog */}
      <DeleteDialog
        open={dialogState.delete}
        onClose={handleDialogClose("delete")}
        itemName={selectedStudent?.username || ""}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable
        columns={COLUMNS}
        data={students}
        controls={controls}
        onAdd={() => handleStudentAction("add")}
        emptyStateComponent={
          loading ? <CircularProgress /> : "No students available"
        }
      />
    </div>
  );
};

export default StudentPage;
