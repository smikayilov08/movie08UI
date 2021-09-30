import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../MainBody.css";
function WatchList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const requestOptions = {
        method: "Get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          "Access-Control-Allow-Methods": "GET",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      await fetch("http://localhost:8080/watchlist", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not found");
          }
          response.json().then((result) => {
            setList(result);
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    };

    fetchMovies();
  });
  const deleteMovies = (id) => {
    const request = {
      method: "Delete",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Access-Control-Allow-Methods": "DELETE",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch("http://localhost:8080/watchlist/" + id, request)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not add");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let listLengtht = list.length;

  const totalItems = listLengtht;
  const listitems = new Array(totalItems).fill(null);
  const renderGenres = () => {
    return list.map((item, key) => {
      return (
        <div key={key}>
          {item.genres.map((c, i) => (
            <span key={i}>{" " + c.name}</span>
          ))}
        </div>
      );
    });
  };
  return (
    <div className="homepage">
      <Header />

      <div className="container">
        {listLengtht === 0 && localStorage.getItem("token") !== null ? (
          <div
            className="text-center font-weight-bold text-light bg-dark"
            role="alert"
          >
            You don't have movies in you Watchlist
          </div>
        ) : (
          <></>
        )}

        <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
          {listitems.map((_, idx) => (
            <div className="movie-card card pr-2" key={idx}>
              <button
                type="button"
                className="btn-close btn-close-white close"
                aria-label="Close"
                onClick={() => deleteMovies(list[idx].id)}
              ></button>
              <a href={"/movie/" + list[idx].id}>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500" + list[idx].poster_path
                  }
                  alt="Black Widow"
                  key={idx}
                  className="fadeIn animated card-img-top"
                />
              </a>
              <div className="card-body pr-2">
                <a href={"/movie/" + list[idx].id}>
                  <span className="card-rating">{list[idx].vote_average}</span>
                  <div className="mb-1 mr-4 card-title" key={idx}>
                    {list[idx].original_title}
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
export default WatchList;
