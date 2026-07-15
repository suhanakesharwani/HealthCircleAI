// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import { getCurrentUser } from "../api/auth";
// import { getFamilyMembers } from "../api/member";

// import MemberCard from "../components/MemberCard";

// function DashboardPage() {

//     const [user, setUser] = useState(null);
//     const [members, setMembers] = useState([]);

//     useEffect(() => {

//         async function load() {

//             const currentUser = await getCurrentUser();

//             setUser(currentUser);

//             const familyMembers = await getFamilyMembers(
//                 currentUser.family.id
//             );

//             setMembers(familyMembers);

//         }

//         load();

//     }, []);

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

//                     <h1>{user.family.name}</h1>

//                     <p>
//                         Welcome,
//                         <b> {user.full_name}</b>
//                     </p>

//                     <p>
//                         Role:
//                         <b> {user.family.role}</b>
//                     </p>

//                 </div>

//                 <div>

//                     <Link to="/profile/edit">
//                         <button>
//                             Edit My Profile
//                         </button>
//                     </Link>

//                 </div>

//             </div>

//             <hr />

//             {user.family.role === "OWNER" && (

//                 <div
//                     style={{
//                         border: "1px solid #ddd",
//                         borderRadius: 10,
//                         padding: 20,
//                         marginBottom: 30,
//                         background: "#fafafa",
//                     }}
//                 >

//                     <h2>Family Administration</h2>

//                     <p>
//                         Share this invite code with your family.
//                     </p>

//                     <h1>{user.family.invite_code}</h1>

//                     <button
//                         onClick={() => {

//                             navigator.clipboard.writeText(
//                                 user.family.invite_code
//                             );

//                             alert("Invite code copied.");

//                         }}
//                     >

//                         Copy Invite Code

//                     </button>

//                     <Link
//                         to="/family/manage"
//                         style={{
//                             marginLeft: 15,
//                         }}
//                     >

//                         <button>

//                             Manage Roles

//                         </button>

//                     </Link>

//                 </div>

//             )}

//             <div
//                 style={{
//                     display: "flex",
//                     gap: 15,
//                     marginBottom: 30,
//                     flexWrap: "wrap",
//                 }}
//             >

//                 <Link to="/profile/edit">
//                     <button>
//                         My Health Profile
//                     </button>
//                 </Link>

//                 <Link to="/reports">
//                     <button>
//                         My Reports
//                     </button>
//                 </Link>

//                 <Link to="/medicines">
//                     <button>
//                         Medicines
//                     </button>
//                 </Link>

//                 <Link to="/habits">
//                     <button>
//                         Habits
//                     </button>
//                 </Link>

//                 <Link to="/digest">
//                     <button>
//                         Daily Digest
//                     </button>
//                 </Link>

//             </div>

//             <hr />

//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: 20,
//                 }}
//             >

//                 <h2>Family Health Profiles</h2>

//                 <span>

//                     {members.length} Members

//                 </span>

//             </div>

//             {members.length === 0 ? (

//                 <div
//                     style={{
//                         padding: 30,
//                         border: "1px dashed #bbb",
//                         borderRadius: 10,
//                     }}
//                 >

//                     <h3>No family profiles yet</h3>

//                     <p>
//                         Ask each family member to complete their health profile
//                         after joining your family.
//                     </p>

//                 </div>

//             ) : (

//                 <div
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
//                         gap: 20,
//                     }}
//                 >

//                     {members.map(member => (

//                         <MemberCard
//                             key={member.id}
//                             member={member}
//                         />

//                     ))}

//                 </div>

//             )}

//         </div>

//     );

// }

// export default DashboardPage;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCurrentUser } from "../../api/auth";
import { getFamilyMembers } from "../../api/member";

import MemberCard from "../../components/cards/MemberCard";

function DashboardPage() {

    const [user, setUser] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {

        try {

            const currentUser =
                await getCurrentUser();

            setUser(currentUser);

            const data =
                await getFamilyMembers(
                    currentUser.family.id
                );

            setMembers(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    if (!user)
        return <h2>Loading...</h2>;

    return (

        <div
            style={{
                width: 1100,
                margin: "40px auto",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >

                <div>

                    <h1>

                        {user.family.name}

                    </h1>

                    <p>

                        Welcome <b>{user.full_name}</b>

                    </p>

                    <p>

                        Your role :
                        <b> {user.family.role}</b>

                    </p>

                </div>

                <Link to="/profile/edit">

                    <button>

                        Edit My Profile

                    </button>

                </Link>

            </div>

            <hr />

            {user.family.role === "OWNER" && (

                <div
                    style={{
                        border: "1px solid #ddd",
                        padding: 20,
                        borderRadius: 12,
                        marginBottom: 25,
                    }}
                >

                    <h2>

                        Family Management

                    </h2>

                    <p>

                        Invite Code

                    </p>

                    <h3>

                        {user.family.invite_code}

                    </h3>

                    <button

                        onClick={() =>
                            navigator.clipboard.writeText(
                                user.family.invite_code
                            )
                        }

                    >

                        Copy Invite Code

                    </button>

                    <Link
                        to="/family/manage"
                        style={{
                            marginLeft: 20,
                        }}
                    >

                        <button>

                            Manage Roles

                        </button>

                    </Link>

                </div>

            )}

            <h2>

                Family Health Profiles

            </h2>

            <p>

                Click any profile to view medical history, reports, medicines and habits.

            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill,minmax(260px,1fr))",
                    gap: 20,
                    marginTop: 20,
                }}
            >

                {

                    members.map(member => (

                        <MemberCard

                            key={member.id}

                            member={member}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default DashboardPage;