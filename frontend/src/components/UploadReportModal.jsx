import { useState } from "react";

import { uploadReport } from "../api/report";

function UploadReportModal({

    memberId,

    onUploaded,

}) {

    const [file, setFile] =
        useState(null);

    const [reportDate,
        setReportDate] =
        useState("");

    async function handleUpload() {

        if (!file) {

            alert("Choose file");

            return;

        }

        await uploadReport(

            memberId,

            file,

            reportDate

        );

        alert("Uploaded");

        setFile(null);

        setReportDate("");

        onUploaded();

    }

    return (

        <div
            style={{
                marginBottom: 25,
            }}
        >

            <input

                type="file"

                accept=".pdf,.jpg,.jpeg,.png"

                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }

            />

            <br />

            <br />

            <input

                type="date"

                value={reportDate}

                onChange={(e) =>
                    setReportDate(
                        e.target.value
                    )
                }

            />

            <br />

            <br />

            <button
                onClick={handleUpload}
            >

                Upload Report

            </button>

        </div>

    );

}

export default UploadReportModal;