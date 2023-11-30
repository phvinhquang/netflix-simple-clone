import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import classes from "./MovieList.module.css";

import useHttp from "../hooks/use-http";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";
import PosterMovie from "./PosterMovie";

//Hàm reducer
const MovieDetailElReducer = function (state, action) {
  if (action.type === "OPEN") {
    return {
      id: action.id,
      title: action.title,
      releaseDate: action.releaseDate,
      vote: action.vote,
      overview: action.overview,
      isShowing: state.id === action.id && state.isShowing ? false : true,
      img: action.img,
    };
  }

  return defaultReducer;
};

//Giá trị ban đầu của reducer
const defaultReducer = {
  id: "",
  title: "",
  releaseDate: "",
  vote: "",
  overview: "",
  isShowing: false,
};

const MovieList = function (props) {
  //Sử dụng State lưu trữ phim và trailer
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);

  //useReducer
  const [movieDetailEl, dispatchMovieDetailEl] = useReducer(
    MovieDetailElReducer,
    defaultReducer
  );

  // Sử dụng custom hook lấy Movie Data
  const httpData = useHttp();
  const { isLoading, error, sendRequest } = httpData;

  // Fetch và hiển thị phim
  useEffect(() => {
    const transformData = function (data) {
      // console.log(data);
      const loadedMovies = [];

      //Loại bỏ những movie không có ảnh backdrop
      const filteredData = data.results.filter((movie) => {
        if (movie.backdrop_path) {
          return movie;
        }
      });

      filteredData.forEach((movie) => {
        loadedMovies.push(movie);
      });
      // console.log("Loaded:", loadedMovies);
      setMovies(loadedMovies);
    };

    sendRequest(`https://api.themoviedb.org/3${props.url}`, transformData);
  }, [sendRequest]);

  //Hàm xử lý sự kiện hiện Movie Detail
  const showDetailHandler = function (movieData) {
    // Dispatch;
    dispatchMovieDetailEl({
      type: "OPEN",
      id: movieData.id,
      title: movieData.title,
      releaseDate: movieData.releaseDate,
      vote: movieData.vote,
      overview: movieData.overview,
      isShowing: true,
      img: movieData.img,
    });

    //Fetch trailer và xử lý data Trailer
    const transformTrailerData = function (trailerData) {
      if (!trailerData) {
        setTrailer(undefined);
      }
      //Lọc site === Youtube
      const siteIsYoutube = trailerData.results.filter(
        (trailer) => trailer.site === "YouTube"
      );

      //Tìm trailer đầu tiên thỏa mãn
      let trailer = siteIsYoutube.find((trailer) => trailer.type === "Trailer");
      //Nếu không có  trailer thì tìm teaser
      if (!trailer) {
        trailer = siteIsYoutube.find((trailer) => trailer.type === "Teaser");
      }
      setTrailer(trailer);
    };

    // Gửi request lấy trailer
    sendRequest(
      `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=b77846b7087c8a06ada65458e74448b5`,
      transformTrailerData
    );
  };

  //Biến chứa danh sách phim
  let content;

  //Hiển thị Movie Item theo điều kiện
  content = movies.map((movie) => {
    //Hiển thị Poster
    if (props.category === `Original`) {
      return (
        <PosterMovie
          onShowDetail={showDetailHandler}
          key={movie.id}
          id={movie.id}
          title={movie.original_name}
          releaseDate={movie.first_air_date}
          vote={movie.vote_average.toFixed(1)}
          poster={true}
          img={movie.poster_path}
        />
      );
    }

    //Hiển thị Backdrop
    return (
      <Movie
        onShowDetail={showDetailHandler}
        key={movie.id}
        id={movie.id}
        title={movie.original_title || movie.original_name}
        releaseDate={movie.release_date || movie.first_air_date}
        vote={movie.vote_average.toFixed(1)}
        img={movie.backdrop_path}
        overview={movie.overview}
      />
    );
  });

  return (
    // Hiển thị Movie List
    <div className={classes["movie-list"]}>
      <h1>{props.title}</h1>
      <div
        className={
          props.flexbox ? classes["movie-flexbox"] : classes["movie-grid"]
        }
      >
        {content}
      </div>
      {/* Hiển thị Movie Detail khi ảnh được click */}
      {movieDetailEl.isShowing && (
        <MovieDetail
          img={movieDetailEl.img}
          title={movieDetailEl.title}
          releaseDate={movieDetailEl.releaseDate}
          vote={movieDetailEl.vote}
          overview={movieDetailEl.overview}
          trailer={trailer}
        />
      )}
    </div>
  );
};

export default MovieList;
