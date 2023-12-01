import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "../reducers/userSlice";

export const useListenAuthChanges = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        dispatch(setCurrentUser(userData));
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
