import { RootAction } from "../../@types/wookie-movies";
import { call, put, select } from "redux-saga/effects";

import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from "./types";
import { moviesAction } from "./actions";
import { moviesApi } from "./api";
import { selectMovies } from "./selectors";

export function* fetchMoviesWorker(action: RootAction<FETCH_MOVIES_REQUEST>) {
  try {
    // Check movies first
    const movies = yield select(selectMovies);
    // If no movies, make request
    if (movies.length === 0) {
      const movies = yield call([moviesApi, "fetchMovies"]);
      yield put(moviesAction(FETCH_MOVIES_SUCCESS, movies));
    } else {
      yield put(moviesAction(FETCH_MOVIES_SUCCESS, movies));
    }
  } catch (error) {
    yield put(moviesAction(FETCH_MOVIES_FAILURE, error));
  }
}

export function* searchMoviesWorker(
  action: RootAction<SEARCH_MOVIES_REQUEST, string>
) {
  try {
    const { payload } = action;
    const movies = yield call([moviesApi, "searchMovies"], payload);
    yield put(moviesAction(SEARCH_MOVIES_SUCCESS, movies));
  } catch (error) {
    yield put(moviesAction(SEARCH_MOVIES_FAILURE, error));
  }
}
