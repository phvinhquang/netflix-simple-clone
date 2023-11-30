import React, { useState } from "react";
import classes from "./ResultsList.module.css";
import PosterMovie from "../movies/PosterMovie";
import MovieDetail from "../movies/MovieDetail";
import useHttp from "../hooks/use-http";

const ResultsList = function (props) {
  const [detail, setDetail] = useState({});
  const [showDetail, setShowDetail] = useState({});
  const [trailer, setTrailer] = useState(null);

  //Sử dụng custom hook lấy trailer
  const httpData = useHttp();
  const { isLoading, error, sendRequest } = httpData;

  console.log(props.movies);

  const showDetailHandler = function (movieData) {
    // State để ẩn hoặc hiện detail
    setShowDetail((preveState) => {
      if (preveState.id === movieData.id && preveState.isShown) {
        return { id: movieData.id, isShown: false };
      } else {
        return { id: movieData.id, isShown: true };
      }
    });

    //State chứa data hiển thị detail
    setDetail({
      id: movieData.id,
      title: movieData.title,
      releaseDate: movieData.releaseDate,
      vote: movieData.vote,
      overview: movieData.overview,
      img: movieData.img,
    });

    //Fetch trailer và xử lý data Trailer
    const transformTrailerData = function (trailerData) {
      //Lọc site === Youtube
      const siteIsYoutube = trailerData.results.filter(
        (trailer) => trailer.site === "YouTube"
      );

      //Tìm trailer đầu tiên thỏa mãn
      let trailer = siteIsYoutube.find((trailer) => trailer.type === "Trailer");
      //Nếu không có  trailer thì tìm teaser
      if (!trailer) {
        siteIsYoutube.find((trailer) => trailer.type === "Teaser");
      }
      console.log(trailer);
      setTrailer(trailer);
    };

    // Gửi request
    sendRequest(
      `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=b77846b7087c8a06ada65458e74448b5`,
      transformTrailerData
    );
  };

  return (
    <React.Fragment>
      <h1 className={classes.title}>Search Results</h1>
      {/* Hiện thông báo nếu không tìm thấy phim theo từ khóa */}
      {props.movies.length === 0 && props.isTouched && (
        <p className={classes["not-found-text"]}>
          No movie found. Please try different keyword
        </p>
      )}
      <div className={classes.results}>
        {props.movies.map((movie) => {
          return (
            <React.Fragment>
              {/* Hiển thị danh sách kết quả tìm kiếm */}
              <PosterMovie
                onShowDetail={showDetailHandler}
                poster={true}
                key={movie.id}
                id={movie.id}
                title={movie.title}
                vote={movie.vote_average}
                overview={movie.overview}
                img={movie.poster_path}
                releaseDate={movie.release_date}
              />
              {/* //Hiển thị detail của phim được click */}
              {showDetail.isShown && detail.id === movie.id && (
                <div className={classes["detail-container"]}>
                  <MovieDetail
                    img={detail.img}
                    title={detail.title}
                    releaseDate={detail.releaseDate}
                    vote={detail.vote}
                    overview={detail.overview}
                    trailer={trailer}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default React.memo(ResultsList);
