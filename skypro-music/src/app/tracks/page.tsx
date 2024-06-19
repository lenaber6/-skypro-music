
import PlayList from "@/components/Centrerblock/PlayList/PlayList";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { trackType } from "@/types";
import { getTracks } from "@/api/tracks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import Filters from "@/components/Filters/Filters";
import styles from "./page.module.css";

export default async function MainTracksPage() {
  const tracksData = await getTracks();

   
    return (
    <>
     <h2 className={styles.centerblockH2}>Треки</h2>
     <Filters />
    <PlayList tracks={tracksData}/>
   </>
   )
}