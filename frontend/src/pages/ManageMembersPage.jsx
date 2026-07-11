// import { useEffect, useState } from "react";

// import { getCurrentUser } from "../api/auth";

// import {
//     getMemberships,
//     updateMembershipRole,
// } from "../api/family";

// function ManageMembersPage() {

//     const [memberships, setMemberships] = useState([]);

//     const [familyId, setFamilyId] = useState("");

//     useEffect(() => {

//         load();

//     }, []);

//     async function load() {

//         const user = await getCurrentUser();

//         setFamilyId(user.family.id);

//         const data = await getMemberships(
//             user.family.id
//         );

//         setMemberships(data);
//     }

//     async function changeRole(
//         membershipId,
//         role
//     ) {

//         await updateMembershipRole(
//             familyId,
//             membershipId,
//             role
//         );

//         load();

//     }

//     return (

//         <div
//             style={{
//                 width: 700,
//                 margin: "40px auto",
//             }}
//         >

//             <h1>

//                 Manage Family Members

//             </h1>

//             <table
//                 style={{
//                     width: "100%",
//                 }}
//             >

//                 <thead>

//                     <tr>

//                         <th>Name</th>

//                         <th>Email</th>

//                         <th>Role</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//                     {memberships.map(member => (

//                         <tr key={member.id}>

//                             <td>

//                                 {member.user?.full_name || "Unknown"}

//                             </td>

//                             <td>

//                                 {member.user?.email || "-"}

//                             </td>

//                             <td>

//                                 {member.role === "OWNER"
//                                     ?

//                                     "OWNER"

//                                     :

//                                     <select

//                                         value={member.role}

//                                         onChange={(e) =>
//                                             changeRole(
//                                                 member.id,
//                                                 e.target.value
//                                             )
//                                         }

//                                     >

//                                         <option value="MEMBER">

//                                             Member

//                                         </option>

//                                         <option value="CAREGIVER">

//                                             Caregiver

//                                         </option>

//                                     </select>

//                                 }

//                             </td>

//                         </tr>

//                     ))}

//                 </tbody>

//             </table>

//         </div>

//     );

// }

// export default ManageMembersPage;

import { useEffect, useState } from "react";

import { getCurrentUser } from "../api/auth";

import {
    getMemberships,
    updateMembershipRole,
} from "../api/family";

function ManageMembersPage() {

    const [memberships, setMemberships] = useState([]);
    const [familyId, setFamilyId] = useState("");

    useEffect(() => {
        load();
    }, []);

    async function load() {

        const user = await getCurrentUser();

        setFamilyId(user.family.id);

        const data = await getMemberships(
            user.family.id
        );

        setMemberships(data);
    }

    function changeRole(id, role) {

        setMemberships(prev =>
            prev.map(member =>
                member.id === id
                    ? {
                          ...member,
                          role,
                      }
                    : member
            )
        );

    }

    async function saveChanges() {

        try {

            for (const member of memberships) {

                if (member.role !== "OWNER") {

                    await updateMembershipRole(
                        familyId,
                        member.id,
                        member.role
                    );

                }

            }

            alert("Roles updated successfully.");

        }

        catch {

            alert("Failed to update roles.");

        }

    }

    return (

        <div
            style={{
                width: 700,
                margin: "40px auto",
            }}
        >

            <h1>Manage Family Members</h1>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {memberships.map(member => (

                        <tr key={member.id}>

                            <td>

                                {member.user.full_name}

                            </td>

                            <td>

                                {member.user.email}

                            </td>

                            <td>

                                {member.role === "OWNER"

                                    ?

                                    <b>OWNER</b>

                                    :

                                    <select

                                        value={member.role}

                                        onChange={(e) =>
                                            changeRole(
                                                member.id,
                                                e.target.value
                                            )
                                        }

                                    >

                                        <option value="MEMBER">

                                            Member

                                        </option>

                                        <option value="CAREGIVER">

                                            Caregiver

                                        </option>

                                    </select>

                                }

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div
                style={{
                    marginTop: 30,
                }}
            >

                <button
                    onClick={saveChanges}
                >
                    Save Changes
                </button>

            </div>

        </div>

    );

}

export default ManageMembersPage;