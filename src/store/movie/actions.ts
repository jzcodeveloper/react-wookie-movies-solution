import { RootAction } from "../../@types/wookie-movies";

export function movieAction<T, P>(type: T, payload?: P): RootAction<T, P> {
  return {
    type,
    payload,
  };
}

export type movieAction = typeof movieAction;
