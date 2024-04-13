import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Centerblock from "@/components/Centrerblock/Centerblock";
import Navigation from "@/components/Navigat/Navigation";
import Link from "next/link";
import PlayBar from "@/components/PlayBar/PlayBar";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>
        <PlayBar />
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
