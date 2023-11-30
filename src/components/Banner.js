import classes from "./Banner.module.css";

const Banner = function (props) {
  return (
    <div className={classes.container}>
      <img src={`${props.img}`} className={classes.img} />
      <div className={classes["banner-info"]}>
        <h1 className={classes.title}>{props.name}</h1>
        <button className={classes.btn}>Play</button>
        <button className={classes.btn}>My List</button>
        <p className={classes.description}>{props.description}</p>
      </div>
    </div>
  );
};

export default Banner;
