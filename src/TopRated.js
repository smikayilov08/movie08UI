import "./MainBody.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { useHistory } from "react-router";
function TopRated() {
  const [movies, setMovie] = useState([]);
  const [images, setImages] = useState([]);
  const [genres, setGenres] = useState([]);
  const name = "top_rated";
  useEffect(() => {
    fetchMovies();
    return () => {
      setMovie({});
      setImages({});
      setGenres({});
    };
  }, []);
  const fetchMovies = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(name),
    };

    await fetch("http://localhost:8080/moviesTypes", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not found");
        }
        response.json().then((result) => {
          setMovie(result.movieType.results);
          setImages(result.movieType.photos);
          setGenres(result.genres);
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const renderMovieName = () => {
    if (!movies) {
      return null;
    }

    return movies.map((movies, key) => {
      return <div key={key}>{movies.original_title}</div>;
    });
  };
  const renderRank = () => {
    if (!movies) {
      return null;
    }

    return movies.map((movies, key) => {
      return <div key={key}>{movies.vote_average}</div>;
    });
  };
  const renderGenres = () => {
    if (!genres) {
      return null;
    }

    return genres.map((item, key) => {
      return (
        <div key={key}>
          {item.genres.map((c, i) => (
            <span key={i}>{" " + c.name}</span>
          ))}
        </div>
      );
    });
  };
  let moviesLenght = movies.length;
  while (moviesLenght % 6 !== 0 && moviesLenght > 6) {
    moviesLenght = moviesLenght - 1;
  }
  const totalItems = moviesLenght;
  const items = new Array(totalItems).fill(null);

  let history = useHistory();
  return (
    <div className="homepage">
      <Header />
      <div className="container">
        <div className="btn-group " role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn  btn-success  movie-filter "
            onClick={() => history.push("/popular")}
          >
            <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
              Popular
            </div>
          </button>
          <button
            type="button"
            className="btn btn-success   movie-filter"
            onClick={() => history.push("/now_playing")}
          >
            <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
              Now playing
            </div>
          </button>
          <button
            type="button"
            className="btn  btn-success  movie-filter"
            onClick={() => history.push("top_rated")}
          >
            <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
              Top rated
            </div>
          </button>
          <button
            type="button"
            className="btn  btn-success  movie-filter"
            onClick={() => history.push("/upcoming")}
          >
            <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
              Upcoming
            </div>
          </button>
        </div>
        <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
          {items.map((_, idx) => (
            <div className="movie-card card pr-2 hv" key={idx}>
              <a href={"/movie/" + movies[idx].id}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + images[idx]}
                  alt="Poster"
                  key={idx}
                  className="fadeIn animated card-img-top"
                />
              </a>
              <div className="card-body pr-2">
                <a href={"/movie/" + movies[idx].id}>
                  <span className="card-rating">{renderRank()[idx]}</span>
                  <div className="mb-1 mr-4 card-title" key={idx}>
                    {renderMovieName()[idx]}
                  </div>
                  <abbr className="small mb-0">{renderGenres()[idx]}</abbr>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopRated;
