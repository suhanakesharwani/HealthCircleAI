// tasks.py stores each abnormal value one of two ways depending on whether the
// AI returned a plain string or a structured object:
//   string case  -> { test: "Hemoglobin (Hb): 11.8 g/dL (LOW)", value: null, status: "" }
//   object case  -> { test: "Hemoglobin", value: 11.8, unit: "g/dL", status: "LOW" }
// This normalizes both into { name, valueText, numericValue, status }.

function numberFrom(value) {
    if (value === null || value === undefined || value === "") return null;
    const match = String(value).match(/-?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
}

function parseFromText(text) {
    const match = text.match(/^(.*?):\s*(.+?)\s*\(([^)]+)\)\s*$/);

    if (!match) {
        return { name: text.trim(), valueText: "", numericValue: null, status: "" };
    }

    const [, name, valueText, status] = match;
    return {
        name: name.trim(),
        valueText: valueText.trim(),
        numericValue: numberFrom(valueText),
        status: status.trim(),
    };
}

export function parseAbnormalValue(raw) {
    if (raw && typeof raw === "object") {
        const hasStructuredValue = raw.value !== null && raw.value !== undefined && raw.value !== "";
        const hasStructuredStatus = Boolean(raw.status);

        if (hasStructuredValue || hasStructuredStatus) {
            const valueText = [raw.value, raw.unit].filter(Boolean).join(" ").trim();
            return {
                name: (raw.test || "").trim(),
                valueText,
                numericValue: numberFrom(raw.value),
                status: (raw.status || "").trim(),
            };
        }

        // Structured wrapper around a plain descriptive string.
        return parseFromText(raw.test || raw.name || "");
    }

    return parseFromText(typeof raw === "string" ? raw : String(raw ?? ""));
}