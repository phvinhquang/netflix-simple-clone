import classes from "./Movie.module.css";

const Movie = function (props) {
  const showDetail = function () {
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
      id={props.id}
      onClick={showDetail}
      className={classes.backdrop}
      src={`https://image.tmdb.org/t/p/w500/${props.img}`}
    />
  );
};

export default Movie;
