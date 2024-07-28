import { disLikeTrack, likeTrack } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setDisLikedTracks,
  setLikedTracks,
} from "@/store/features/playlistSlice";
import { trackType } from "@/types";

// хук для постановки и снятия лайка

export function useTrackLikes(trackData: trackType) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const trackId = trackData.id;
//   console.log(trackData);
// if (trackId === undefined) {return};
const isLiked = !!likedTracks.find((track) => track.id === trackId);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!tokens.access || !tokens.refresh)
      return alert("Вы не авторизованы! Пожалуйста, авторизуйтесь!");
    // Только ссылки на действия
    const action = isLiked ? disLikeTrack : likeTrack;
    try {
      await action({
        trackId,
        access: tokens.access,
        refresh: tokens.refresh,
      });
      console.log(trackId);
      if (isLiked) {
        dispatch(setDisLikedTracks(trackData));
        // console.log(trackData);
      } else {
        dispatch(setLikedTracks(trackData));
      }
      // console.log(trackData);
    } catch (error) {
      console.error(error);
    }
  };
  return { handleLike, isLiked };
}
// !! - перед массивом - преобразование в булев тип
