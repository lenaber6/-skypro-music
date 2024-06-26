export const formatCurrentTimeDuration = (currentTime: number) => {
    const currentMinutes = Math.trunc(currentTime / 60) + '';
    const currentSeconds = Math.floor(currentTime % 60) + "";
    return currentMinutes.padStart(2, '0') + ':' + currentSeconds.padStart(2, '0');
};