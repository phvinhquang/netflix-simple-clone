import classes from "./SearchBar.module.css";
import SearchIcon from "../../UI/SearchIncon";
import React, { useState } from "react";

const SearchBar = function (props) {
  const [inputValue, setInputValue] = useState("");
  const [inputValueIsValid, setInputValueIsValid] = useState(false);
  const [inputIsTouched, setInputIsTouched] = useState(false);

  //Hàm sự lý sự kiện nhập input
  const inputChangeHandler = function (e) {
    setInputValue(e.target.value);
    setInputValueIsValid(true);
  };

  //Hàm xử lý sự kiện submit
  const submitHandler = function (e) {
    e.preventDefault();
    setInputIsTouched(true);
    if (inputValue.trim() === "") {
      setInputValueIsValid(false);
      return;
    } else {
      setInputValueIsValid(true);
      //Gọi hàm ở Component cha
      props.onSearch(inputValue);
    }
  };

  // Hàm xử lý sự kiện reset
  const resetHandler = function () {
    setInputValue("");
    props.onReset();
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes["search-bar"]}>
        <div className={classes["input-container"]}>
          <input
            onChange={inputChangeHandler}
            value={inputValue}
            className={classes.input}
            type="text"
          />
          <div className={classes.icon}>
            <SearchIcon />
          </div>
        </div>

        <div className={classes.actions}>
          <button
            onClick={resetHandler}
            type="button"
            className={`${classes.btn} ${classes["btn-reset"]}`}
          >
            RESET
          </button>
          <button className={`${classes.btn} ${classes["btn-search"]}`}>
            SEARCH
          </button>
        </div>
        {!inputValueIsValid && inputIsTouched && (
          <p className={classes.error}>Vui lòng nhập từ khóa tìm kiếm hợp lệ</p>
        )}
      </form>
    </div>
  );
};

export default React.memo(SearchBar);
