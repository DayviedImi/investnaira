/* eslint-disable import/prefer-default-export */
import { UserStorage } from "../storage";

export function isLoggedIn() {
  const { token } = UserStorage;
  return token != null;
}
