import firebaseApp from "../config/authconfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Taking care of the firebase authentication
const authService = {
  isValidLogin: async (email, password) => {
    // Function that takes care of the login
    const auth = getAuth(firebaseApp);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
  isValidSignup: async (email, password) => {
    // Function that takes care of the singup with new credentials
    const auth = getAuth(firebaseApp);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
  isValidLogout: async () => {
    // Function to logouts
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      localStorage.removeItem("token");
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
};

export default authService;
