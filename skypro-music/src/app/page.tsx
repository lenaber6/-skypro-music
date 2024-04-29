"use client";

import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navigation from "@/components/Navigat/Navigation";
import PlayBar from "@/components/PlayBar/PlayBar";
import { useState } from "react";
import { trackType } from "@/types";
import classNames from "classnames";
import Filters from "@/components/Filters/Filters";
import PlayList from "@/components/Centrerblock/PlayList/PlayList";
import Search from "@/components/Centrerblock/Search/Search";

export default function Home() {
  const [track, setTrack] = useState<trackType | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}
          >
            <Search />
            <Filters />
            <PlayList setTrack={setTrack}/>
          </div>
          <Sidebar />
        </main>

        {track && (<PlayBar track={track} />)}
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
