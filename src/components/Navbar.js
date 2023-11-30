import classes from "./Navbar.module.css";

import SearchIcon from "../UI/SearchIncon";
import { useEffect, useState } from "react";

const Navbar = function () {
  // State black background cho nav
  const [navBlackBackground, setNavBlackBackground] = useState(false);

  useEffect(() => {
    //Tạo background đen khi scroll 100px
    const scrollHandler = function () {
      if (window.scrollY > 100) {
        setNavBlackBackground(true);
        return;
      } else if (window.scrollY < 100) {
        setNavBlackBackground(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <nav
      className={`${classes.navbar} ${
        navBlackBackground && classes["navbar-black"]
      }`}
    >
      <div className={classes["nav-container"]}>
        <a href="/">
          <h1>Nét Ph-Lích</h1>
        </a>

        <a href="/search">
          <SearchIcon className={classes.search} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
