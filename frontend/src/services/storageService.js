import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import firebaseApp from "../config/authconfig";

// Initialize Firebase Authentication and Firestore
const db = getFirestore(firebaseApp);

const storageService = {
  createTherapist: async (user, email, firstName, lastName) => {
    try {
      // Create a new document in the users collection when signing up.
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
          const { createdAt, createdBy, ...exerciseData } = doc.data();
          return {
            ...exerciseData,
            id: doc.id,
          };
        });
        return {
          success: true,
          patient: {
            ...patientData,
            id: patientResponse.id,
            exercises: exercises,
          },
        };
      } else {
        return { success: false, errorMessage: "Patient not found" };
      }
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },

  createPatient: async (userId, patientData) => {
    try {
      // Reference to the patients collection for a specific user
      const patientsRef = collection(db, `users/${userId}/patients`);

      // Process the data before saving it to the database
      patientData = processData(patientData);

      const timeStamp = serverTimestamp();

      // Add the new patient
      await addDoc(patientsRef, {
        ...patientData,
        progress: 0,
        createdAt: timeStamp,
        updatedAt: timeStamp,
      });

      return {
        success: true,
        message: "Patient created successfully",
      };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },

  updatePatient: async () => {
    //TODO
  },

  saveExercise: async (userId,patientId,exerciseData) => {
    try {
      const exerciseRef = collection(db, `users/${userId}/patients/${patientId}/exercises`);

      // Process the data before saving it to the database
      exerciseData = processExerciseData(exerciseData);

      const timeStamp = serverTimestamp();

      // Add the new exercise
      await addDoc(exerciseRef, {
        ...exerciseData,
        createdAt: timeStamp,
        updatedAt: timeStamp,
      });

      return {
        success: true,
        message: "Exercise created successfully",
      };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
  deleteExercise: async () => {
    //Dunno is this needed? TODO
  },
  deletePatient: async () => {
    //Dunno is this needed? TODO
  },
};

function processData(data) {
  return {
    ...data,
    age: parseInt(data.age, 10),
    difficulties: data.difficulties
      .split(",")
      .map((difficulty) => difficulty.trim()),
    interests: data.interests.split(",").map((interest) => interest.trim()),
  };
}

function processExerciseData(data){
  //The data, since it depends on the type of exercise, should be processed beforehand
  //Added this in case we need to do some kind of preprocessing
  return{
    ...data
  }
}

export default storageService;
