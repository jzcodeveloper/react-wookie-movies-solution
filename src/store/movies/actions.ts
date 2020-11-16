import { RootAction } from "../../@types/wookie-movies";

export function moviesAction<T, P>(type: T, payload?: P): RootAction<T, P> {
  return {
    type,
    payload,
  };
}

export type moviesAction = typeof moviesAction;
