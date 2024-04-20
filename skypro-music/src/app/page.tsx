// "use client";

import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Centerblock from "@/components/Centrerblock/Centerblock";
import Navigation from "@/components/Navigat/Navigation";
import PlayBar from "@/components/PlayBar/PlayBar";
import { useState } from "react";
import { trackType } from "@/types";

export default function Home() {

// const [track, setTrack] = useState<trackType | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          {/* <Centerblock setTrack={setTrack}/> */}
          <Centerblock />

          <Sidebar />
        </main>
        {/* {track &&(<PlayBar track={track}/>)} */}
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
