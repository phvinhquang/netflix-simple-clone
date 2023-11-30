import React, { useState, useEffect, useCallback } from "react";

import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import MovieContainer from "../../components/movies/MoviesContainer";

function Browse() {
  const [banner, setBanner] = useState({});
  const [error, setError] = useState(null);

  const fetchBannerHandler = useCallback(async function () {
    setError(null);

    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=b77846b7087c8a06ada65458e74448b5&with_network=123"
      );

      //Kiểm tra lỗi
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      const randomMovieBanner =
        data.results[Math.floor(Math.random() * data.results.length - 1)];

      setBanner(randomMovieBanner);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchBannerHandler();
  }, [fetchBannerHandler]);

  return (
    <div className="app">
      <Navbar />
      <Banner
        name={banner.name}
        description={banner.overview}
        img={`https://image.tmdb.org/t/p/w1280/${banner.backdrop_path}`}
      />
      <MovieContainer />
    </div>
  );
}

export default Browse;
