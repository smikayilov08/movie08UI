import "./../css/Header.css";
import SignupForm from "./../components/SignupForm";
import SigninForm from "./../components/SigninForm";
import { useHistory } from "react-router";
import React, { useState } from "react";
function Header() {
  const [signInModalodalIsOpen, setSignInModalIsOpen] = useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  let history = useHistory();
  return (
    <div className="container ">
      <nav className="navbar navbar-transparent bg-transparent ">
        <form className="form-inline">
          <a href="/popular" className="nav-link">
            <i className="fas fa-video fa-3x camera "></i>
          </a>
          <a aria-current="page" className="nav-link movie08" href="/popular">
            <span>Movie08</span>
          </a>
          <input
            id="movieName"
            className="form-control mr-sm-2 rounded-pill"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-success my-2 my-sm-0 rounded-pill btn-lg"
            type="submit"
            onClick={() => {
              history.replace(
                "/search/" + document.getElementById("movieName").value
              );
              window.location.reload();
            }}
          >
            Search
          </button>
        </form>

        {token === null || token === undefined ? (
          <div className="btn-group btngrp">
            <button
              type="button"
              className=" btn-success rounded-pill btn-lg"
              onClick={() => setSignInModalIsOpen(true)}
            >
              Sign In
            </button>
            <button
              type="button"
              className=" btn-success rounded-pill btn-lg"
              onClick={() => setSignUpModalIsOpen(true)}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="btn-group btngrp">
            <a href="/watchlist" className="nav-link">
              <i className="far fa-bookmark watchlist"> My WatchList</i>
            </a>
            <button
              className="btn btn-success my-2 my-sm-0 rounded-pill btn-lg"
              type="submit"
              onClick={() => {
                localStorage.clear();
                history.replace("/popular");
                window.location.reload();
              }}
            >
              Log Out
            </button>
          </div>
        )}
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
          className="tmdb "
          data-toggle="tooltip"
          title="This product uses the TMDB API but is not endorsed or certified by TMDB"
        />
      </nav>
      <SignupForm ids={signUpModalIsOpen} />
      <SigninForm id={signInModalodalIsOpen} />
    </div>
  );
}

export default Header;
