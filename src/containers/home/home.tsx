import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState, MoviesByGenre } from "../../@types/wookie-movies";
import { selectMoviesByGenre } from "../../store/movies/selectors";
import { moviesAction } from "../../store/movies/actions";
import { SEARCH_MOVIES_REQUEST } from "../../store/movies/types";

import { Movies } from "../../components/movies";

export function MoviesContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const location = useLocation();
  const movies = useSelector<RootState, MoviesByGenre[]>(selectMoviesByGenre);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const query = search.get("q") || "";
    dispatch(moviesAction(SEARCH_MOVIES_REQUEST, query));
  }, [dispatch, location.search]);

  return <Movies movies={movies} />;
}
