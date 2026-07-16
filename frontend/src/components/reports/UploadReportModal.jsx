// import { useState } from "react";

// import { uploadReport } from "../../api/report";

// function UploadReportModal({

//     memberId,

//     onUploaded,

// }) {

//     const [file, setFile] =
//         useState(null);

//     const [reportDate,
//         setReportDate] =
//         useState("");

//     async function handleUpload() {

//         if (!file) {

//             alert("Choose file");

//             return;

//         }

//         await uploadReport(

//             memberId,

//             file,

//             reportDate

//         );

//         alert("Uploaded");

//         setFile(null);

//         setReportDate("");

//         onUploaded();

//     }

//     return (

//         <div
//             style={{
//                 marginBottom: 25,
//             }}
//         >

//             <input

//                 type="file"

//                 accept=".pdf,.jpg,.jpeg,.png"

//                 onChange={(e) =>
//                     setFile(
//                         e.target.files[0]
//                     )
//                 }

//             />

//             <br />

//             <br />

//             <input

//                 type="date"

//                 value={reportDate}

//                 onChange={(e) =>
//                     setReportDate(
//                         e.target.value
//                     )
//                 }

//             />

//             <br />

//             <br />

//             <button
//                 onClick={handleUpload}
//             >

//                 Upload Report

//             </button>

//         </div>

//     );

// }

// export default UploadReportModal;

import { useState } from "react";
import { UploadCloud } from "lucide-react";

import { uploadReport } from "../../api/report";

import GlassCard from "../ui/GlassCard";
import PrimaryButton from "../ui/PrimaryButton";

function UploadReportModal({ memberId, onUploaded }) {
    const [file, setFile] = useState(null);
    const [reportDate, setReportDate] = useState("");
    const [uploading, setUploading] = useState(false);

    async function handleUpload() {
        if (!file) {
            alert("Choose file");
            return;
        }

        setUploading(true);
        try {
            await uploadReport(memberId, file, reportDate);
            setFile(null);
            setReportDate("");
            onUploaded();
        } finally {
            setUploading(false);
        }
    }

    return (
        <GlassCard className="hc-upload-card">
            <div className="hc-upload-row">
                <label className="hc-dropzone">
                    <span className="hc-dropzone-icon hc-tone-lavender">
                        <UploadCloud size={16} />
                    </span>
                    <span className="hc-dropzone-filename">
                        {file ? file.name : "Choose a PDF or image to upload"}
                    </span>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </label>

                <div className="hc-field">
                    <label htmlFor="report-date">Report date</label>
                    <input
                        id="report-date"
                        type="date"
                        className="hc-input"
                        value={reportDate}
                        onChange={(e) => setReportDate(e.target.value)}
                    />
                </div>

                <PrimaryButton icon={UploadCloud} onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading…" : "Upload report"}
                </PrimaryButton>
            </div>
        </GlassCard>
    );
}

export default UploadReportModal;