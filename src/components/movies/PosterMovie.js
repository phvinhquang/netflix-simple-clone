import classes from "./PosterMovie.module.css";

const PosterMovie = function (props) {
  const showDetail = function (e) {
    const clickedMovie = {
      id: props.id,
      title: props.title,
      releaseDate: props.releaseDate,
      vote: props.vote,
      overview: props.overview,
      showDetail: showDetail,
      isShowing: true,
      img: props.img,
    };

    props.onShowDetail(clickedMovie);
  };
  return (
    <img
      onClick={showDetail}
      // Hiển thị poster hoặc backdrop tùy theo loại phim
      className={classes.poster}
      src={`https://image.tmdb.org/t/p/w500/${props.img}`}
    />
  );
};

export default PosterMovie;
