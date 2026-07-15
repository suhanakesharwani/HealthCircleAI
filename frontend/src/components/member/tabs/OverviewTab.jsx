function OverviewTab({ member }) {
    return (
        <div>

            <h2>Health Overview</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 20,
                    marginBottom: 30,
                }}
            >

                <div
                    style={{
                        border: "1px solid #ddd",
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <h3>💊 Medicines</h3>
                    <h1>0</h1>
                    <p>Missed doses this week</p>
                </div>

                <div
                    style={{
                        border: "1px solid #ddd",
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <h3>🏃 Habits</h3>
                    <h1>0</h1>
                    <p>Missed habits today</p>
                </div>

                <div
                    style={{
                        border: "1px solid #ddd",
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <h3>🩺 Latest Report</h3>
                    <p>No critical alerts</p>
                </div>

            </div>

            <h3>Personal Information</h3>

            <table style={{ width: "100%" }}>
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
                        <td>{member.notes || "-"}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    );
}

export default OverviewTab;