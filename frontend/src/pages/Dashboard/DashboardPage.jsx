// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import { getCurrentUser } from "../../api/auth";
// import { getFamilyMembers } from "../../api/member";

// import MemberCard from "../../components/cards/MemberCard";

// function DashboardPage() {

//     const [user, setUser] = useState(null);
//     const [members, setMembers] = useState([]);

//     useEffect(() => {
//         load();
//     }, []);

//     async function load() {

//         try {

//             const currentUser =
//                 await getCurrentUser();

//             setUser(currentUser);

//             const data =
//                 await getFamilyMembers(
//                     currentUser.family.id
//                 );

//             setMembers(data);

//         }

//         catch (err) {

//             console.log(err);

//         }

//     }

//     if (!user)
//         return <h2>Loading...</h2>;

//     return (

//         <div
//             style={{
//                 width: 1100,
//                 margin: "40px auto",
//             }}
//         >

//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                 }}
//             >

//                 <div>

//                     <h1>

//                         {user.family.name}

//                     </h1>

//                     <p>

//                         Welcome <b>{user.full_name}</b>

//                     </p>

//                     <p>

//                         Your role :
//                         <b> {user.family.role}</b>

//                     </p>

//                 </div>

//                 <Link to="/profile/edit">

//                     <button>

//                         Edit My Profile

//                     </button>

//                 </Link>

//             </div>

//             <hr />

//             {user.family.role === "OWNER" && (

//                 <div
//                     style={{
//                         border: "1px solid #ddd",
//                         padding: 20,
//                         borderRadius: 12,
//                         marginBottom: 25,
//                     }}
//                 >

//                     <h2>

//                         Family Management

//                     </h2>

//                     <p>

//                         Invite Code

//                     </p>

//                     <h3>

//                         {user.family.invite_code}

//                     </h3>

//                     <button

//                         onClick={() =>
//                             navigator.clipboard.writeText(
//                                 user.family.invite_code
//                             )
//                         }

//                     >

//                         Copy Invite Code

//                     </button>

//                     <Link
//                         to="/family/manage"
//                         style={{
//                             marginLeft: 20,
//                         }}
//                     >

//                         <button>

//                             Manage Roles

//                         </button>

//                     </Link>

//                 </div>

//             )}

//             <h2>

//                 Family Health Profiles

//             </h2>

//             <p>

//                 Click any profile to view medical history, reports, medicines and habits.

//             </p>

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns:
//                         "repeat(auto-fill,minmax(260px,1fr))",
//                     gap: 20,
//                     marginTop: 20,
//                 }}
//             >

//                 {

//                     members.map(member => (

//                         <MemberCard

//                             key={member.id}

//                             member={member}

//                         />

//                     ))

//                 }

//             </div>

//         </div>

//     );

// }

// export default DashboardPage;
import { useEffect, useState } from "react";

import { getCurrentUser } from "../../api/auth";
import { getFamilyMembers } from "../../api/member";

import "../../styles/dashboard.css";
import PageShell from "../../components/layout/PageShell";
import DashboardNav from "../../components/dashboard/DashboardNav";
import DashboardHero from "../../components/dashboard/DashboardHero";
import FamilyManagementCard from "../../components/dashboard/FamilyManagementCard";
import MemberGrid from "../../components/dashboard/MemberGrid";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);

            const data = await getFamilyMembers(currentUser.family.id);
            setMembers(data);
        } catch (err) {
            console.log(err);
            setError("We couldn't load your family circle. Try refreshing.");
        }
    }

    return (
        <PageShell nav={<DashboardNav user={user} />} isLoading={!user} loadingLabel="Loading your circle…">
            <DashboardHero user={user} />

            {user?.family.role === "OWNER" && (
                <FamilyManagementCard inviteCode={user.family.invite_code} />
            )}

            {error && <p className="hc-error-text">{error}</p>}

            <MemberGrid members={members} />
        </PageShell>
    );
}