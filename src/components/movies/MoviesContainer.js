import React from "react";

import MovieList from "./MovieList";

const MovieContainer = function () {
  const API_KEY = `b77846b7087c8a06ada65458e74448b5`;
  return (
    <React.Fragment>
      <MovieList
        category="Original"
        url={`/discover/tv?api_key=${API_KEY}&with_network=123`}
        flexbox={true}
      />
      <MovieList
        title="Xu hướng"
        url={`/trending/all/week?api_key=${API_KEY}&language=en-US`}
        flexbox={true}
      />
      <MovieList
        title="Xếp hạng cao"
        url={`/movie/top_rated?api_key=${API_KEY}&language=en-US`}
        flexbox={true}
      />
      <MovieList
        title="Hành động"
        url={`/discover/movie?api_key=${API_KEY}&with_genres=28`}
        flexbox={true}
      />
      <MovieList
        title="Hài"
        url={`/discover/movie?api_key=${API_KEY}&with_genres=35`}
        flexbox={true}
      />
      <MovieList
        title="Kinh dị"
        url={`/discover/movie?api_key=${API_KEY}&with_genres=27`}
        flexbox={true}
      />
      <MovieList
        title="Lãng mạn"
        url={`/discover/movie?api_key=${API_KEY}&with_genres=10749`}
        flexbox={true}
      />
      <MovieList
        title="Tài liệu"
        url={`/discover/movie?api_key=${API_KEY}&with_genres=99`}
        flexbox={true}
      />
    </React.Fragment>
  );
};

export default MovieContainer;
