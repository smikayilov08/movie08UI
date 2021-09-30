import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
function SearchMovie() {
  const movieName = useParams();
  const [movies, setMovie] = useState([]);
  const [images, setImages] = useState([]);
  const [genres, setGenres] = useState([]);
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
    };
    await fetch(
      "http://localhost:8080/search/" + movieName.name,
      requestOptions
    )
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

  return (
    <div className="homepage">
      <Header />
      <div className="container">
        <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
          {items.map((_, idx) => (
            <div className="movie-card card" key={idx}>
              <a href={"/movie/" + movies[idx].id}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + images[idx]}
                  alt="Black Widow"
                  key={idx}
                  className="fadeIn animated card-img-top"
                />
              </a>
              <div className="card-body">
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

export default SearchMovie;
