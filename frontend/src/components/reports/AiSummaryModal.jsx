// import { useEffect, useState } from "react";

// import { getReportSummary } from "../../api/report";

// function AISummaryModal({ reportId, onClose }) {

//     const [summary, setSummary] = useState(null);

//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         loadSummary();

//     }, []);


//     async function loadSummary() {

//         try {

//             const data = await getReportSummary(reportId);

//             setSummary(data);

//         }

//         catch (err) {

//             console.error(err);

//         }

//         finally {

//             setLoading(false);

//         }

//     }


//     return (

//         <div
//             style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,.5)",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >

//             <div
//                 style={{
//                     width: 700,
//                     maxHeight: "80vh",
//                     overflow: "auto",
//                     background: "white",
//                     padding: 25,
//                     borderRadius: 10,
//                 }}
//             >

//                 <button
//                     onClick={onClose}
//                     style={{
//                         float: "right"
//                     }}
//                 >
//                     ✕
//                 </button>

//                 <h2>🤖 AI Summary</h2>

//                 {loading ? (

//                     <p>Loading...</p>

//                 ) : (

//                     <>

//                         <h3>Summary</h3>

//                         <p>{summary.summary_text}</p>

//                         <hr />

//                         <h3>Key Findings</h3>

//                         <ul>

//                             {summary.key_findings.map((item, index) => (

//                                 <li key={index}>
//                                     {item}
//                                 </li>

//                             ))}

//                         </ul>

//                         <hr />

//                         <h3>Abnormal Values</h3>

//                         <table>

//                             <thead>

//                                 <tr>

//                                     <th>Test</th>

//                                     <th>Value</th>

//                                     <th>Status</th>

//                                 </tr>

//                             </thead>

//                             <tbody>

//                                 {summary.abnormal_values.map((item, index) => (

//                                     <tr key={index}>

//                                         <td>{item.test}</td>

//                                         <td>{item.value}</td>

//                                         <td>{item.status}</td>

//                                     </tr>

//                                 ))}

//                             </tbody>

//                         </table>

//                         <hr />

//                         <h3>Recommendations</h3>

//                         <ul>

//                             {summary.recommendations.map((item, index) => (

//                                 <li key={index}>
//                                     {item}
//                                 </li>

//                             ))}

//                         </ul>

//                     </>

//                 )}

//             </div>

//         </div>

//     );

// }

// export default AISummaryModal;

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { getReportSummary } from "../../api/report";
import Modal from "../ui/Modal";

function AiSummaryModal({ reportId, onClose }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSummary();
    }, []);

    async function loadSummary() {
        try {
            const data = await getReportSummary(reportId);
            setSummary(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal onClose={onClose} width={700}>
            <div className="hc-summary-head">
                <span className="hc-summary-head-icon hc-tone-lavender">
                    <Sparkles size={18} />
                </span>
                <h2>AI summary</h2>
            </div>

            {loading ? (
                <p style={{ color: "var(--hc-ink-soft)" }}>Loading…</p>
            ) : !summary ? (
                <p style={{ color: "var(--hc-ink-soft)" }}>Summary unavailable.</p>
            ) : (
                <>
                    <div className="hc-summary-section">
                        <h3>Summary</h3>
                        <p>{summary.summary_text}</p>
                    </div>

                    <div className="hc-summary-section">
                        <h3>Key findings</h3>
                        <ul className="hc-summary-list">
                            {summary.key_findings.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="hc-summary-section">
                        <h3>Abnormal values</h3>
                        <table className="hc-summary-table">
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
                    </div>

                    <div className="hc-summary-section" style={{ marginBottom: 0 }}>
                        <h3>Recommendations</h3>
                        <ul className="hc-summary-list">
                            {summary.recommendations.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </Modal>
    );
}

export default AiSummaryModal;