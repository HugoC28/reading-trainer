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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { processExerciseData, processPatientData } from "../helpers/process";

// Initialize Firebase Authentication and Firestore
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

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
          const { createdAt, updatedAt, ...exerciseData } = doc.data();
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
      patientData = processPatientData(patientData);

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

  saveExercise: async (userId, patientId, exerciseDataU) => {
    try {
      const exerciseRef = collection(
        db,
        `users/${userId}/patients/${patientId}/exercises`
      );

      // Process the data before saving it to the database
      const [exerciseData, images] = processExerciseData(exerciseDataU);
      const timeStamp = serverTimestamp();
      // Add the new exercise
      const newExercise = await addDoc(exerciseRef, {
        ...exerciseData,
        createdAt: timeStamp,
        updatedAt: timeStamp,
      });

      // Upload images to database
      await storageService.uploadImagesToStorage(
        userId,
        patientId,
        newExercise.id,
        images
      );

      return {
        success: true,
        message: "Exercise created successfully",
      };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },

  getExercises: async (userId, patientId) => {
    try {
      const loggedUserPatientExercisesRef = collection(
        db,
        `users/${userId}/patients/${patientId}/exercises`
      );

      const data = await getDocs(loggedUserPatientExercisesRef);
      const exercises = data.docs.map((doc) => {
        // eslint-disable-next-line no-unused-vars
        const { createdAt, updatedAt, ...exerciseData } = doc.data();
        return {
          ...exerciseData,
          id: doc.id,
        };
      });
      return { success: true, exercises: exercises };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },

  getExercise: async (userId, patientId, exerciseId) => {
    try {
      const exerciseRef = doc(
        db,
        `users/${userId}/patients/${patientId}/exercises/${exerciseId}`
      );

      const exerciseResponse = await getDoc(exerciseRef);
      if (exerciseResponse.exists()) {
        // eslint-disable-next-line no-unused-vars
        const { createdAt, updatedAt, ...exerciseData } =
          exerciseResponse.data();
        return {
          success: true,
          exercise: {
            ...exerciseData,
            id: exerciseResponse.id,
          },
        };
      } else {
        return { success: false, errorMessage: "Patient not found" };
      }
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  },
  uploadImagesToStorage: async (userId, patientId, exerciseId, images) => {
    const metadata = { contentType: "image/png" };
    const uploadPromises = [];

    for (const key in images) {
      const imageRef = ref(
        storage,
        `users/${userId}/${patientId}/${exerciseId}/${key}.png`
      );
      try {
        const response = await fetch(images[key]);
        const blob = await response.blob();
        const uploadPromise = uploadBytes(imageRef, blob, metadata);
        uploadPromises.push(uploadPromise);
      } catch (error) {
        console.error("Error fetching image", error);
      }
    }

    try {
      await Promise.all(uploadPromises);
      console.log("All images uploaded successfully");
    } catch (error) {
      console.error("Error uploading one or more images", error);
    }
  },

  getImageFromStorage: async (userId, patientId, exerciseId, imageKey) => {
    let url = null;
    const imageRef = ref(
      storage,
      `users/${userId}/${patientId}/${exerciseId}/${imageKey}`
    );
    try {
      url = await getDownloadURL(imageRef);
      return {
        success: true,
        url: url,
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: `Error retrieving image ${imageKey}`,
      };
    }
  },

  deleteExercise: async () => {
    //Dunno is this needed? TODO
  },
  deletePatient: async () => {
    //Dunno is this needed? TODO
  },
  updatePatient: async () => {
    //TODO
  },
};

export default storageService;
