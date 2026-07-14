import { useEffect, useState } from "react";

import { getReportSummary } from "../api/report";

function AISummaryModal({ reportId, onClose }) {

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSummary();

    }, []);


    async function loadSummary() {

        try {

            const data = await getReportSummary(reportId);

            setSummary(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <div
                style={{
                    width: 700,
                    maxHeight: "80vh",
                    overflow: "auto",
                    background: "white",
                    padding: 25,
                    borderRadius: 10,
                }}
            >

                <button
                    onClick={onClose}
                    style={{
                        float: "right"
                    }}
                >
                    ✕
                </button>

                <h2>🤖 AI Summary</h2>

                {loading ? (

                    <p>Loading...</p>

                ) : (

                    <>

                        <h3>Summary</h3>

                        <p>{summary.summary_text}</p>

                        <hr />

                        <h3>Key Findings</h3>

                        <ul>

                            {summary.key_findings.map((item, index) => (

                                <li key={index}>
                                    {item}
                                </li>

                            ))}

                        </ul>

                        <hr />

                        <h3>Abnormal Values</h3>

                        <table>

                            <thead>

                                <tr>

                                    <th>Test</th>

                                    <th>Value</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {summary.abnormal_values.map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.test}</td>

                                        <td>{item.value}</td>

                                        <td>{item.status}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        <hr />

                        <h3>Recommendations</h3>

                        <ul>

                            {summary.recommendations.map((item, index) => (

                                <li key={index}>
                                    {item}
                                </li>

                            ))}

                        </ul>

                    </>

                )}

            </div>

        </div>

    );

}

export default AISummaryModal;