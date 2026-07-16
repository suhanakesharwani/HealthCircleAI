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

import AuthLoadingPage from "../pages/Auth/AuthLoadingPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import FamilySetupPage from "../pages/Family/FamilySetupPage";
import CompleteProfilePage from "../pages/Auth/CompleteProfilePage";
import EditProfilePage from "../pages/Settings/EditProfilePage";
import ManageMembersPage from "../pages/Family/ManageMembersPage";
import ProtectedRoute from "./ProtectedRoute";
import FamilyMemberProfilePage from "../pages/Family/FamilyMemberProfilePage"
import EditFamilyMemberPage from "../pages/Settings/EditFamilyMemberPage";
import LandingPage from "../pages/Auth/LandingPage"
function AppRouter() {
    return (
        <Routes>

            <Route
                path="/"
                element={<LandingPage />}
            />
            <Route
                path="/loading"
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
            // chnaged

                path="/members/:id"
                element={
                    <ProtectedRoute>
                        <FamilyMemberProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
            // changed
                path="/members/:id/edit"
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