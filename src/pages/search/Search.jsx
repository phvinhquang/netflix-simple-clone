import React, { useCallback, useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import SearchBar from "../../components/search/SearchBar";
import ResultsList from "../../components/search/ResultsList";

import useHttp from "../../components/hooks/use-http";

const API_KEY = `b77846b7087c8a06ada65458e74448b5`;

const Search = () => {
  //useState
  const [searchResults, setSearchResults] = useState([]);
  //Sử dụng custom hook lấy kết quả search
  const httpData = useHttp();
  const { isLoading, error, sendRequest } = httpData;
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const searchHandler = useCallback(
    function (searchText) {
      setInputIsTouched(true);

      const transformSearchData = function (data) {
        const loadedResults = [];
        const filterData = data.results.filter((movie) => {
          return movie.poster_path;
        });
        filterData.forEach((movie) => {
          loadedResults.push(movie);
        });

        setSearchResults(loadedResults);
      };

      sendRequest(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}&language=en`,
        transformSearchData
      );
    },
    [sendRequest]
  );

  const resetHandler = function () {
    // Xóa danh sách đã tìm kiếm trước đó
    setSearchResults([]);
    // Chỉnh State để không hiện thông báo no movie found
    setInputIsTouched(false);
  };

  return (
    <div className="search-page">
      <Navbar />
      <SearchBar onSearch={searchHandler} onReset={resetHandler} />
      {isLoading && (
        <p style={{ color: "white", textAlign: "center", fontSize: "30px" }}>
          Finding movies ...
        </p>
      )}
      {!isLoading && (
        <ResultsList isTouched={inputIsTouched} movies={searchResults} />
      )}
    </div>
  );
};

export default Search;
