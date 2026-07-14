import axiosClient from "./axiosClient";

export const getReports = async (memberId) => {

    const response = await axiosClient.get(
        // `family-members/${memberId}/reports/` changed
        `members/${memberId}/reports/`
    );

    return response.data;
};

export const uploadReport = async (
    memberId,
    file,
    reportDate
) => {

    const formData = new FormData();

    formData.append("file", file);

    if (reportDate) {
        formData.append(
            "report_date",
            reportDate
        );
    }

    const response = await axiosClient.post(

        // `family-members/${memberId}/reports/`,
        `members/${memberId}/reports/`,

        formData,

        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }

    );

    return response.data;
};

export const getPreviewUrl = async (
    reportId
) => {

    const response =
        await axiosClient.get(
            `reports/${reportId}/preview/`
        );

    return response.data;
};

export const deleteReport = async (
    reportId
) => {

    await axiosClient.delete(
        `reports/${reportId}/`
    );

};

export const getReportSummary = async (reportId) => {
    const response = await axiosClient.get(
        `reports/${reportId}/summary/`
    );

    return response.data;
};

export const getReportTrends = async (
    memberId,
    reportType
) => {

    const response =
        await axiosClient.get(

            `members/${memberId}/report-trends/`,

            {
                params: {
                    report_type: reportType
                }
            }

        );

    return response.data;

};