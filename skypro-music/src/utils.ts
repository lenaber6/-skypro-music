
export const formatCurrentTimeDuration = (currentTime: number) => {
    const currentMinutes = Math.trunc(currentTime / 60) + '';
    const currentSeconds = Math.floor(currentTime % 60) + "";
    return currentMinutes.padStart(2, '0') + ':' + currentSeconds.padStart(2, '0');
};
export const formatDuration = (duration:number) => {
    const durationMinutes = Math.trunc(duration / 60) + '';
   const durationSeconds = Math.floor(duration % 60) + "";
    return durationMinutes.padStart(2, '0') + ':' + durationSeconds.padStart(2, '0');
};

