import { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../store/user/user.action";
import { selectCurrentUser } from "../store/user/user.selector";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utilities/firebase/firebase.utilities";

export const UserContext = createContext({
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const value = { currentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
