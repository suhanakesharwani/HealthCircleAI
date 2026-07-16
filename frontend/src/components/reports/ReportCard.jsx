// import { useState } from "react";

// import {
//     getPreviewUrl,
//     deleteReport,
// } from "../../api/report";

// import AiSummaryModal from "./AiSummaryModal";

// function ReportCard({

//     report,

//     canDelete,

//     refresh,

// }) {

//     const [showSummary, setShowSummary] = useState(false);

//     async function preview() {

//         const data =
//             await getPreviewUrl(
//                 report.id
//             );

//         window.open(
//             data.url,
//             "_blank"
//         );

//     }

//     async function remove() {

//         if (
//             !window.confirm(
//                 "Delete report?"
//             )
//         )
//             return;

//         await deleteReport(
//             report.id
//         );

//         refresh();

//     }

//     return (

//         <>

//             <div

//                 style={{

//                     border:
//                         "1px solid #ddd",

//                     padding: 15,

//                     borderRadius: 8,

//                     marginBottom: 15,

//                 }}

//             >

//                 <h4>

//                     {report.original_filename}

//                 </h4>

//                 <p>

//                     OCR :
//                     {" "}
//                     {report.ocr_status}

//                 </p>

//                 <p>

//                     AI :
//                     {" "}
//                     {report.ai_status}

//                 </p>

//                 <button
//                     onClick={preview}
//                 >

//                     View

//                 </button>

//                 {" "}

//                 {report.ai_status === "DONE" && (

//                     <button
//                         onClick={() =>
//                             setShowSummary(true)
//                         }
//                     >

//                         🤖 AI Summary

//                     </button>

//                 )}

//                 {" "}

//                 {canDelete && (

//                     <button
//                         onClick={remove}
//                     >

//                         Delete

//                     </button>

//                 )}

//             </div>

//             {showSummary && (

//                 <AiSummaryModal

//                     reportId={report.id}

//                     onClose={() =>
//                         setShowSummary(false)
//                     }

//                 />

//             )}

//         </>

//     );

// }

// export default ReportCard;

import { useState } from "react";
import { FileText, Eye, Sparkles, Trash2 } from "lucide-react";

import { getPreviewUrl, deleteReport } from "../../api/report";

import GlassCard from "../ui/GlassCard";
import StatusPill from "./StatusPill";
import AiSummaryModal from "./AiSummaryModal";

function ReportCard({ report, canDelete, refresh }) {
    const [showSummary, setShowSummary] = useState(false);

    async function preview() {
        const data = await getPreviewUrl(report.id);
        window.open(data.url, "_blank");
    }

    async function remove() {
        if (!window.confirm("Delete report?")) return;
        await deleteReport(report.id);
        refresh();
    }

    return (
        <>
            <GlassCard className="hc-report-row">
                <div className="hc-report-row-left">
                    <div className="hc-report-icon hc-tone-blue">
                        <FileText size={18} />
                    </div>

                    <div>
                        <h4>{report.original_filename}</h4>
                        <div className="hc-report-status-group">
                            <StatusPill label="OCR" status={report.ocr_status} />
                            <StatusPill label="AI" status={report.ai_status} />
                        </div>
                    </div>
                </div>

                <div className="hc-report-actions">
                    <button className="hc-btn-icon" onClick={preview}>
                        <Eye size={14} /> View
                    </button>

                    {report.ai_status === "DONE" && (
                        <button className="hc-btn-icon hc-btn-icon--accent" onClick={() => setShowSummary(true)}>
                            <Sparkles size={14} /> AI summary
                        </button>
                    )}

                    {canDelete && (
                        <button className="hc-btn-icon hc-btn-icon--danger" onClick={remove}>
                            <Trash2 size={14} /> Delete
                        </button>
                    )}
                </div>
            </GlassCard>

            {showSummary && <AiSummaryModal reportId={report.id} onClose={() => setShowSummary(false)} />}
        </>
    );
}

export default ReportCard;