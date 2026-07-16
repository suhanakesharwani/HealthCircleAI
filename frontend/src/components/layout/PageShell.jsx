import AmbientBackground from "./AmbientBackground";

/**
 * isLoading + loadingLabel let a page show the shared "hc-loading" state
 * before data arrives, without duplicating the markup on every page.
 */
const WIDTH_CLASS = {
    default: "",
    medium: "hc-shell--medium",
    narrow: "hc-shell--narrow",
};

export default function PageShell({ children, nav = null, width = "default", isLoading = false, loadingLabel = "Loading…" }) {
    if (isLoading) {
        return <div className="hc-loading">{loadingLabel}</div>;
    }

    return (
        <div className="hc-page">
            <AmbientBackground />
            {nav}
            <div className={`hc-shell ${WIDTH_CLASS[width]}`}>{children}</div>
        </div>
    );
}