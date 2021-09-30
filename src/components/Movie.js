import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../css/Movie.css";
import Header from "./Header";
function Movie() {
  const params = useParams();
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [comments, setComments] = useState([]);
  const [addDelete, setAddDelete] = useState("Add to my Watchlist");
  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(id),
      };
      await fetch("http://localhost:8080/movieDetails", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not found");
          }
          response.json().then((result) => {
            setMovieDetails(result);
            setGenres(result.genres);
            setCast(result.cast);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const fetchComments = async () => {
      const requestOptions = {
        method: "Get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          "Access-Control-Allow-Methods": "GET",
        },
      };
      await fetch(
        "http://localhost:8080/movies/" + id + "/comments",
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not found");
          }
          response.json().then((result) => {
            setComments(result);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const searchWatchList = async () => {
      const request = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      };
      await fetch("http://localhost:8080/watchlist/search/" + id, request)
        .then((response) => {
          response.json().then((result) => {
            if (result.idPresent === true) {
              setAddDelete("Remove from Watchlist");
            } else {
              setAddDelete("Add to my Watchlist");
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (localStorage.getItem("token")) {
      searchWatchList();
    }
    if (movieDetails.length === 0) {
      fetchData();
    }
    fetchComments();
  });
  if (localStorage.getItem("token")) {
    var check = "Write a comment";
  } else {
    var text = "readonly";
    check = "Please,SignIn to write a comment";
  }
  const postComments = async () => {
    if (localStorage.getItem("token")) {
      const comments = {
        userComments: document.getElementById("comment").value,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify(comments),
      };
      await fetch(
        "http://localhost:8080/movies/" +
          movieDetails.original_title +
          "/" +
          id +
          "/comments",
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not found");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const renderGenres = () => {
    return genres.map((item, index) => {
      return <li key={index}>{item.name} </li>;
    });
  };

  const addWatchList = async () => {
    if (localStorage.getItem("token")) {
      if (addDelete === "Add to my Watchlist") {
        const request = {
          method: "Post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "Access-Control-Allow-Methods": "POST",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        await fetch(
          "http://localhost:8080/watchlist/" +
            movieDetails.original_title +
            "/" +
            id,
          request
        )
          .then((response) => {
            if (!response.ok) {
              throw Error("Could not add");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const request = {
          method: "Delete",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "Access-Control-Allow-Methods": "DELETE",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        await fetch("http://localhost:8080/watchlist/" + id, request)
          .then((response) => {
            if (!response.ok) {
              throw Error("Could not add");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      document.getElementById("alert").style.display = "block";
    }
  };
  return (
    <div
      className="main"
      style={{
        backgroundImage:
          "url(http://image.tmdb.org/t/p/w1280/" +
          movieDetails.backdrop_path +
          " )",
      }}
    >
      <div className="container" id="tst-movie">
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
          id="alert"
        >
          <strong>Please!</strong> SignIn to add movie to Watchlist
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() =>
              (document.getElementById("alert").style.display = "none")
            }
          >
            <span aria-hidden="false">&times;</span>
          </button>
        </div>
        <Header />
      </div>
      <div className="rmdb-movieinfo">
        <div className="rmdb-movieinfo-content">
          <div className="rmdb-movieinfo-thumb">
            <div className="rmdb-moviethumb">
              <img
                src={
                  "http://image.tmdb.org/t/p/w500/" + movieDetails.poster_path
                }
                alt="Poster"
              />
            </div>
          </div>
          <div className="rmdb-movieinfo-text">
            <h1 className="movie_title">
              {movieDetails.original_title}
              <span></span>
            </h1>
            <h3 className="overview-text">Overview</h3>
            <p>{movieDetails.overview}</p>
            <div className="rmdb-flexcontainer">
              <div className="rmdb-genres">
                <h4 className="genres-text">GENRES</h4>
                <div className="rmdb-flexcontainer">{renderGenres()}</div>
              </div>
            </div>
            <h3 className="imdb-rating-text">IMDB RATING</h3>
            <div className="rmdb-rating">
              <meter
                min="0"
                max="10"
                optimum="10"
                low="4"
                high="7"
                value={movieDetails.vote_average}
              ></meter>
              <p className="rmdb-score">{movieDetails.vote_average}</p>
            </div>
            <h3 className="director">DIRECTOR</h3>
            <p className="rmdb-director">{movieDetails.directorName}</p>
            <br></br>
            <button
              type="button"
              id="watchlist-btn"
              className="movie__like mr-2 undefined btn btn-success"
              onClick={addWatchList}
            >
              <i className="far fa-bookmark" aria-hidden="true"></i> {addDelete}
            </button>
            <span
              aria-hidden="true"
              className="fa fa-film fa-5x fa-film  d-flex float-right"
            ></span>
          </div>
        </div>
      </div>
      <div className="rmdb-movieinfobar  d-flex flex-column ">
        <div className="rmdb-movieinfobar-content">
          <div className="rmdb-movieinfobar-content-col">
            <span
              aria-hidden="true"
              className="fa fa-clock-o fa-2x fa-time"
            ></span>
            <span className="rmdb-movieinfobar-info">
              Running Time: {movieDetails.runtime}
            </span>
          </div>
          <div className="rmdb-movieinfobar-content-col">
            <span
              aria-hidden="true"
              className="fa fa-money fa-2x fa-budget"
            ></span>
            <span className="rmdb-movieinfobar-info">
              Budget: $ {movieDetails.budget}
            </span>
          </div>
          <div className="rmdb-movieinfobar-content-col">
            <span
              aria-hidden="true"
              className="fa fa-ticket fa-2x fa-revenue"
            ></span>
            <span className="rmdb-movieinfobar-info">
              Revenue: $ {movieDetails.revenue}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column container">
        {/* slideshow*/}

        {/* actors */}
        <div className="movie-cast">
          <div className="d-flex justify-content-between align-align-items-center">
            <h3 className="list-title list-title-dark mb-4">Actors</h3>
            <div className="custom-control custom-switch pr-5 info"></div>
          </div>
          <div className="movie-cast__list d-flex flex-wrap justify-content-md-center justify-content-lg-start justify-content-center align-items-stretch">
            {cast.map((item, index) => (
              <div className="movie-cast__item" key={index}>
                <img
                  className="movie-cast__img"
                  alt="Poster"
                  title="Gael García Bernal"
                  src={"https://image.tmdb.org/t/p/w185/" + item.profile_path}
                />
                <div className="movie-cast__info" key={index}>
                  {item.name}
                  <br />
                  <span className="small">{item.character}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* reviews */}
      <div className="d-flex flex-column container">
        {comments.map((items, index) => (
          <div className="review-container" key={index}>
            <div id="profile">
              <div id="profileId">{items.user_name.charAt(0)}</div>
            </div>
            <span key={index}>{items.user_comments}</span>
          </div>
        ))}

        <section id="app">
          <div className="post-comment-container">
            <div className="row">
              <div className="col-6">
                <div className="comment">
                  <p v-for="items in item" v-text="items"></p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <textarea
                  id="comment"
                  type="text"
                  className="input"
                  placeholder={check}
                  v-model="newItem"
                  readOnly={text}
                ></textarea>
                <button
                  className="primaryContained"
                  type="button"
                  onClick={postComments}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Movie;
