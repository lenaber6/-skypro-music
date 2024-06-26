export const formatDuration = (duration:number) => {
    const durationMinutes = Math.trunc(duration / 60) + '';
   const durationSeconds = Math.floor(duration % 60) + "";
    return durationMinutes.padStart(2, '0') + ':' + durationSeconds.padStart(2, '0');
};
