import firebaseApp from "../config/authconfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import storageservice from "./storageService";

const auth = getAuth(firebaseApp);

// Taking care of the firebase authentication
const authService = {
  isValidLogin: async (email, password) => {
    // Function that takes care of the login
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.email);
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
  isValidSignup: async (formData) => {
    const { email, password, firstName, lastName } = formData;

    // Function that takes care of the singup with new credentials
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const response = await storageservice.createTherapist(
        user,
        email,
        firstName,
        lastName
      );

      // It is possible that the user is created in the authentication service but not in the storage service.
      // If this is the case, we delete the user from the authentication service.
      if (!response.success) {
        await deleteUser(user);
        return response;
      }
      return response;
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
  isValidLogout: async () => {
    // Function to logouts
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
};

export default authService;
