import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReportTrendsSection from "../components/ReportTrendsSection";
import { getFamilyMember } from "../api/member";
import { getReports } from "../api/report";

import UploadReportModal from "../components/UploadReportModal";

import ReportCard from "../components/ReportCard";



function FamilyMemberProfilePage() {

    

    const { id } = useParams();

    const [member, setMember] = useState();

    const[reports,setReports]=useState([]);

    useEffect(() => {

        loadMember();

    }, []);

    async function loadMember() {

        try {

            const data = await getFamilyMember(id);

            setMember(data);

            const reportData =
                await getReports(id);

            setReports(reportData);

        }

        catch (err) {

            console.error(err);

        }

        }

    if (!member) {

        return <h2>Loading...</h2>;

    }

    return (

        <div
            style={{
                width: 900,
                margin: "40px auto",
            }}
        >

            <Link to="/dashboard">

                ← Back to Dashboard

            </Link>

            <div
                style={{
                    display: "flex",
                    gap: 30,
                    marginTop: 25,
                    alignItems: "center",
                }}
            >

                <div
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "#e8eefc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 50,
                    }}
                >

                    👤

                </div>

                <div>

                    <h1>

                        {member.name}

                    </h1>

                    <p>

                        {member.relation}

                    </p>

                    <p>

                        {member.linked_user
                            ? "Linked Account"
                            : "No Linked Account"}

                    </p>

                </div>

            </div>

            <hr />

            <h2>

                Personal Information

            </h2>

            <table
                style={{
                    width: "100%",
                }}
            >

                <tbody>

                    <tr>

                        <td><b>Gender</b></td>

                        <td>{member.gender}</td>

                    </tr>

                    <tr>

                        <td><b>Date of Birth</b></td>

                        <td>{member.date_of_birth}</td>

                    </tr>

                    <tr>

                        <td><b>Blood Group</b></td>

                        <td>{member.blood_group}</td>

                    </tr>

                    <tr>

                        <td><b>Medical Conditions</b></td>

                        <td>

                            {member.medical_conditions.length
                                ? member.medical_conditions.join(", ")
                                : "-"}

                        </td>

                    </tr>

                    <tr>

                        <td><b>Allergies</b></td>

                        <td>

                            {member.allergies.length
                                ? member.allergies.join(", ")
                                : "-"}

                        </td>

                    </tr>

                    <tr>

                        <td><b>Notes</b></td>

                        <td>

                            {member.notes || "-"}

                        </td>

                    </tr>

                </tbody>

            </table>

            <hr />

            <h2>

                Health Management

            </h2>

            <ReportTrendsSection memberId={member.id} />

            <hr />

            <h2>

                Medical Reports

            </h2>

            {
                member.permissions.can_upload_reports && (

                    <UploadReportModal

                        memberId={member.id}

                        onUploaded={loadMember}

                    />

                )
            }

            {
                reports.length === 0

                ?

                <p>

                    No reports uploaded yet.

                </p>

                :

                reports.map(report => (

                    <ReportCard

                        key={report.id}

                        report={report}

                        refresh={loadMember}

                        canDelete={
                            member.permissions.can_upload_reports
                        }

                    />

                ))
            }

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 20,
                }}
            >

                {member.permissions.can_edit && (

                    <Link
                        // to={`/family-members/${member.id}/edit`} changed
                        to={`/members/${member.id}/edit`}
                    >

                        <button>

                            Edit Health Profile

                        </button>

                    </Link>

                )}

               
                

                {member.permissions.can_manage_medicines && (

                    <Link
                        // to={`/family-members/${member.id}/medicines`} changed
                         to={`/members/${member.id}/medicines`}
                    >

                        <button>

                            Medicines

                        </button>

                    </Link>

                )}

                {member.permissions.can_manage_habits && (

                    <Link
                        // to={`/family-members/${member.id}/habits`} changed
                        to={`/members/${member.id}/habits`}
                    >

                        <button>

                            Habits

                        </button>

                    </Link>

                )}

                {member.permissions.can_delete && (

                    <button
                        style={{
                            background: "#d9534f",
                            color: "white",
                        }}
                    >

                        Delete Profile

                    </button>

                )}

            </div>

            <hr />

            <h2>

                Linked Account

            </h2>

            {

                member.linked_user

                    ?

                    <div>

                        <p>

                            <b>Name:</b>{" "}

                            {member.linked_user.full_name}

                        </p>

                        <p>

                            <b>Email:</b>{" "}

                            {member.linked_user.email}

                        </p>

                    </div>

                    :

                    <p>

                        This profile has not been linked to a user account.

                    </p>

            }

        </div>

    );

}

export default FamilyMemberProfilePage;