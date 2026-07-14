export const theme = {
    colors: {
        paper: "#F7F9F8",
        panel: "#FFFFFF",
        ink: "#1B2430",
        inkSoft: "#5B6472",
        slate: "#8A94A6",
        border: "#E4E8EB",
        brand: "#0E7C7B",
        brandSoft: "#E4F3F2",
        good: "#2F9E44",
        goodSoft: "#E7F6EA",
        watch: "#E8A33D",
        watchSoft: "#FCF1E0",
        alert: "#E0554F",
        alertSoft: "#FBE7E6",
        neutral: "#94A3AE",
        neutralSoft: "#EEF1F3",
    },
    font: {
        display: "'Sora', sans-serif",
        body: "'Inter', sans-serif",
        mono: "'IBM Plex Mono', monospace",
    },
};

// Maps backend status strings to a consistent visual language everywhere
export const STATUS_STYLES = {
    NORMAL: { label: "Normal", color: theme.colors.good, soft: theme.colors.goodSoft, plain: "within the healthy range" },
    HIGH: { label: "High", color: theme.colors.alert, soft: theme.colors.alertSoft, plain: "above the healthy range" },
    LOW: { label: "Low", color: theme.colors.alert, soft: theme.colors.alertSoft, plain: "below the healthy range" },
    BORDERLINE: { label: "Borderline", color: theme.colors.watch, soft: theme.colors.watchSoft, plain: "close to the edge of the healthy range" },
};

export function statusStyle(status) {
    return STATUS_STYLES[status] || {
        label: status || "Unknown",
        color: theme.colors.neutral,
        soft: theme.colors.neutralSoft,
        plain: "not clearly categorized",
    };
}

export const FONT_IMPORT_URL =
    "https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap";