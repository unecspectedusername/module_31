import { appState } from "../app";
import { User } from "../models/User";
import Data from "../models/Data";

export const authUser = function (login, password) {
  const user = new User(login, password);
  if (!user.hasAccess) return false;
  appState.currentUser = user;
  appState.data = new Data(user);
  return true;
};
