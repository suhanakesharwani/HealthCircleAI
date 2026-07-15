import UploadReportModal from "../../reports/UploadReportModal";
import ReportCard from "../../reports/ReportCard";
function ReportsTab({
    member,
    reports,
    refresh,
}) {

    return (

        <div>

            <h2>Medical Reports</h2>

            {member.permissions.can_upload_reports && (

                <UploadReportModal
                    memberId={member.id}
                    onUploaded={refresh}
                />

            )}

            <br />

            {reports.length === 0 ? (

                <p>No reports uploaded.</p>

            ) : (

                reports.map(report => (

                    <ReportCard
                        key={report.id}
                        report={report}
                        refresh={refresh}
                        canDelete={member.permissions.can_upload_reports}
                    />

                ))

            )}

        </div>

    );

}

export default ReportsTab;