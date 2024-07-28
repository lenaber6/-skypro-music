"use client";
import { fetchFavouriteTracks } from "@/api/user";
import styles from "../page.module.css";
import { useUser } from "@/hooks/useUser";
import { SetStateAction, useEffect, useState } from "react";
import { trackType } from "@/types";
import { useRouter } from "next/navigation";
import { updateToken } from "@/api/users";
import PlayList from "@/components/Centrerblock/PlayList/PlayList";
import { useAppSelector } from "@/hooks";

type FavouritePageType = {

}
// вызвать likedTracks[]
export default function FavouritePage() {
  const favoriteTracks = useAppSelector((state) => state.playlist.likedTracks);


  // const { token, user } = useUser();
  // const [tracksData, setTracksData] = useState<trackType[]>([]);
  // const router = useRouter();

  // useEffect(() => {
  //   fetchFavouriteTracks(token?.access!)
  //     .then((data: SetStateAction<trackType[]>) => {
  //       setTracksData(data);
  //     })
  //     .catch((error: { message: string; }) => {
  //       if (error.message === "401" && user) {
  //         updateToken(token?.refresh!).then((data) => {
  //           fetchFavouriteTracks(data.access).then((newData: SetStateAction<trackType[]>) => {
  //             setTracksData(newData);
  //           });
  //         });
  //       } else {
  //         alert("Пожалуйста, авторизуйтесь");
  //         router.push("/");
  //       }
  //     });
  // }, [router, token, user]);

  return (
    <>
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <PlayList tracks={favoriteTracks}
      //  playlist={tracksData} 
       isFavourite={true} />
    </>
  );
}


