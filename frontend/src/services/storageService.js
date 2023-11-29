//TODO. Add here all the methods that you need to access the storage service, i.e. reading and writing to firebase storage.
//TODO. You can use the methods that are already implemented in the authService.js file as an example.
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  collection,
} from "firebase/firestore";
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
  getPatients: async (userId) => {
    try {
      const loggedUserPatientsRef = collection(db, `users/${userId}/patients`);

      const data = await getDocs(loggedUserPatientsRef);
      const patients = data.docs.map((doc) => {
        // Remove createdAt and changedAt from the patient data because those cause problems in redux store.
        // eslint-disable-next-line no-unused-vars
        const { createdAt, updatedAt, ...patientData } = doc.data();
        return {
          ...patientData,
          id: doc.id,
        };
      });
      return { success: true, patients: patients };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },

  getPatient: async (userId, patientId) => {
    try {
      const patientRef = doc(db, `users/${userId}/patients/${patientId}`);
      const selectedPatientExercisesRef = collection(
        db,
        `users/${userId}/patients/${patientId}/exercises`
      );

      const patientResponse = await getDoc(patientRef);
      if (patientResponse.exists()) {
        // eslint-disable-next-line no-unused-vars
        const { createdAt, updatedAt, ...patientData } = patientResponse.data();
        const exerciseResponse = await getDocs(selectedPatientExercisesRef);
        const exercises = exerciseResponse.docs.map((doc) => {
          // eslint-disable-next-line no-unused-vars
          const { createdAt, ...exerciseData } = doc.data();
          return {
            ...exerciseData,
            id: doc.id,
          };
        });
        return {
          success: true,
          patient: { ...patientData, id: patientData.id, exercises: exercises },
        };
      } else {
        return { success: false, errorMessage: "Patient not found" };
      }
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },

  createPatient: async (formData) => {
    //TODO
  },

  updatePatient: async (formData) => {
    //TODO
  },
};

export default storageService;
