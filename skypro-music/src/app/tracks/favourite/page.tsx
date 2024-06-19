"use client";
import { getFavouriteTracks } from "@/api/tracks";
import styles from "../layout.module.css";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { trackType } from "@/types";
import { useRouter } from "next/navigation";
import { updateToken } from "@/api/users";
import PlayList from "@/components/Centrerblock/PlayList/PlayList";

export default function FavouritePage() {
  const { token, user } = useUser();
  const [tracksData, setTracksData] = useState<trackType[]>([]);
  const router = useRouter();

  useEffect(() => {
    getFavouriteTracks(token?.access!)
      .then((data) => {
        setTracksData(data);
      })
      .catch((error) => {
        if (error.message === "401" && user) {
          updateToken(token?.refresh!).then((data) => {
            getFavouriteTracks(data.access).then((newData) => {
              setTracksData(newData);
            });
          });
        } else {
          alert("Пожалуйста, авторизуйтесь");
          router.push("/");
        }
      });
  }, [router, token, user]);

  return (
    <>
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <PlayList tracks={tracksData} playlist={tracksData} isFavourite={true} />
    </>
  );
}


