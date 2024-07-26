import Navigation from "@/components/Navigat/Navigation";
import PlayBar from "@/components/PlayBar/PlayBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import classNames from "classnames";
import styles from "./page.module.css";
import Search from "@/components/Centrerblock/Search/Search";

export default function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}
          >
            <Search />
            {children}
          </div>
          <Sidebar />
        </main>
        <PlayBar />
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
