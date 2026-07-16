import UploadReportModal from "../../reports/UploadReportModal";
import ReportCard from "../../reports/ReportCard";
import ReportTrendChart from "../../reports/ReportTrendChart";
import ReportComparison from "../../reports/ReportComparison";

import "../../../styles/reports.css";

function ReportsTab({ member, reports, refresh }) {
    return (
        <div>
            <h2 className="hc-panel-title">Medical reports</h2>

            {member.permissions.can_upload_reports && (
                <UploadReportModal memberId={member.id} onUploaded={refresh} />
            )}

            {reports.length === 0 ? (
                <div className="hc-glass hc-empty" style={{ marginBottom: 24 }}>
                    No reports uploaded.
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                    {reports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            refresh={refresh}
                            canDelete={member.permissions.can_upload_reports}
                        />
                    ))}
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <ReportTrendChart memberId={member.id} />
                <ReportComparison reports={reports} />
            </div>
        </div>
    );
}

export default ReportsTab;