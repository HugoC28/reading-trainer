//TODO. Add here all the methods that you need to access the storage service, i.e. reading and writing to firebase storage.
//TODO. You can use the methods that are already implemented in the authService.js file as an example.
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import firebaseApp from "../config/authconfig";

// Initialize Firebase Authentication and Firestore
const db = getFirestore(firebaseApp);

const storageService = {
  createTherapist: async (user, email, firstName, lastName) => {
    try {
      // Create a new document in the users collection when signing up.
      // Don't add patients at this point because the therapist has no patients yet.
      const createdAtTimestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        name: firstName + " " + lastName,
        createdAt: createdAtTimestamp,
      });
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
  createPatient: async (formData) => {
    try {
      const createdAtTimestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        name: firstName + " " + lastName,
        createdAt: createdAtTimestamp,
      });
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },

  updatePatient: async (formData) => {
    try {
      const createdAtTimestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        name: firstName + " " + lastName,
        createdAt: createdAtTimestamp,
      });
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
};

export default storageService;
