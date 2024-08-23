"use client";
import styles from "../page.module.css";
import PlayList from "@/components/Centrerblock/PlayList/PlayList";
import { useAppSelector } from "@/hooks";

export default function FavouritePage() {
  const favoriteTracks = useAppSelector((state) => state.playlist.likedTracks);

  return (
    <>
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <PlayList tracks={favoriteTracks}
       isFavourite={true} />
    </>
  );
}


