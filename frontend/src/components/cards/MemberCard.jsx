// function MemberCard({ member }) {

//     return (

//         <div

//             style={{
//                 border: "1px solid #ddd",
//                 padding: 20,
//                 borderRadius: 10,
//             }}

//         >

//             <h3>

//                 {member.name}

//             </h3>

//             <p>

//                 {member.relation}

//             </p>

//             <p>

//                 {member.gender}

//             </p>

//             <p>

//                 Blood Group : {member.blood_group || "-"}

//             </p>

//             <p>

//                 Conditions :

//                 {

//                     member.medical_conditions.length
//                         ? member.medical_conditions.join(", ")
//                         : " None"

//                 }

//             </p>

//         </div>

//     );

// }

// export default MemberCard;
import { Link } from "react-router-dom";

function MemberCard({ member }) {

    return (

        <Link

         
            to={`/members/${member.id}`}

            style={{
                textDecoration: "none",
                color: "black",
            }}

        >

            <div

                style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: 20,
                    cursor: "pointer",
                    transition: ".2s",
                    minHeight: 230,
                }}

            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 20,
                    }}
                >

                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: "#e8eefc",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 32,
                            margin: "auto",
                        }}
                    >

                        👤

                    </div>

                </div>

                <h3
                    style={{
                        textAlign: "center",
                    }}
                >

                    {member.name}

                </h3>

                <p>

                    <b>Relation:</b>{" "}
                    {member.relation}

                </p>

                <p>

                    <b>Gender:</b>{" "}
                    {member.gender}

                </p>

                <p>

                    <b>Blood Group:</b>{" "}
                    {member.blood_group || "-"}

                </p>

                <p>

                    <b>Account:</b>{" "}

                    {member.linked_user
                        ? "✅ Linked"
                        : "❌ Not Linked"}

                </p>

                <hr />

                <div
                    style={{
                        fontSize: 13,
                    }}
                >

                    {member.permissions.can_edit &&
                        "✏️ Can Edit"}

                    <br />

                    {member.permissions.can_upload_reports &&
                        "📄 Can Upload Reports"}

                </div>

            </div>

        </Link>

    );

}

export default MemberCard;