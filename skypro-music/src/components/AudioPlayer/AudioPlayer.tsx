// import React, { useState, useRef, useEffect } from 'react';

// export default function AudioPlayer(): any {
//     const audioRef = useRef(null);
//     const [volume, setVolume] = useState(0.5); // Начальная громкость установлена на 50%

//     useEffect(() => {
//         if (audioRef.current) {
//             audioRef.current.volume = volume;
//         }
//     }, [volume]);

//     return (
//         <div>
//             <audio ref={audioRef} src="your-audio-file.mp3" controls></audio>
//             <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={(e) => setVolume(e.target.value)}
//             />
//         </div>
//     );
// };

 