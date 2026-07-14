from statistics import mean


def analyze_history(charts):

    summary = []

    for test_name, values in charts.items():

        if len(values) < 2:
            continue

        values = sorted(
            values,
            key=lambda x: x["date"]
        )

        numbers = [
            v["value"]
            for v in values
            if v["value"] is not None
        ]

        if len(numbers) < 2:
            continue

        first = numbers[0]
        last = numbers[-1]

        change = last - first

        percent = (
            (change / first) * 100
            if first != 0 else 0
        )

        highest = max(numbers)
        lowest = min(numbers)
        average = round(mean(numbers), 2)

        statuses = [
            v["status"]
            for v in values
        ]

        #
        # Determine trend
        #

        increasing = all(
            numbers[i] <= numbers[i+1]
            for i in range(len(numbers)-1)
        )

        decreasing = all(
            numbers[i] >= numbers[i+1]
            for i in range(len(numbers)-1)
        )

        if increasing:

            trend = "Increasing"

        elif decreasing:

            trend = "Decreasing"

        else:

            trend = "Fluctuating"

        #
        # Count abnormalities
        #

        abnormal_count = sum(

            1

            for s in statuses

            if s != "NORMAL"

        )

        summary.append({

            "test": test_name,

            "trend": trend,

            "first_value": first,

            "latest_value": last,

            "change": round(change,2),

            "percent_change": round(percent,1),

            "highest": highest,

            "lowest": lowest,

            "average": average,

            "abnormal_reports": abnormal_count,

            "total_reports": len(values)

        })

    return summary