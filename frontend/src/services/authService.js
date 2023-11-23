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
      //alert("Login successful!");
      return true;
    } catch (error) {
      //alert(`Login failed: ${error.message}`);
      return false;
    }
  },
  isValidSignup: async (email, password) => {
    // Function that takes care of the singup with new credentials
    const auth = getAuth(firebaseApp);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign Up successful!");
      return true;
    } catch (error) {
      alert(`Signing Up failed: ${error.message}`);
      return false;
    }
  },
  isValidLogout: async () => {
    // Function to logouts
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      localStorage.removeItem("token");
      //alert("Logout successful!");
      return true;
    } catch (error) {
      //alert(`Logging out failed: ${error.message}`);
      return false;
    }
  },
};

export default authService;
