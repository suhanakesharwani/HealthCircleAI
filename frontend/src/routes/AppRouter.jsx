// import { Routes, Route } from "react-router-dom";

// import AuthLoadingPage from "../pages/AuthLoadingPage";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import DashboardPage from "../pages/DashboardPage";
// // import ProtectedRoute from "./ProtectedRoute";
// import FamilySetupPage from "../pages/FamilySetupPage";
// import ProtectedRoute from "./ProtectedRoute";
// import FamilyCreatedPage from "../pages/FamilyCreatedPage";
// import AddMemberPage from "../pages/CompleteProfilePage";

// function AppRouter() {
//     return (
//         <Routes>
//             {/* <Route path="/" element={<LandingPage />} /> */}
//             <Route path="/" element={<AuthLoadingPage />} />

//             <Route path="/login" element={<LoginPage />} />

//             <Route path="/register" element={<RegisterPage />} />

//             {/* <Route
//                 path="/dashboard"
//                 element={
//                     <ProtectedRoute>
//                         <DashboardPage />
//                     </ProtectedRoute>
//                 }
//             /> */}
//             <Route
//                 path="/dashboard"
//                 element= <ProtectedRoute> <DashboardPage/> </ProtectedRoute>
//             />
//             <Route
//                 path="/family/setup"
//                 element= <ProtectedRoute> <FamilySetupPage/> </ProtectedRoute>
//             />
//             <Route
//                 path="/family/created"
//                 element={
//                     <ProtectedRoute>
//                         <FamilyCreatedPage />
//                     </ProtectedRoute>
//                 }
//             />

//             <Route
//                 path="/members/add"
//                 element={
//                     <ProtectedRoute>
//                         <AddMemberPage />
//                     </ProtectedRoute>
//                 }
//             />
//         </Routes>
//     );
// }

// export default AppRouter;

import { Routes, Route } from "react-router-dom";

import AuthLoadingPage from "../pages/AuthLoadingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import FamilySetupPage from "../pages/FamilySetupPage";
import CompleteProfilePage from "../pages/CompleteProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import ManageMembersPage from "../pages/ManageMembersPage";
import ProtectedRoute from "./ProtectedRoute";
import FamilyMemberProfilePage from "../pages/FamilyMemberProfilePage"
import EditFamilyMemberPage from "../pages/EditFamilyMemberPage";

function AppRouter() {
    return (
        <Routes>

            <Route
                path="/"
                element={<AuthLoadingPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/family/setup"
                element={
                    <ProtectedRoute>
                        <FamilySetupPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/complete-profile"
                element={
                    <ProtectedRoute>
                        <CompleteProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile/edit"
                element={
                    <ProtectedRoute>
                        <EditProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/family/manage"
                element={
                    <ProtectedRoute>
                        <ManageMembersPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/family-members/:id"
                element={
                    <ProtectedRoute>
                        <FamilyMemberProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/family-members/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditFamilyMemberPage />
                    </ProtectedRoute>
                }
            />
            

        </Routes>
    );
}

export default AppRouter;