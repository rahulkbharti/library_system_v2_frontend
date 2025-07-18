import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layout";

import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import ForgetPasswordPage from "../pages/auth/forget_password/ForgetPassword";

import ProtectedRoute from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

import DashboardPage from "../pages/dashboard/DashboardPage";

import TransactionsPage from "../pages/transactions";
// import UsersPage from "../pages/users";
import PermissionManagement from "../pages/auth/permission/PermissionManagement";
import TestAPIs from "../pages/common/TestAPIs";
// import UserTable from "../pages/test/UserTable";
import StudentData from "../pages/test/UserTable";
import BookPage from "../pages/library_management/BookPage";
import StudentPage from "../pages/users_accounts/StudentPage";
import StaffPage from "../pages/users_accounts/StaffPage";
import GroupPage from "../pages/roles_permissions/GroupPage";
import SeatPage from "../pages/library_management/SeatPage";
import EnhancedTransferList from "../pages/test/TransferList";
import PermissionTransferList from "../pages/test/PermissionTransfer";
import BookCopyPage from "../pages/library_management/BookCopyPage";
import SeatReservationsPage from "../pages/library_management/SeatsReservationPage";
import FeesPage from "../pages/fees_payments/FeesPage";
import MemberFeesPage from "../pages/fees_payments/MemberFeesPage";
import PaymentsPage from "../pages/fees_payments/PaymentPage";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
           <Route path="/" index element={<DashboardPage/>}/>
           {/* Libray Management */}
           <Route path="/library-management" element={"Library Mangenegment Dashboard"}/>
           <Route path="/library-management/books" element={<BookPage/>}/>
           <Route path="/library-management/copies" element={<BookCopyPage/>}/>
           <Route path="/library-management/seats" element={<SeatPage/>}/>
           <Route path="/library-management/reservations" element={<SeatReservationsPage/>}/>
           {/* Users And Accounts */}
           <Route path="/users" element={"users and controls overview"}/>
           <Route path="/users/admins" element={"Admin Controls Page"}/>
           <Route path="/users/staffs" element={<StaffPage/>}/>
           <Route path="users/students" element={<StudentPage/>}/>
           {/* Groups and Permissions */}
           <Route path="/roles" element={"Group and Permissions"}/>
           <Route path="/roles/groups" element={<GroupPage/>}/>
           <Route path="/roles/permissions" element={<PermissionTransferList/>}/>
           {/* Fees and Payment */}
           <Route path="/fees" element={"Fee and Payments"}/>
           <Route path="/fees/fees" element={<FeesPage/>}/>
           <Route path="/fees/student-fees" element={<MemberFeesPage/>}/>
           <Route path="/fees/payments" element={<PaymentsPage/>}/>
           {/* Orgnaization Only For Admins */}
           <Route path="/organization" element={"Orgnizations"}/>
           <Route path="/profile" element={"Profile"}/>
           <Route path="/setting" element={"Setting"}/>
           <Route path="/help" element={"Help"}/>
        </Route>
        <Route path="/login" element={<PublicRoutes><LoginPage/> </PublicRoutes>}/>
        <Route path="/register" element={<PublicRoutes><RegisterPage/> </PublicRoutes>}/>
        <Route path="/forget-password" element={<PublicRoutes><ForgetPasswordPage/> </PublicRoutes>}/>
        <Route path="*" element={<TestAPIs/>} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
