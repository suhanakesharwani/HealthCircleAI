from .models import ReportTest
STATUS_SCORE = {
    "NORMAL": 0,
    "BORDERLINE": 1,
    "HIGH": 2,
    "LOW": 2,
}
def compare_reports(member, report_type):

    reports = (
        ReportTest.objects.filter(
            report__family_member=member,
            report__ai_status="DONE",
            report__report_type=report_type,
        )
        .select_related("report")
        .exclude(report__report_date__isnull=True)
        .order_by(
            "normalized_name",
            "report__report_date",
        )
    )

    grouped = {}

    for test in reports:
        grouped.setdefault(
            test.normalized_name,
            []
        ).append(test)

    improved = []
    worsened = []
    stable = []

    for test_name, values in grouped.items():

        if len(values) < 2:
            continue

        previous = values[-2]
        current = values[-1]

        if previous.value is None or current.value is None:
            continue

        change = current.value - previous.value

        previous_score = STATUS_SCORE.get(
            previous.status,
            2
        )

        current_score = STATUS_SCORE.get(
            current.status,
            2
        )

        if current_score < previous_score:

            improved.append({
                "test": current.name,
                "previous": previous.value,
                "current": current.value,
                "previous_status": previous.status,
                "current_status": current.status,
                "previous_date": previous.report.report_date,
                "current_date": current.report.report_date,
                "change": round(change, 2),
                "message": f"{current.name} improved."
            })

        elif current_score > previous_score:

            worsened.append({
                "test": current.name,
                "previous": previous.value,
                "current": current.value,
                "previous_status": previous.status,
                "current_status": current.status,
                "previous_date": previous.report.report_date,
                "current_date": current.report.report_date,
                "change": round(change, 2),
                "message": f"{current.name} worsened."
            })

        else:

            stable.append({
                "test": current.name,
                "previous": previous.value,
                "current": current.value,
                "previous_status": previous.status,
                "current_status": current.status,
                "previous_date": previous.report.report_date,
                "current_date": current.report.report_date,
                "change": round(change, 2),
                "status": current.status
            })

    return {
        "improved": improved,
        "worsened": worsened,
        "stable": stable,
    }