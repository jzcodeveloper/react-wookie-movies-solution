import { RootAction, MovieState } from "../../@types/wookie-movies";
import { call, put, select } from "redux-saga/effects";

import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
} from "./types";
import { movieAction } from "./actions";
import { movieApi } from "./api";
import { selectMovies } from "../movies/selectors";

export function* fetchMovieWorker(
  action: RootAction<FETCH_MOVIE_REQUEST, string>
) {
  try {
    const { payload } = action;
    // Check movies first
    const movies = yield select(selectMovies);
    const found = movies.find((movie: MovieState) => movie.slug === payload);
    // If found movie, don't make request
    if (found) {
      yield put(movieAction(FETCH_MOVIE_SUCCESS, found));
    } else {
      const movie = yield call([movieApi, "fetchMovie"], payload);
      yield put(movieAction(FETCH_MOVIE_SUCCESS, movie));
    }
  } catch (error) {
    yield put(movieAction(FETCH_MOVIE_FAILURE, error));
  }
}
