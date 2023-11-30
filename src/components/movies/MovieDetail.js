import classes from "./MovieDetail.module.css";
import YouTube from "react-youtube";

const MovieDetail = function (props) {
  //Content cho trailer
  //Hiển thị ảnh nếu không tìm thấy trailer (teaser) phù hợp
  let trailerContent;

  if (props.trailer) {
    trailerContent = (
      <YouTube
        videoId={props.trailer.key}
        opts={{
          height: "400",
          width: "100%",
          playerVars: {
            autoplay: 0,
          },
        }}
      />
    );
  } else {
    trailerContent = (
      <img src={`https://image.tmdb.org/t/p/w500/${props.img}`} />
    );
  }
  return (
    <div className={classes["movie-detail"]}>
      <div className={classes["detail-text"]}>
        <h2 className={classes["detail-title"]}>{props.title}</h2>
        <h4>{`Release Date: ${props.releaseDate}`}</h4>
        <h4>{`Vote: ${props.vote} / 10`}</h4>
        <p>{props.overview}</p>
      </div>
      <div className={classes.trailer}>{trailerContent}</div>
    </div>
  );
};

export default MovieDetail;
