function MemberHeader({ member }) {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 25,
            }}
        >

            <div
                style={{
                    display: "flex",
                    gap: 20,
                }}
            >

                <div
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        background: "#e7efff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 40,
                    }}
                >
                    👤
                </div>

                <div>

                    <h1>{member.name}</h1>

                    <p>{member.relation}</p>

                    <p>

                        {member.linked_user
                            ? "✅ Linked Account"
                            : "Not Linked"}

                    </p>

                </div>

            </div>

            <button>

                Send Reminder

            </button>

        </div>

    );

}

export default MemberHeader;