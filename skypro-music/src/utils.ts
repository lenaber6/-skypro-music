
export const formatDuration = (duration_in_seconds:number) => {
    const minutes = String(duration_in_seconds).padStart(2, "0");
    const seconds = String(duration_in_seconds).padStart(2, "0");
    return `${minutes}:${seconds}`;
};

