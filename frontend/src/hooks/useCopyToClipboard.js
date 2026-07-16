import { useState } from "react";

export function useCopyToClipboard(resetAfter = 1800) {
    const [copied, setCopied] = useState(false);

    function copy(value) {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), resetAfter);
    }

    return [copied, copy];
}