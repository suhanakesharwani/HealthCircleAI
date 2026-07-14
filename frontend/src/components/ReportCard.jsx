import { useState } from "react";

import {
    getPreviewUrl,
    deleteReport,
} from "../api/report";

import AiSummaryModal from "./AiSummaryModal";

function ReportCard({

    report,

    canDelete,

    refresh,

}) {

    const [showSummary, setShowSummary] = useState(false);

    async function preview() {

        const data =
            await getPreviewUrl(
                report.id
            );

        window.open(
            data.url,
            "_blank"
        );

    }

    async function remove() {

        if (
            !window.confirm(
                "Delete report?"
            )
        )
            return;

        await deleteReport(
            report.id
        );

        refresh();

    }

    return (

        <>

            <div

                style={{

                    border:
                        "1px solid #ddd",

                    padding: 15,

                    borderRadius: 8,

                    marginBottom: 15,

                }}

            >

                <h4>

                    {report.original_filename}

                </h4>

                <p>

                    OCR :
                    {" "}
                    {report.ocr_status}

                </p>

                <p>

                    AI :
                    {" "}
                    {report.ai_status}

                </p>

                <button
                    onClick={preview}
                >

                    View

                </button>

                {" "}

                {report.ai_status === "DONE" && (

                    <button
                        onClick={() =>
                            setShowSummary(true)
                        }
                    >

                        🤖 AI Summary

                    </button>

                )}

                {" "}

                {canDelete && (

                    <button
                        onClick={remove}
                    >

                        Delete

                    </button>

                )}

            </div>

            {showSummary && (

                <AiSummaryModal

                    reportId={report.id}

                    onClose={() =>
                        setShowSummary(false)
                    }

                />

            )}

        </>

    );

}

export default ReportCard;