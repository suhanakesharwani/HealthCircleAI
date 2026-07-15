function ReminderCard() {

    return (

        <div
            style={{
                background: "#fff6da",
                padding: 20,
                borderRadius: 12,
                marginBottom: 30,
            }}
        >

            <h3>

                ⚠ Needs Attention

            </h3>

            <ul>

                <li>

                    Missed medicines 2 times

                </li>

                <li>

                    Missed Morning Walk today

                </li>

                <li>

                    Latest CBC shows LOW Hemoglobin

                </li>

            </ul>

            <button>

                Send Reminder

            </button>

        </div>

    );

}

export default ReminderCard;