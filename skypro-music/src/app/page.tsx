import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navigation from "@/components/Navigat/Navigation";
import PlayBar from "@/components/PlayBar/PlayBar";
import classNames from "classnames";
import Filters from "@/components/Filters/Filters";
import PlayList from "@/components/Centrerblock/PlayList/PlayList";
import Search from "@/components/Centrerblock/Search/Search";

export default function Home() {

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
            <PlayList />
          </div>
          <Sidebar />
        </main>
       <PlayBar />
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
// Test
//  describe("Nav", () => {
//   it("should render a my playlist link", () => {
//     renderWithProviders(<NavMenu isOpen={true} />);
//     const exitLink = screen.getByText("Мой плейлист");

//     expect(exitLink).toBeInTheDocument();
//   });
// });
// import "@testing-library/jest-dom";

// import { render, screen } from "@testing-library/react";